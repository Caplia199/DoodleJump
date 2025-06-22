// --- Типы данных ---
interface Point {
    x: number;
    y: number;
}

interface Checkpoint extends Point {
    radius: number;
}

// --- Утилиты ---
function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

// --- Нейронная сеть ---
class NeuralNetwork {
    levels: Level[];

    constructor(neuronCounts: number[]) {
        this.levels = [];
        for (let i = 0; i < neuronCounts.length - 1; i++) {
            this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]));
        }
    }

    static feedForward(givenInputs: number[], network: NeuralNetwork): number[] {
        let outputs = Level.feedForward(givenInputs, network.levels[0]);
        for (let i = 1; i < network.levels.length; i++) {
            outputs = Level.feedForward(outputs, network.levels[i]);
        }
        return outputs;
    }

    static replicate(network: NeuralNetwork): NeuralNetwork {
        // Создаем новую сеть с такой же архитектурой
        const newNetwork = new NeuralNetwork(
            network.levels.map(l => l.inputs.length).concat(network.levels[network.levels.length - 1].outputs.length)
        );
        
        // Глубоко копируем веса и смещения
        for (let i = 0; i < network.levels.length; i++) {
            newNetwork.levels[i].biases = [...network.levels[i].biases];
            newNetwork.levels[i].weights = network.levels[i].weights.map(w => [...w]);
        }
        
        return newNetwork;
    }

    static mutate(network: NeuralNetwork, amount: number = 0.1) {
        network.levels.forEach(level => {
            for (let i = 0; i < level.biases.length; i++) {
                level.biases[i] = lerp(level.biases[i], Math.random() * 2 - 1, amount);
            }
            for (let i = 0; i < level.weights.length; i++) {
                for (let j = 0; j < level.weights[i].length; j++) {
                    level.weights[i][j] = lerp(level.weights[i][j], Math.random() * 2 - 1, amount);
                }
            }
        });
    }
}

class Level {
    inputs: number[];
    outputs: number[];
    biases: number[];
    weights: number[][];

    constructor(inputCount: number, outputCount: number) {
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        this.biases = new Array(outputCount);
        this.weights = Array.from({ length: inputCount }, () => new Array(outputCount));
        Level.#randomize(this);
    }

    static #randomize(level: Level) {
        for (let i = 0; i < level.inputs.length; i++) {
            for (let j = 0; j < level.outputs.length; j++) {
                level.weights[i][j] = Math.random() * 2 - 1;
            }
        }
        for (let i = 0; i < level.biases.length; i++) {
            level.biases[i] = Math.random() * 2 - 1;
        }
    }

    static feedForward(givenInputs: number[], level: Level): number[] {
        level.inputs.splice(0, level.inputs.length, ...givenInputs);
        for (let i = 0; i < level.outputs.length; i++) {
            let sum = 0;
            for (let j = 0; j < level.inputs.length; j++) {
                sum += level.inputs[j] * level.weights[j][i];
            }
            level.outputs[i] = sum > level.biases[i] ? 1 : 0; // Step activation
        }
        return level.outputs;
    }
}

// --- Класс трассы ---
class Track {
    outer: Point[] = [];
    inner: Point[] = [];
    checkpoints: Checkpoint[] = [];
    width: number;
    height: number;

    constructor(width: number, height: number, level: number = 1) {
        this.width = width;
        this.height = height;
        this.generateTrack(level);
        this.generateCheckpoints(level);
    }

    generateTrack(level: number) {
        if (level === 1) {
            // Уровень 1: Плавный овал
            this.outer = [
                { x: 150, y: 100 }, { x: 650, y: 100 }, { x: 725, y: 175 },
                { x: 750, y: 300 }, { x: 725, y: 425 }, { x: 650, y: 500 },
                { x: 150, y: 500 }, { x: 75, y: 425 }, { x: 50, y: 300 },
                { x: 75, y: 175 }, { x: 150, y: 100 }
            ];
            this.inner = [
                { x: 250, y: 200 }, { x: 550, y: 200 }, { x: 625, y: 250 },
                { x: 650, y: 300 }, { x: 625, y: 350 }, { x: 550, y: 400 },
                { x: 250, y: 400 }, { x: 175, y: 350 }, { x: 150, y: 300 },
                { x: 175, y: 250 }, { x: 250, y: 200 }
            ];
        } else if (level === 2) {
            // Уровень 2: Более извилистая трасса
            this.outer = [
                { x: 100, y: 100 }, { x: 400, y: 50 }, { x: 700, y: 100 },
                { x: 750, y: 300 }, { x: 700, y: 500 }, { x: 400, y: 550 },
                { x: 100, y: 500 }, { x: 50, y: 400 }, { x: 150, y: 300 },
                { x: 50, y: 200 }, { x: 100, y: 100 }
            ];
            this.inner = [
                { x: 200, y: 200 }, { x: 350, y: 150 }, { x: 600, y: 200 },
                { x: 650, y: 300 }, { x: 600, y: 400 }, { x: 450, y: 450 },
                { x: 300, y: 400 }, { x: 250, y: 350 }, { x: 350, y: 300 },
                { x: 250, y: 250 }, { x: 200, y: 200 }
            ];
        }
    }

