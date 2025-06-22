start() {
    if (this.running) return; // Защита от повторного запуска
    this.running = true;
    this.animate();
    this.updateUI();
}

updateUI() {
    (document.getElementById('level') as HTMLElement).textContent = this.currentLevel.toString();
    (document.getElementById('generation') as HTMLElement).textContent = this.generation.toString();
    (document.getElementById('score') as HTMLElement).textContent = this.bestCar?.score.toString() ?? '0';
    (document.getElementById('best-score') as HTMLElement).textContent = this.cars.reduce((max, c) => Math.max(max, c.getFitness()), 0).toFixed(0);

    // Управление видимостью кнопок
    const startBtn = document.getElementById('start-btn') as HTMLButtonElement;
    const resetBtn = document.getElementById('reset-btn') as HTMLButtonElement;
    if (this.running) {
        if (startBtn) startBtn.style.display = 'none';
        if (resetBtn) resetBtn.style.display = 'block';
    } else {
        if (startBtn) startBtn.style.display = 'block';
        if (resetBtn) resetBtn.style.display = 'none';
    }
}

// Unused methods for now 