package com.example.doodlejump

import android.content.Context
import android.graphics.*
import android.util.AttributeSet
import android.view.MotionEvent
import android.view.View
import kotlin.math.abs
import kotlin.math.max
import kotlin.math.min
import kotlin.random.Random

class GameView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : View(context, attrs, defStyleAttr) {

    private var gameListener: GameListener? = null
    private var isGameRunning = false
    private var isPaused = false
    private var isInitialized = false
    
    // Игровые объекты
    private val player = Player()
    private val platforms = mutableListOf<Platform>()
    private val enemies = mutableListOf<Enemy>()
    
    // Игровые параметры
    private var score = 0
    private var cameraY = 0f
    private var screenWidth = 0f
    private var screenHeight = 0f
    private var gameStartTime = 0L
    
    // Физика
    private val gravity = 0.8f
    private val jumpForce = -28f
    
    // Управление
    private var touchX = 0f
    private var isTouching = false
    
    // Краски
    private val paint = Paint()
    private val backgroundPaint = Paint()
    private val textPaint = Paint()
    
    init {
        setupPaints()
    }
    
    private fun setupPaints() {
        paint.isAntiAlias = true
        
        backgroundPaint.color = Color.rgb(135, 206, 235) // Голубое небо
        backgroundPaint.style = Paint.Style.FILL
        
        textPaint.apply {
            color = Color.WHITE
            textSize = 40f
            isAntiAlias = true
            textAlign = Paint.Align.CENTER
        }
    }
    
    private fun initializeGame() {
        if (screenWidth <= 0f || screenHeight <= 0f) {
            // Если размеры экрана еще не известны, откладываем инициализацию
            postDelayed({ initializeGame() }, 100)
            return
        }
        
        println("Initializing game with screen size: ${screenWidth}x${screenHeight}")
        
        platforms.clear()
        enemies.clear()
        
        // Создаем начальную платформу под игроком
        val startPlatformY = screenHeight - 150f
        platforms.add(Platform(
            x = screenWidth / 2 - 40f, // Центрируем платформу
            y = startPlatformY,
            width = 80f,
            height = 20f
        ))
        
        // Создаем дополнительные платформы выше
        for (i in 1..15) {
            val platformY = startPlatformY - i * 90f // Уменьшили расстояние до 90f для более равномерного распределения
            val platformX = Random.nextFloat() * (screenWidth - 80f)
            
            platforms.add(Platform(
                x = platformX,
                y = platformY,
                width = 80f,
                height = 20f
            ))
        }
        
        // Устанавливаем игрока на начальную платформу
        player.x = screenWidth / 2 - player.width / 2
        player.y = startPlatformY - player.height - 5f // 5 пикселей выше платформы
        player.velocityY = 0f
        player.velocityX = 0f
        
        // Сбрасываем камеру
        cameraY = 0f
        
        // НЕ создаем врагов в начале игры
        enemies.clear()
        
        isInitialized = true
        println("Game initialized: Player at (${player.x}, ${player.y}), Screen: ${screenWidth}x${screenHeight}")
    }
    
    fun setGameListener(listener: GameListener) {
        gameListener = listener
    }
    
    fun startGame() {
        if (!isInitialized) {
            println("Game not initialized, initializing first...")
            initializeGame()
        }
        
        if (screenWidth <= 0f || screenHeight <= 0f) {
            println("Screen size not ready, delaying start...")
            postDelayed({ startGame() }, 100)
            return
        }
        
        println("Starting game...")
        isGameRunning = true
        isPaused = false
        gameStartTime = System.currentTimeMillis()
        
        // Большая задержка перед началом игры
        postDelayed({
            if (isGameRunning) {
                println("Starting game loop...")
                gameLoop()
            }
        }, 1000) // 1 секунда задержки
    }
    
    fun pauseGame() {
        isPaused = true
    }
    
    fun resumeGame() {
        isPaused = false
        if (isGameRunning) {
            gameLoop()
        }
    }
    
    fun restartGame() {
        println("Restarting game...")
        score = 0
        cameraY = 0f
        player.reset()
        
        // Возвращаем игрока на начальную позицию
        player.x = screenWidth / 2 - player.width / 2
        player.y = screenHeight - 200f
        
        println("Player reset to: (${player.x}, ${player.y})")
        
        // Сбрасываем состояние игры
        isInitialized = false
        isGameRunning = false
        isPaused = false
        
        initializeGame()
        gameListener?.onScoreChanged(score)
        startGame()
    }
    
