class Player {
    constructor(xPos, yPos, color) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.color = color;
        this.angle = 0; // Initial angle
        this.camerabox = {
            x: this.xPos - 200,
            y: this.yPos - 150,
            width: 400,
            height: 400
        };
    }

    draw(cameraOffsetX, cameraOffsetY) {
        context.save();
        // Translate to the center of the ship for rotation
        context.translate(this.xPos - cameraOffsetX, this.yPos - cameraOffsetY);
        context.rotate(this.angle);

        // Ship shape centered around (0, 0)
        context.beginPath();
        context.moveTo(0, -25); // Nose of the ship
        context.lineTo(0, 25); // Middle bottom of the ship
        context.lineTo(-30, 45); // Left side bottom of the ship
        context.lineTo(0, -25); // Back to the nose
        context.lineTo(30, 45); // Right side bottom of the ship
        context.lineTo(0, 25); // Middle bottom of the ship
        context.closePath();
        context.fillStyle = this.color;
        context.fill(); 
        context.strokeStyle = "white";
        context.lineWidth = 1;
        context.stroke();

        context.restore();
    }

    update() {
        if (keys.w) velocity.y -= acceleration;
        if (keys.s) velocity.y += acceleration;
        if (keys.a) velocity.x -= acceleration;
        if (keys.d) velocity.x += acceleration;

        velocity.x *= friction;
        velocity.y *= friction;

        this.xPos += velocity.x;
        this.yPos += velocity.y;

        if (velocity.x !== 0 || velocity.y !== 0) {
            this.angle = Math.atan2(velocity.y, velocity.x) + Math.PI / 2;
        }
        
        this.camerabox.x = this.xPos - this.camerabox.width / 2;
        this.camerabox.y = this.yPos - this.camerabox.height / 2;

        const distance = Math.sqrt(Math.pow(player.xPos - planet.x, 2) + Math.pow(player.yPos - planet.y, 2));
        if(distance < 0 + planet.radius + 30){
            velocity.x = -velocity.x
            velocity.y = -velocity.y
        }
    }
}

let velocity = {
    x: 0,
    y: 0
};

let acceleration = 0.3;
let friction = 0.99;

function initializePlayer(){
    let xPos = canvas.width / 2;
    let yPos = canvas.height - 70;
    let playerColor = "black";
    player = new Player(xPos, yPos, playerColor);
}

let player;