    generateCheckpoints(level: number) {
        if (level === 1) {
            this.checkpoints = [
                { x: 400, y: 150, radius: 30 }, { x: 650, y: 150, radius: 30 },
                { x: 700, y: 300, radius: 30 }, { x: 650, y: 450, radius: 30 },
                { x: 400, y: 450, radius: 30 }, { x: 150, y: 450, radius: 30 },
                { x: 100, y: 300, radius: 30 }, { x: 150, y: 150, radius: 30 }
            ];
        } else if (level === 2) {
            this.checkpoints = [
                { x: 400, y: 100, radius: 25 }, { x: 650, y: 150, radius: 25 },
                { x: 700, y: 300, radius: 25 }, { x: 650, y: 450, radius: 25 },
                { x: 400, y: 500, radius: 25 }, { x: 150, y: 450, radius: 25 },
                { x: 100, y: 300, radius: 25 }, { x: 200, y: 225, radius: 25 },
                { x: 400, y: 200, radius: 25 }, { x: 550, y: 300, radius: 25 },
                { x: 450, y: 400, radius: 25 }, { x: 300, y: 325, radius: 25 }
            ];
        }
    }
}

// --- Класс машинки ---
class Car {
    x: number;
    y: number;
    angle: number;
    speed: number;
    brain: NeuralNetwork;
    alive: boolean = true;
    score: number = 0;
    timeAlive: number = 0;
    checkpointIndex: number = 0;
    laps: number = 0;
    
    readonly width: number = 20;
    readonly height: number = 30;
    readonly maxSpeed: number = 5;

    constructor(x: number, y: number, angle: number, brain?: NeuralNetwork) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = 0;
        this.brain = brain ? brain : new NeuralNetwork([2, 6, 1]);
    }

    update(track: Track): boolean {
        if (!this.alive) return false;
        
        this.speed = 2.5;

        const nextCp = track.checkpoints[this.checkpointIndex % track.checkpoints.length];
        const distToCp = Math.hypot(this.x - nextCp.x, this.y - nextCp.y);
        
        const angleToCp = Math.atan2(nextCp.y - this.y, nextCp.x - this.x);
        let carAngleRelativeToCp = this.angle - angleToCp;

        while (carAngleRelativeToCp > Math.PI) carAngleRelativeToCp -= 2 * Math.PI;
        while (carAngleRelativeToCp < -Math.PI) carAngleRelativeToCp += 2 * Math.PI;

        const inputs = [
            distToCp / 300, 
            carAngleRelativeToCp / Math.PI
        ];
        const outputs = NeuralNetwork.feedForward(inputs, this.brain);
        const turn = outputs[0] * 2 - 1;

        this.angle += 0.03 * turn;

        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        this.timeAlive++;
        
        this.checkCollision(track);
        return this.checkCheckpoints(track);
    }
    
    checkCollision(track: Track) {
        if (!isPointInsideTrack(this, track)) {
            this.alive = false;
        }
    }

    checkCheckpoints(track: Track): boolean {
        if (!this.alive) return false;
        const nextCp = track.checkpoints[this.checkpointIndex % track.checkpoints.length];
        const distToCp = Math.hypot(this.x - nextCp.x, this.y - nextCp.y);
        if (distToCp < nextCp.radius) {
            this.checkpointIndex++;
            this.timeAlive = 0;

            if (this.checkpointIndex >= track.checkpoints.length) {
                this.laps++;
                this.checkpointIndex = 0;
                return true; // Lap completed
            }
        }
        return false; // Lap not completed
    }

    getFitness(track: Track): number {
        const nextCpIndex = this.checkpointIndex % track.checkpoints.length;
        const nextCp = track.checkpoints[nextCpIndex];
        const prevCpIndex = (this.checkpointIndex - 1 + track.checkpoints.length) % track.checkpoints.length;
        const prevCp = track.checkpoints[prevCpIndex];

        const totalCpDist = Math.hypot(nextCp.x - prevCp.x, nextCp.y - prevCp.y);
        const distToNextCp = Math.hypot(this.x - nextCp.x, this.y - nextCp.y);
        
        const progress = Math.max(0, totalCpDist - distToNextCp);
        let fitness = (this.checkpointIndex * totalCpDist) + progress;

        fitness -= (this.timeAlive * 0.1);

        if (!this.alive) {
            fitness -= 100;
        }

        return fitness;
    }

    getCorners(): Point[] {
        const rad = Math.hypot(this.width, this.height) / 2;
        const alpha = Math.atan2(this.width, this.height);
        const p1 = { x: this.x - Math.sin(this.angle - alpha) * rad, y: this.y + Math.cos(this.angle - alpha) * rad };
        const p2 = { x: this.x - Math.sin(this.angle + alpha) * rad, y: this.y + Math.cos(this.angle + alpha) * rad };
        const p3 = { x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad, y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad };
        const p4 = { x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad, y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad };
        return [p1, p2, p3, p4];
    }
}