    private fun gameLoop() {
        if (!isGameRunning || isPaused) return
        
        try {
            update()
            invalidate()
            
            postDelayed({ gameLoop() }, 16) // ~60 FPS
        } catch (e: Exception) {
            // Логируем ошибку и останавливаем игру
            e.printStackTrace()
            gameOver()
        }
    }
    
    private fun update() {
        try {
            // Обновляем игрока
            updatePlayer()
            
            // Обновляем врагов
            updateEnemies()
            
            // Обновляем платформы
            updatePlatforms()
            
            // Проверяем коллизии
            checkCollisions()
            
            // Обновляем камеру
            updateCamera()
            
            // Обновляем счет
            updateScore()
        } catch (e: Exception) {
            println("ERROR in update: ${e.message}")
            e.printStackTrace()
            gameOver()
        }
    }
    
    private fun updatePlayer() {
        // Гравитация
        player.velocityY += gravity
        
        // Движение влево-вправо - персонаж следует за пальцем
        if (isTouching) {
            // Прямое следование за пальцем
            player.x = touchX - player.width / 2
        }
        
        // Обновляем позицию
        player.x += player.velocityX
        player.y += player.velocityY
        
        // Ограничиваем движение по горизонтали
        if (player.x < 0) player.x = screenWidth
        if (player.x > screenWidth) player.x = 0f
        
        // Проверяем выход за пределы экрана ТОЛЬКО ВНИЗ
        // Игрок проигрывает только если падает ниже экрана
        if (player.y > screenHeight + 100) { // Увеличили порог с 50 до 100
            println("GAME OVER: Player fell below screen!")
            println("Player Y: ${player.y}, Screen Height: $screenHeight, Threshold: ${screenHeight + 100}")
            gameOver()
        }
    }
    
    private fun updateEnemies() {
        // Создаем копию списка для безопасного удаления
        val enemiesToRemove = mutableListOf<Enemy>()
        
        enemies.forEach { enemy ->
            enemy.y += enemy.velocityY
            enemy.velocityY += gravity
            
            // Помечаем врагов для удаления, которые упали за пределы экрана
            if (enemy.y > screenHeight + 100) {
                enemiesToRemove.add(enemy)
                println("Enemy marked for removal at Y: ${enemy.y}, Screen Height: $screenHeight")
            }
        }
        
        // Удаляем помеченных врагов
        enemies.removeAll(enemiesToRemove)
        
        // Не создаем врагов в первые 3 секунды игры
        val gameTime = System.currentTimeMillis() - gameStartTime
        if (gameTime < 3000) {
            return
        }
        
        // Добавляем новых врагов бесконечно выше камеры
        if (Random.nextFloat() < 0.01f) { // Уменьшили частоту появления
            val enemyX = Random.nextFloat() * (screenWidth - 30f)
            val enemyY = cameraY - 200f - Random.nextFloat() * 100f // Выше камеры с случайным смещением
            
            enemies.add(Enemy(
                x = enemyX,
                y = enemyY,
                width = 30f,
                height = 30f
            ))
            
            println("Enemy created at: ($enemyX, $enemyY), Camera Y: $cameraY, Player Y: ${player.y}")
        }
    }
    
    private fun updatePlatforms() {
        // Удаляем платформы, которые ушли далеко вниз за экран
        platforms.removeAll { it.y > cameraY + screenHeight + 200f }

        // Находим самую высокую платформу
        val highestPlatformY = platforms.minByOrNull { it.y }?.y ?: (cameraY + screenHeight)

        // Генерируем новые платформы, пока они не окажутся выше верхней границы экрана
        var nextPlatformY = highestPlatformY
        while (nextPlatformY > cameraY - screenHeight) {
            // Уменьшаем Y, чтобы двигаться вверх по экрану
            val verticalDistance = 80f + Random.nextFloat() * 140f // Вертикальное расстояние: 80 - 220
            nextPlatformY -= verticalDistance
            
            val platformX = Random.nextFloat() * (screenWidth - 80f)

            platforms.add(Platform(
                x = platformX,
                y = nextPlatformY,
                width = 80f,
                height = 20f
            ))
        }
    }
    
