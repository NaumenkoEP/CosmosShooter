class Shield {
    constructor(radius, color) {
        this.radius = radius;
        this.color = color;
    }
    draw(cameraOffsetX, cameraOffsetY, angle) {
        context.save();
        context.translate(this.x - cameraOffsetX, this.y - cameraOffsetY);
        context.rotate(angle);
        context.beginPath();
        context.arc(0, 0, this.radius, 0, Math.PI, true); // Draw half circle
        context.strokeStyle = this.color;
        context.lineWidth = 1;
        context.stroke();
        context.closePath();
        context.restore();
    }
    update(cameraOffsetX, cameraOffsetY, angle) {
        this.x = player.xPos + Math.cos(angle)
        this.y = player.yPos + Math.sin(angle)
        console.log(`Shield Position: (${this.x}, ${this.y}), Angle: ${angle}`);
        this.draw(cameraOffsetX, cameraOffsetY, angle);
    }
}
function initializeShield(){
    let radius = 50;
    let shieldColor = "white";
    shield = new Shield(radius, shieldColor);
}
let shield;