// --- Простейший ИИ ---
class SimpleAI {
    // На вход: сенсоры, на выход: {acc, turn}
    decide(sensors: number[]): {acc: number, turn: number} {
        // Простая логика: если впереди свободно — газуем, иначе тормозим и поворачиваем
        const front = sensors[2];
        const left = sensors[1];
        const right = sensors[3];
        let acc = front > 0.3 ? 1 : -1;
        let turn = 0;
        if (left < right && left < 0.5) turn = 1;
        else if (right < left && right < 0.5) turn = -1;
        return {acc, turn};
    }
}

// --- Сенсоры ---
function getSensors(car: Car, track: Track): number[] {
    const sensorAngles = [-90, -45, 0, 45, 90];
    const result: number[] = [];
    for (let a of sensorAngles) {
        const angle = car.angle + (a * Math.PI) / 180;
        result.push(getDistanceToBoundary(car.x, car.y, angle, track));
    }
    return result;
}

function getDistanceToBoundary(x: number, y: number, angle: number, track: Track): number {
    // Луч до пересечения с границей (упрощённо: только внешняя граница)
    const rayLength = 200;
    let minDist = rayLength;
    for (let i = 0; i < track.outer.length - 1; i++) {
        const p1 = track.outer[i];
        const p2 = track.outer[i + 1];
        const dist = lineIntersection(x, y, x + Math.cos(angle) * rayLength, y + Math.sin(angle) * rayLength, p1.x, p1.y, p2.x, p2.y);
        if (dist > 0 && dist < minDist) minDist = dist;
    }
    for (let i = 0; i < track.inner.length - 1; i++) {
        const p1 = track.inner[i];
        const p2 = track.inner[i + 1];
        const dist = lineIntersection(x, y, x + Math.sin(angle) * rayLength, y - Math.cos(angle) * rayLength, p1.x, p1.y, p2.x, p2.y);
        if (dist > 0 && dist < minDist) minDist = dist;
    }
    return minDist / rayLength;
}

function lineIntersection(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): number {
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

function pointInPolygon(point: Point, polygon: Point[]): boolean {
    let isInside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].x, yi = polygon[i].y;
        const xj = polygon[j].x, yj = polygon[j].y;

        const intersect = ((yi > point.y) !== (yj > point.y))
            && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
        if (intersect) isInside = !isInside;
    }
    return isInside;
}

function isPointInsideTrack(car: Car, track: Track): boolean {
    // Проверяем все 4 угла машины
    for (const corner of car.getCorners()) {
        if (!pointInPolygon(corner, track.outer) || pointInPolygon(corner, track.inner)) {
            return false;
        }
    }
    return true;
}

