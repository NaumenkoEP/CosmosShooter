const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth * 3;
canvas.height = window.innerHeight * 4;

canvas.style.backgroundColor = "black";
let velocity = {
    x: 0,
    y: 0
};
let acceleration = 0.2;
let friction = 0.99;

let keys = {
    w: false,
    a: false,
    s: false,
    d: false
};

window.document.addEventListener('keydown', function(event) {
    if (event.code === "KeyS") keys.s = true;
    if (event.code === "KeyW") keys.w = true;
    if (event.code === "KeyD") keys.d = true;
    if (event.code === "KeyA") keys.a = true;
});

window.document.addEventListener('keyup', function(event) {
    if (event.code === "KeyS") keys.s = false;
    if (event.code === "KeyW"){
        setTimeout(function() {
            keys.w = false;
            particles = []
        }, 100);
    } 
    if (event.code === "KeyD") keys.d = false;
    if (event.code === "KeyA") keys.a = false;
});

class Player {
    constructor(xPos, yPos, color) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.color = color;
        this.camerabox = {
            x: this.xPos - 200,
            y: this.yPos - 150,
            width: 400,
            height: 400
        }
    }

    draw(cameraOffsetX, cameraOffsetY) {
        context.save();
        context.translate(-cameraOffsetX, -cameraOffsetY);
        
        context.beginPath();
        context.moveTo(this.xPos, this.yPos);
        context.lineTo(this.xPos, this.yPos + 50);
        context.lineTo(this.xPos - 30, this.yPos + 70);
        context.lineTo(this.xPos, this.yPos);
        context.lineTo(this.xPos + 30, this.yPos + 70);
        context.lineTo(this.xPos, this.yPos + 50);
        context.closePath();
        context.fillStyle = this.color;
        context.fill(); 
        context.strokeStyle = "white";
        context.stroke();
        
        context.restore();
    }
    update() {
        console.log(this.xPos, this.yPos);
        this.camerabox.x = this.xPos - this.camerabox.width / 2;
        this.camerabox.y = this.yPos - this.camerabox.height / 2;

        if (keys.w) velocity.y -= acceleration;
        if (keys.s) velocity.y += acceleration;
        if (keys.a) velocity.x -= acceleration;
        if (keys.d) velocity.x += acceleration;

        velocity.x *= friction;
        velocity.y *= friction;

        this.xPos += velocity.x;
        this.yPos += velocity.y;

        // if (this.xPos + 30 > canvas.width || this.xPos - 30 < 0) {
        //     velocity.x = -velocity.x;
        // } 
        // if (this.yPos < 0 || this.yPos + 70 > canvas.height) {
        //     velocity.y = -velocity.y;
        // }
    }
}

class Star {
    constructor(xPos, yPos, radius, color) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.radius = radius;
        this.color = color;
    }

    draw(cameraOffsetX, cameraOffsetY) {
        context.save();
        context.translate(-cameraOffsetX, -cameraOffsetY);
        
        context.beginPath();
        context.arc(this.xPos, this.yPos, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
        
        context.restore();
    }
}

const fireColors = ["white"];

class FireParticle {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
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
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.radius -= 0.2;
    }
}

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw(cameraOffsetX, cameraOffsetY) {
        context.save();
        context.translate(-cameraOffsetX, -cameraOffsetY);
        
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
        
        context.restore();
    }

    update(cameraOffsetX, cameraOffsetY) {
        this.draw(cameraOffsetX, cameraOffsetY);
        this.y += this.velocity;
        
    }
}
window.document.addEventListener('keydown', function(event) {
    if (event.code === "Space") {
        event.preventDefault();
        const x = player.xPos
        const y = player.yPos
        const radius = 5;
        const color = "white";
        const velocity = -30;
        projectiles.push(new Projectile(x, y, radius, color, velocity));
        console.log('Spacebar key pressed');
    }
});

window.document.addEventListener('keyup', function(event) {
    if (event.code === "Space") {
        // Spacebar key released
        console.log('Spacebar key released');
    }
});
let player;
const stars = [];
let particles = [];
let projectiles = [];

const initialize = () => {
    let xPos = canvas.width / 2;
    let yPos = canvas.height - 70;
    let color = "black";
    player = new Player(xPos, yPos, color);

    for (let i = 0; i < 5000; i++) {
        let xPos = Math.random() * canvas.width;
        let yPos = Math.random() * canvas.height;
        let radius = Math.random() * 2;
        let color = "white";
        let acceleration = Math.random() * 0.1;
        stars.push(new Star(xPos, yPos, radius, color, acceleration));
    }
};

let animationId;
const animate = () => {
   
    animationId = requestAnimationFrame(animate);
    
    let cameraOffsetX = player.camerabox.x + player.camerabox.width / 2 - canvas.width / 2;
    let cameraOffsetY = player.camerabox.y + player.camerabox.height / 2 - canvas.height / 2;
    
    if (keys.w) {
        context.fillStyle = 'rgba(0, 0, 0, 0.3)';
        context.fillRect(0, 0, canvas.width, canvas.height);
    } else {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    stars.forEach(star => {
        star.draw(cameraOffsetX, cameraOffsetY);
    });

    if (keys.w === true) {
        particles.forEach((particle, index) => {
            if (particle.radius <= 0) {
                particles.splice(index, 1);
            } else {
                particle.update(cameraOffsetX, cameraOffsetY);
            }
        });

        const angle = Math.random() * Math.PI * 2;
        const velocity = {
            x: Math.cos(angle) * (Math.random()),
            y: Math.sin(angle) * (Math.random() * 6)
        };
        const color = fireColors[Math.floor(Math.random() * fireColors.length)];
        particles.push(new FireParticle(player.xPos - Math.random() * 20 * getRandomOperator(), player.yPos + 40, 5, color, velocity));
    }
    projectiles.forEach(projectile => {
        projectile.update(cameraOffsetX, cameraOffsetY);
    });
    player.update();
    player.draw(cameraOffsetX, cameraOffsetY);
};

function getRandomOperator() {
    return Math.random() < 0.5 ? -1 : 1;
}

initialize();
animate();