    private fun checkCollisions() {
        // Коллизия с платформами
        platforms.forEach { platform ->
            if (player.velocityY > 0 && // Падает вниз
                player.x + player.width > platform.x &&
                player.x < platform.x + platform.width &&
                player.y + player.height > platform.y &&
                player.y + player.height < platform.y + platform.height + 10) {
                
                player.y = platform.y - player.height
                player.velocityY = jumpForce
            }
        }
        
        // Коллизия с врагами
        enemies.forEach { enemy ->
            // Проверяем, что враг находится в пределах экрана
            if (enemy.y > screenHeight + 100) {
                return@forEach // Пропускаем врагов, которые уже за пределами экрана
            }
            
            // Более точная проверка коллизии
            val playerLeft = player.x
            val playerRight = player.x + player.width
            val playerTop = player.y
            val playerBottom = player.y + player.height
            
            val enemyLeft = enemy.x
            val enemyRight = enemy.x + enemy.width
            val enemyTop = enemy.y
            val enemyBottom = enemy.y + enemy.height
            
            // Проверяем коллизию
            val collision = playerRight > enemyLeft && 
                playerLeft < enemyRight && 
                playerBottom > enemyTop && 
                playerTop < enemyBottom
            
            if (collision) {
                println("GAME OVER: Collision with enemy!")
                println("Player: left=$playerLeft, right=$playerRight, top=$playerTop, bottom=$playerBottom")
                println("Enemy: left=$enemyLeft, right=$enemyRight, top=$enemyTop, bottom=$enemyBottom")
                println("Player position: (${player.x}, ${player.y}), Enemy position: (${enemy.x}, ${enemy.y})")
                gameOver()
            }
        }
    }
    
    private fun updateCamera() {
        try {
            // Камера следует за игроком, когда он поднимается вверх
            val targetCameraY = player.y - screenHeight / 2
            
            // Камера движется только вверх, никогда вниз
            if (targetCameraY < cameraY) {
                cameraY = targetCameraY
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
    
    private fun updateScore() {
        try {
            val newScore = max(0, (-cameraY / 10).toInt())
            if (newScore > score) {
                score = newScore
                gameListener?.onScoreChanged(score)
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
    
    private fun gameOver() {
        if (!isGameRunning) {
            println("GameOver called but game is not running")
            return // Предотвращаем множественные вызовы
        }
        
        isGameRunning = false
        println("GAME OVER! Score: $score, Player Y: ${player.y}, Screen Height: $screenHeight, Camera Y: $cameraY")
        println("Player position: (${player.x}, ${player.y}), Velocity: (${player.velocityX}, ${player.velocityY})")
        gameListener?.onGameOver(score)
    }
    
    override fun onTouchEvent(event: MotionEvent): Boolean {
        when (event.action) {
            MotionEvent.ACTION_DOWN, MotionEvent.ACTION_MOVE -> {
                touchX = event.x
                isTouching = true
            }
            MotionEvent.ACTION_UP -> {
                isTouching = false
            }
        }
        return true
    }
    
    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        
        // Рисуем фон
        canvas.drawRect(0f, 0f, screenWidth, screenHeight, backgroundPaint)
        
        // Сохраняем состояние холста
        canvas.save()
        canvas.translate(0f, -cameraY)
        
        // Рисуем платформы
        platforms.forEach { platform ->
            paint.color = Color.GREEN
            canvas.drawRect(platform.x, platform.y, platform.x + platform.width, platform.y + platform.height, paint)
        }
        
        // Рисуем врагов
        enemies.forEach { enemy ->
            paint.color = Color.RED // Все враги только красные
            canvas.drawRect(enemy.x, enemy.y, enemy.x + enemy.width, enemy.y + enemy.height, paint)
        }
        
        // Рисуем игрока
        paint.color = Color.WHITE
        canvas.drawRect(player.x, player.y, player.x + player.width, player.y + player.height, paint)
        
        // Восстанавливаем состояние холста
        canvas.restore()
    }
    
    override fun onSizeChanged(w: Int, h: Int, oldw: Int, oldh: Int) {
        super.onSizeChanged(w, h, oldw, oldh)
        
        try {
            screenWidth = w.toFloat()
            screenHeight = h.toFloat()
            
            println("Screen size changed: ${screenWidth}x${screenHeight}")
            
            // Проверяем, что размеры экрана корректные
            if (screenWidth <= 0f || screenHeight <= 0f) {
                println("Invalid screen dimensions: ${screenWidth}x${screenHeight}")
                return
            }
            
            // Инициализируем игрока на платформе
            player.x = screenWidth / 2 - player.width / 2
            player.y = screenHeight - 200f // Позиция над платформой
            
            println("Player positioned at: (${player.x}, ${player.y})")
            
            // Инициализируем игру только один раз
            if (!isInitialized) {
                initializeGame()
            }
            
            // НЕ запускаем игру автоматически - это будет сделано из MainActivity
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
    
    interface GameListener {
        fun onScoreChanged(score: Int)
        fun onGameOver(score: Int)
    }
} 