// --- Основная логика ---
class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    track: Track;
    cars: Car[] = [];
    bestCar: Car | null = null;
    populationSize: number = 1;
    currentCarIndex: number = 0;
    running: boolean = false;
    animationId: number = 0;
    generation: number = 1;
    currentLevel: number = 1;
    totalLaps: number = 0;
    startTime: number = 0;
    
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.track = new Track(canvas.width, canvas.height, this.currentLevel);
        this.initUI();
    }

    initUI() {
        document.getElementById('start-btn')!.addEventListener('click', () => this.start());
        document.getElementById('reset-btn')!.addEventListener('click', () => this.resetGame());
    }
    
    start() {
        if (this.running) return;
        
        document.getElementById('start-btn')!.style.display = 'none';
        document.getElementById('reset-btn')!.style.display = 'inline-block';

        this.resetGame(false); // Не сбрасываем localStorage при старте
    }

    resetGame(clearLocalStorage = true) {
        this.running = false;
        if(this.animationId) cancelAnimationFrame(this.animationId);

        this.currentLevel = 1;
        this.generation = 1;
        this.totalLaps = 0;
        this.startTime = Date.now();

        if (clearLocalStorage) {
            localStorage.removeItem("bestBrain_level" + this.currentLevel);
        }

        this.track = new Track(this.canvas.width, this.canvas.height, this.currentLevel);
        this.cars = this.createInitialPopulation();
        this.currentCarIndex = 0;
        
        const storedBrain = localStorage.getItem("bestBrain_level" + this.currentLevel);
        if (storedBrain) {
            console.log("Loading brain from localStorage for level", this.currentLevel);
            const bestBrain = JSON.parse(storedBrain);
            this.cars[0].brain = bestBrain;
            this.bestCar = this.cars[0];
        }
        
        this.running = true;
        this.animate();
    }
    
    createInitialPopulation(): Car[] {
        const cars: Car[] = [];
        const startPos = this.getStartPosition();
        for (let i = 0; i < this.populationSize; i++) {
            cars.push(new Car(startPos.x, startPos.y, startPos.angle));
        }
        this.currentCarIndex = 0;
        return cars;
    }

    nextGeneration() {
        this.generation++;
    
        const bestCarOfLastGeneration = this.cars.reduce((a, b) => a.getFitness(this.track) > b.getFitness(this.track) ? a : b);

        if (bestCarOfLastGeneration) {
            this.bestCar = new Car(0,0,0, bestCarOfLastGeneration.brain); 
            localStorage.setItem("bestBrain_level" + this.currentLevel, JSON.stringify(bestCarOfLastGeneration.brain));
            
            this.cars = this.createInitialPopulation();
            
            this.cars[0].brain = NeuralNetwork.replicate(bestCarOfLastGeneration.brain);
            NeuralNetwork.mutate(this.cars[0].brain, 0.2);

        } else {
            this.cars = this.createInitialPopulation();
        }
        this.currentCarIndex = 0;
    }
    
    animate() {
        if (!this.running) return;

        const currentCar = this.cars[this.currentCarIndex];
        const lapCompleted = currentCar.update(this.track);

        if (lapCompleted) {
            this.running = false; // Pause the game
            this.showLevelCompleteBanner(() => {
                this.nextLevel(currentCar.brain);
                this.running = true;
                this.animate();
            });
            return; 
        }
        
        if (!currentCar.alive) {
            this.currentCarIndex++;
            if (this.currentCarIndex >= this.cars.length) {
                this.nextGeneration();
            }
        }

        this.updateUI();

        this.render();
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    getStartPosition(): { x: number, y: number, angle: number } {
        if (this.currentLevel === 1) {
            return { x: 170, y: 150, angle: 0 };
        } else if (this.currentLevel === 2) {
            return { x: 150, y: 150, angle: 0 };
        }
        throw new Error("Invalid level");
    }
    
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderTrack();

        if (this.currentCarIndex >= this.cars.length) return;
        const currentCar = this.cars[this.currentCarIndex];

        this.ctx.save();
        this.track.checkpoints.forEach((cp, index) => {
            const nextCpIndex = currentCar.checkpointIndex % this.track.checkpoints.length;
            
            this.ctx.beginPath();
            this.ctx.arc(cp.x, cp.y, cp.radius, 0, Math.PI * 2);
            this.ctx.lineWidth = 2;
            
            if (index < currentCar.checkpointIndex) {
                this.ctx.strokeStyle = "rgba(0, 255, 0, 0.8)";
                this.ctx.fillStyle = "rgba(0, 255, 0, 0.3)";
            } else if (index === nextCpIndex) {
                this.ctx.strokeStyle = "rgba(255, 255, 0, 1)";
                this.ctx.fillStyle = "rgba(255, 255, 0, 0.4)";
            } else {
                this.ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
                this.ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
            }
            this.ctx.stroke();
            this.ctx.fill();
            
            this.ctx.fillStyle = "white";
            this.ctx.font = "12px Arial";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText((index).toString(), cp.x, cp.y);
        });
        this.ctx.restore();

        this.ctx.globalAlpha = 0.2;
        this.cars.forEach(car => {
            if (car.alive) this.renderCar(car)
        });
        this.ctx.globalAlpha = 1;

        if (currentCar && currentCar.alive) {
            this.renderCar(currentCar);
        }
    }

    renderTrack() {
        this.ctx.save();
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 5;
        this.ctx.fillStyle = '#888'; // Цвет дороги

        // Рисуем внешнюю и внутреннюю границы и заливаем пространство между ними
        this.ctx.beginPath();
        this.ctx.moveTo(this.track.outer[0].x, this.track.outer[0].y);
        for (const p of this.track.outer) {
            this.ctx.lineTo(p.x, p.y);
        }
        this.ctx.closePath();

        this.ctx.moveTo(this.track.inner[0].x, this.track.inner[0].y);
        for (const p of this.track.inner) {
            this.ctx.lineTo(p.x, p.y);
        }
        this.ctx.closePath();
        
        this.ctx.fill('evenodd');
        
        // Рисуем белые линии границ
        this.ctx.beginPath();
        this.ctx.moveTo(this.track.outer[0].x, this.track.outer[0].y);
        for (const p of this.track.outer) {
            this.ctx.lineTo(p.x, p.y);
        }
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(this.track.inner[0].x, this.track.inner[0].y);
        for (const p of this.track.inner) {
            this.ctx.lineTo(p.x, p.y);
        }
        this.ctx.stroke();

        // Рисуем стартовую линию
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 10;
        this.ctx.setLineDash([10, 10]);
        this.ctx.beginPath();
        if (this.currentLevel === 1) {
            this.ctx.moveTo(200, 100);
            this.ctx.lineTo(200, 200);
        } else if (this.currentLevel === 2) {
            this.ctx.moveTo(150, 100);
            this.ctx.lineTo(150, 200);
        }
        this.ctx.stroke();

        this.ctx.restore();
    }

    renderCar(car: Car) {
        this.ctx.save();
        this.ctx.translate(car.x, car.y);
        this.ctx.rotate(car.angle);
        this.ctx.fillStyle = car.alive ? '#3498db' : '#e74c3c';
        this.ctx.fillRect(-car.width / 2, -car.height / 2, car.width, car.height);
        this.ctx.restore();
    }
    
    updateUI() {
        (document.getElementById('level') as HTMLElement).textContent = this.currentLevel.toString();
        (document.getElementById('generation') as HTMLElement).textContent = this.generation.toString();
        
        const bestCarOfLastGeneration = this.cars.reduce((a, b) => a.getFitness(this.track) > b.getFitness(this.track) ? a : b);
        (document.getElementById('best-score') as HTMLElement).textContent = bestCarOfLastGeneration.getFitness(this.track).toFixed(0);
        
        if (this.currentCarIndex < this.cars.length) {
            const currentCar = this.cars[this.currentCarIndex];
            if (currentCar) {
                (document.getElementById('score') as HTMLElement).textContent = currentCar.getFitness(this.track).toFixed(0);
            }
        }

        (document.getElementById('laps-completed') as HTMLElement).textContent = this.totalLaps.toString();
        const elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
        (document.getElementById('total-time') as HTMLElement).textContent = `${elapsedTime}с`;
    }

    showLevelCompleteBanner(callback: () => void) {
        const banner = document.getElementById('level-complete-banner')!;
        banner.style.display = 'block';
        setTimeout(() => {
            banner.style.display = 'none';
            callback();
        }, 3000); // Show for 3 seconds
    }

    nextLevel(fittestBrain: NeuralNetwork) {
        this.totalLaps++;
        this.currentLevel++;
        this.generation = 1;

        if (this.currentLevel > 2) { 
            alert("Поздравляем! Вы прошли все уровни!");
            this.resetGame(true);
            return;
        }

        localStorage.setItem("bestBrain_level" + this.currentLevel, JSON.stringify(fittestBrain));

        this.track = new Track(this.canvas.width, this.canvas.height, this.currentLevel);
        this.cars = this.createInitialPopulation();
        this.cars[0].brain = NeuralNetwork.replicate(fittestBrain);
        NeuralNetwork.mutate(this.cars[0].brain, 0.3);

        this.currentCarIndex = 0;
        this.bestCar = this.cars[0];
    }
}

// --- Запуск ---
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    if (canvas) {
        const game = new Game(canvas);
    }
});
