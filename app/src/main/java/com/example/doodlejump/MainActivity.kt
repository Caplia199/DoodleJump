package com.example.doodlejump

import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat

class MainActivity : AppCompatActivity() {
    private lateinit var gameView: GameView
    private lateinit var scoreTextView: TextView
    private lateinit var highScoreTextView: TextView
    private lateinit var gameOverLayout: View
    private lateinit var pauseButton: Button
    private lateinit var resumeButton: Button
    private lateinit var restartButton: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Скрываем системные панели для полноэкранного режима
        hideSystemUI()
        
        setContentView(R.layout.activity_main)
        
        initializeViews()
        setupGame()
    }

    private fun initializeViews() {
        gameView = findViewById(R.id.gameView)
        scoreTextView = findViewById(R.id.scoreTextView)
        highScoreTextView = findViewById(R.id.highScoreTextView)
        gameOverLayout = findViewById(R.id.gameOverLayout)
        pauseButton = findViewById(R.id.pauseButton)
        resumeButton = findViewById(R.id.resumeButton)
        restartButton = findViewById(R.id.restartButton)
    }

    private fun setupGame() {
        // Обновляем рекорд
        val highScore = getSharedPreferences("DoodleJump", MODE_PRIVATE)
            .getInt("highScore", 0)
        highScoreTextView.text = getString(R.string.high_score, highScore)

        // Настройка кнопок
        pauseButton.setOnClickListener {
            gameView.pauseGame()
            pauseButton.visibility = View.GONE
            resumeButton.visibility = View.VISIBLE
        }

        resumeButton.setOnClickListener {
            gameView.resumeGame()
            pauseButton.visibility = View.VISIBLE
            resumeButton.visibility = View.GONE
        }

        restartButton.setOnClickListener {
            restartGame()
        }

        // Настройка игрового представления
        gameView.setGameListener(object : GameView.GameListener {
            override fun onScoreChanged(score: Int) {
                scoreTextView.text = getString(R.string.score, score)
            }

            override fun onGameOver(score: Int) {
                showGameOver(score)
            }
        })
        
        // Запускаем игру после настройки
        gameView.startGame()
    }

    private fun showGameOver(score: Int) {
        val highScore = getSharedPreferences("DoodleJump", MODE_PRIVATE)
            .getInt("highScore", 0)
        
        if (score > highScore) {
            getSharedPreferences("DoodleJump", MODE_PRIVATE)
                .edit()
                .putInt("highScore", score)
                .apply()
            highScoreTextView.text = getString(R.string.high_score, score)
        }
        
        gameOverLayout.visibility = View.VISIBLE
    }

    private fun restartGame() {
        gameOverLayout.visibility = View.GONE
        pauseButton.visibility = View.VISIBLE
        resumeButton.visibility = View.GONE
        gameView.restartGame()
    }

    private fun hideSystemUI() {
        WindowCompat.setDecorFitsSystemWindows(window, false)
        WindowInsetsControllerCompat(window, window.decorView).let { controller ->
            controller.hide(WindowInsetsCompat.Type.systemBars())
            controller.systemBarsBehavior = WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
        }
    }

    override fun onResume() {
        super.onResume()
        gameView.resumeGame()
    }

    override fun onPause() {
        super.onPause()
        gameView.pauseGame()
    }
} 