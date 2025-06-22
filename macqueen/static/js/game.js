class GameRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.gameState = {
            isRunning: false,
            score: 0,
            bestScore: 0,
            generation: 1,
            currentAgent: 1,
            successfulAttempts: 0,
            totalTime: 0
        };
        this.car = {
            x: 400,
            y: 300,
            angle: 0,
            speed: 0,
            width: 20,
            height: 30,
            alive: true
        };
        this.track = this.generateTrack();
        this.checkpoints = this.generateCheckpoints();
        this.sensorRays = [];
        this.animationId = null;
        this.startTime = Date.now();
        
        this.setupEventListeners();
        this.updateUI();
    }
    
    generateTrack() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const outerRadiusX = 300;
        const outerRadiusY = 200;
        const innerRadiusX = 200;
        const innerRadiusY = 100;
        
        const track = {
            outer: [],
            inner: []
        };
        
        // Внешняя граница
        for (let angle = 0; angle < 360; angle += 5) {
            const rad = (angle * Math.PI) / 180;
            const x = centerX + outerRadiusX * Math.cos(rad);
            const y = centerY + outerRadiusY * Math.sin(rad);
            track.outer.push({ x, y });
        }
        
        // Внутренняя граница
        for (let angle = 360; angle > 0; angle -= 5) {
            const rad = (angle * Math.PI) / 180;
            const x = centerX + innerRadiusX * Math.cos(rad);
            const y = centerY + innerRadiusY * Math.sin(rad);
            track.inner.push({ x, y });
        }
        
        return track;
    }
    
    generateCheckpoints() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const checkpoints = [];
        
        for (let angle = 0; angle < 360; angle += 45) {
            const rad = (angle * Math.PI) / 180;
            const x = centerX + 250 * Math.cos(rad);
            const y = centerY + 150 * Math.sin(rad);
            checkpoints.push({ x, y, radius: 30, passed: false });
        }
        
        return checkpoints;
    }
    
    setupEventListeners() {
        const startBtn = document.getElementById('start-btn');
        const resetBtn = document.getElementById('reset-btn');
        
        startBtn.addEventListener('click', () => this.startGame());
        resetBtn.addEventListener('click', () => this.resetGame());
    }
    
    async startGame() {
        try {
            const response = await fetch('/api/start-game', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                this.gameState.isRunning = true;
                this.startTime = Date.now();
                this.resetCar();
                this.startAnimation();
                this.updateUI();
            }
        } catch (error) {
            console.error('Ошибка при запуске игры:', error);
        }
    }
    
    async resetGame() {
        try {
            const response = await fetch('/api/reset-game', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                this.gameState.isRunning = false;
                this.stopAnimation();
                this.resetCar();
                this.updateUI();
            }
        } catch (error) {
            console.error('Ошибка при сбросе игры:', error);
        }
    }
    
    resetCar() {
        this.car = {
            x: 400,
            y: 300,
            angle: 0,
            speed: 0,
            width: 20,
            height: 30,
            alive: true
        };
        
        // Сброс чекпоинтов
        this.checkpoints.forEach(checkpoint => checkpoint.passed = false);
    }
    
    startAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.animate();
    }
    
    stopAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    animate() {
        if (!this.gameState.isRunning) return;
        
        this.update();
        this.render();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    update() {
        if (!this.car.alive) return;
        
        // ИИ управление (упрощенная версия)
        this.aiControl();
        
        // Обновление позиции машины
        this.car.x += Math.cos(this.car.angle) * this.car.speed;
        this.car.y += Math.sin(this.car.angle) * this.car.speed;
        
        // Проверка столкновений
        if (this.checkCollision()) {
            this.car.alive = false;
            this.gameOver();
            return;
        }
        
        // Проверка чекпоинтов
        this.checkCheckpoints();
        
        // Обновление сенсоров
        this.updateSensors();
        
        // Обновление времени
        this.gameState.totalTime = Math.floor((Date.now() - this.startTime) / 1000);
    }
    
    aiControl() {
        // Получение данных с сенсоров
        const sensorData = this.getSensorData();
        
        // Простая логика ИИ (в реальной версии здесь была бы нейросеть)
        const frontSensor = sensorData[2]; // Передний сенсор
        const leftSensor = sensorData[1];  // Левый сенсор
        const rightSensor = sensorData[3]; // Правый сенсор
        
        // Управление скоростью
        if (frontSensor > 0.3) {
            this.car.speed = Math.min(this.car.speed + 0.1, 5);
        } else {
            this.car.speed = Math.max(this.car.speed - 0.2, 0);
        }
        
        // Управление поворотом
        if (leftSensor < rightSensor && leftSensor < 0.5) {
            this.car.angle -= 0.05;
        } else if (rightSensor < leftSensor && rightSensor < 0.5) {
            this.car.angle += 0.05;
        }
        
        // Случайные корректировки для обучения
        if (Math.random() < 0.01) {
            this.car.angle += (Math.random() - 0.5) * 0.1;
        }
    }
    
    getSensorData() {
        const sensorAngles = [-90, -45, 0, 45, 90];
        const sensorData = [];
        
        for (const angleOffset of sensorAngles) {
            const sensorAngle = this.car.angle + (angleOffset * Math.PI) / 180;
            const distance = this.getDistanceToBoundary(sensorAngle);
            sensorData.push(distance);
        }
        
        return sensorData;
    }
    
    getDistanceToBoundary(angle) {
        const rayLength = 200;
        const rayX = this.car.x + Math.cos(angle) * rayLength;
        const rayY = this.car.y + Math.sin(angle) * rayLength;
        
        let minDistance = rayLength;
        
        // Проверка пересечения с внешней границей
        for (let i = 0; i < this.track.outer.length - 1; i++) {
            const p1 = this.track.outer[i];
            const p2 = this.track.outer[i + 1];
            const distance = this.lineIntersection(this.car.x, this.car.y, rayX, rayY, p1.x, p1.y, p2.x, p2.y);
            if (distance > 0 && distance < minDistance) {
                minDistance = distance;
            }
        }
        
        // Проверка пересечения с внутренней границей
        for (let i = 0; i < this.track.inner.length - 1; i++) {
            const p1 = this.track.inner[i];
            const p2 = this.track.inner[i + 1];
            const distance = this.lineIntersection(this.car.x, this.car.y, rayX, rayY, p1.x, p1.y, p2.x, p2.y);
            if (distance > 0 && distance < minDistance) {
                minDistance = distance;
            }
        }
        
        return minDistance / rayLength;
    }
    
    lineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den === 0) return -1;
        
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
        
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            const x = x1 + t * (x2 - x1);
            const y = y1 + t * (y2 - y1);
            return Math.sqrt((x - x1) ** 2 + (y - y1) ** 2);
        }
        
        return -1;
    }
    
    updateSensors() {
        const sensorAngles = [-90, -45, 0, 45, 90];
        this.sensorRays = [];
        
        for (const angleOffset of sensorAngles) {
            const sensorAngle = this.car.angle + (angleOffset * Math.PI) / 180;
            const distance = this.getDistanceToBoundary(sensorAngle);
            const rayLength = distance * 200;
            
            this.sensorRays.push({
                x: this.car.x + Math.cos(sensorAngle) * rayLength,
                y: this.car.y + Math.sin(sensorAngle) * rayLength,
                distance: distance
            });
        }
    }
    
    checkCollision() {
        // Проверка, находится ли машина за пределами трассы
        const carCorners = [
            { x: this.car.x - this.car.width/2, y: this.car.y - this.car.height/2 },
            { x: this.car.x + this.car.width/2, y: this.car.y - this.car.height/2 },
            { x: this.car.x + this.car.width/2, y: this.car.y + this.car.height/2 },
            { x: this.car.x - this.car.width/2, y: this.car.y + this.car.height/2 }
        ];
        
        for (const corner of carCorners) {
            if (!this.isPointInsideTrack(corner.x, corner.y)) {
                return true;
            }
        }
        
        return false;
    }
    
    isPointInsideTrack(x, y) {
        // Упрощенная проверка - точка должна быть между внешней и внутренней границами
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        
        // Нормализация расстояния для овальной трассы
        const normalizedX = (x - centerX) / 300;
        const normalizedY = (y - centerY) / 200;
        const normalizedDistance = Math.sqrt(normalizedX ** 2 + normalizedY ** 2);
        
        return normalizedDistance >= 0.67 && normalizedDistance <= 1.0;
    }
    
    checkCheckpoints() {
        for (let i = 0; i < this.checkpoints.length; i++) {
            const checkpoint = this.checkpoints[i];
            if (!checkpoint.passed) {
                const distance = Math.sqrt((this.car.x - checkpoint.x) ** 2 + (this.car.y - checkpoint.y) ** 2);
                if (distance < checkpoint.radius) {
                    checkpoint.passed = true;
                    this.gameState.score += 100;
                    
                    // Проверка завершения круга
                    if (i === this.checkpoints.length - 1) {
                        this.completeLap();
                    }
                }
                break;
            }
        }
    }
    
    completeLap() {
        this.gameState.successfulAttempts++;
        this.showSuccessMessage();
        this.resetGame();
    }
    
    gameOver() {
        this.gameState.isRunning = false;
        this.stopAnimation();
        this.updateScore();
        this.showGameOverMessage();
    }
    
    async updateScore() {
        try {
            await fetch('/api/update-score', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ score: this.gameState.score })
            });
        } catch (error) {
            console.error('Ошибка при обновлении счета:', error);
        }
    }
    
    render() {
        // Очистка canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Отрисовка трассы
        this.renderTrack();
        
        // Отрисовка чекпоинтов
        this.renderCheckpoints();
        
        // Отрисовка сенсоров
        this.renderSensors();
        
        // Отрисовка машины
        this.renderCar();
    }
    
    renderTrack() {
        // Отрисовка внешней границы
        this.ctx.beginPath();
        this.ctx.moveTo(this.track.outer[0].x, this.track.outer[0].y);
        for (let i = 1; i < this.track.outer.length; i++) {
            this.ctx.lineTo(this.track.outer[i].x, this.track.outer[i].y);
        }
        this.ctx.closePath();
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
        
        // Отрисовка внутренней границы
        this.ctx.beginPath();
        this.ctx.moveTo(this.track.inner[0].x, this.track.inner[0].y);
        for (let i = 1; i < this.track.inner.length; i++) {
            this.ctx.lineTo(this.track.inner[i].x, this.track.inner[i].y);
        }
        this.ctx.closePath();
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
        
        // Заливка дороги
        this.ctx.fillStyle = '#34495e';
        this.ctx.fill();
    }
    
    renderCheckpoints() {
        for (let i = 0; i < this.checkpoints.length; i++) {
            const checkpoint = this.checkpoints[i];
            this.ctx.beginPath();
            this.ctx.arc(checkpoint.x, checkpoint.y, checkpoint.radius, 0, 2 * Math.PI);
            
            if (checkpoint.passed) {
                this.ctx.fillStyle = '#27ae60';
            } else {
                this.ctx.fillStyle = '#e74c3c';
            }
            
            this.ctx.fill();
            this.ctx.strokeStyle = '#fff';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            // Номер чекпоинта
            this.ctx.fillStyle = '#fff';
            this.ctx.font = '14px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(i + 1, checkpoint.x, checkpoint.y + 5);
        }
    }
    
    renderSensors() {
        if (!this.car.alive) return;
        
        this.ctx.strokeStyle = 'rgba(255, 255, 0, 0.5)';
        this.ctx.lineWidth = 1;
        
        for (const ray of this.sensorRays) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.car.x, this.car.y);
            this.ctx.lineTo(ray.x, ray.y);
            this.ctx.stroke();
        }
    }
    
    renderCar() {
        if (!this.car.alive) return;
        
        this.ctx.save();
        this.ctx.translate(this.car.x, this.car.y);
        this.ctx.rotate(this.car.angle);
        
        // Корпус машины
        this.ctx.fillStyle = this.car.alive ? '#3498db' : '#e74c3c';
        this.ctx.fillRect(-this.car.width/2, -this.car.height/2, this.car.width, this.car.height);
        
        // Колеса
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.fillRect(-this.car.width/2 - 2, -this.car.height/2, 4, this.car.height);
        this.ctx.fillRect(this.car.width/2 - 2, -this.car.height/2, 4, this.car.height);
        
        // Фары
        this.ctx.fillStyle = '#f1c40f';
        this.ctx.fillRect(-this.car.width/2, -this.car.height/2, 3, 3);
        this.ctx.fillRect(this.car.width/2 - 3, -this.car.height/2, 3, 3);
        
        this.ctx.restore();
    }
    
    updateUI() {
        document.getElementById('generation').textContent = this.gameState.generation;
        document.getElementById('current-agent').textContent = this.gameState.currentAgent;
        document.getElementById('score').textContent = this.gameState.score;
        document.getElementById('best-score').textContent = this.gameState.bestScore;
        document.getElementById('successful-attempts').textContent = this.gameState.successfulAttempts;
        document.getElementById('total-time').textContent = this.gameState.totalTime;
        
        const startBtn = document.getElementById('start-btn');
        const resetBtn = document.getElementById('reset-btn');
        
        if (this.gameState.isRunning) {
            startBtn.style.display = 'none';
            resetBtn.style.display = 'block';
        } else {
            startBtn.style.display = 'block';
            resetBtn.style.display = 'none';
        }
    }
    
    showGameOverMessage() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#e74c3c';
        this.ctx.font = '48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('ИГРА ОКОНЧЕНА', this.canvas.width/2, this.canvas.height/2 - 50);
        
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '24px Arial';
        this.ctx.fillText(`Очки: ${this.gameState.score}`, this.canvas.width/2, this.canvas.height/2);
        this.ctx.fillText('Нажмите "Начать заново"', this.canvas.width/2, this.canvas.height/2 + 50);
    }
    
    showSuccessMessage() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#27ae60';
        this.ctx.font = '48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('КРУГ ПРОЙДЕН!', this.canvas.width/2, this.canvas.height/2 - 50);
        
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '24px Arial';
        this.ctx.fillText(`Очки: ${this.gameState.score}`, this.canvas.width/2, this.canvas.height/2);
        this.ctx.fillText('ИИ учится!', this.canvas.width/2, this.canvas.height/2 + 50);
    }
}

// Инициализация игры при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const game = new GameRenderer(canvas);
    
    // Периодическое обновление UI
    setInterval(() => {
        game.updateUI();
    }, 100);
}); 