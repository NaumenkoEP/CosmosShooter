class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;

        gsap.to(this, {
            x: this.x + this.velocity.x * 100,
            y: this.y + this.velocity.y * 100,
            duration: 1.5,
            ease: "power1.out",
            onComplete: () => {
                projectiles = projectiles.filter(p => p !== this);
            }
        });
    }

    draw(cameraOffsetX, cameraOffsetY) {
        context.save();
        context.translate(-cameraOffsetX, -cameraOffsetY);
        
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.shadowColor = this.color;
        context.shadowBlur = 1;
        context.fill();
        
        context.restore();
    }

    update(cameraOffsetX, cameraOffsetY) {
        this.draw(cameraOffsetX, cameraOffsetY);
    }
}
let projectiles = [];
