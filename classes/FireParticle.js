class FireParticle {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;

        gsap.to(this, {
            x: this.x + this.velocity.x * 1,
            y: this.y + this.velocity.y * 100,
            radius: 0,
            duration: 1,
            ease: "power1.out",
            onComplete: () => {
                particles = particles.filter(p => p !== this);
            }
        });
    }

    draw(cameraOffsetX, cameraOffsetY) {
        context.save();
        context.translate(-cameraOffsetX, -cameraOffsetY);
        
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.shadowColor = this.color;
        context.shadowBlur = 20;
        context.fill();
        context.closePath();
        
        context.restore();
    }

    update(cameraOffsetX, cameraOffsetY) {
        this.draw(cameraOffsetX, cameraOffsetY);
    }
}
const fireColors = ["rgb(255, 255, 255, 0.9)"];
let particles = [];
