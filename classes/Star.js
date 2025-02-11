class Star {
    constructor(xPos, yPos, radius, color) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.radius = radius;
        this.color = color;
    }

    draw(cameraOffsetX, cameraOffsetY) {
        context.save();
        context.translate(this.xPos - cameraOffsetX, this.yPos - cameraOffsetY);
        context.beginPath();
        context.arc(0, 0, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
        context.restore();
    }
}
function initializeStars(){
    for (let i = 0; i < 500; i++) {
        let xPos = Math.random() * canvas.width;
        let yPos = Math.random() * canvas.height;
        let radius = Math.random() * 2;
        let color = "white";
        stars.push(new Star(xPos, yPos, radius, color));
    }
}
const regenerateStars = (cameraOffsetX, cameraOffsetY) => {
    stars = stars.filter(star => {
        return (
            star.xPos >= cameraOffsetX &&
            star.xPos <= cameraOffsetX + canvas.width &&
            star.yPos >= cameraOffsetY &&
            star.yPos <= cameraOffsetY + canvas.height
        );
    });

    while (stars.length < 500) {
        let xPos = cameraOffsetX + Math.random() * canvas.width;
        let yPos = cameraOffsetY + Math.random() * canvas.height;
        let radius = Math.random() * 2;
        let color = "white";
        stars.push(new Star(xPos, yPos, radius, color));
    }
};
let stars = [];
