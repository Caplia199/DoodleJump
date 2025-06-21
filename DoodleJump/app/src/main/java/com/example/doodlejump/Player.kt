package com.example.doodlejump

class Player {
    var x: Float = 0f
    var y: Float = 0f
    var velocityX: Float = 0f
    var velocityY: Float = 0f
    var width: Float = 40f
    var height: Float = 40f
    
    fun reset() {
        velocityX = 0f
        velocityY = 0f
        // Позиция будет установлена в onSizeChanged
    }
} 