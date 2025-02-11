class Planet {
    constructor(x, y, radius, color, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
    }

    draw(cameraOffsetX, cameraOffsetY) {
        context.beginPath();
        context.arc(this.x - cameraOffsetX, this.y - cameraOffsetY, this.radius, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStyle = "white";
        context.fill()
        context.lineWidth = 1;
        context.stroke();
    }

    update(cameraOffsetX, cameraOffsetY) {
        this.x += this.dx;
        this.y += this.dy;
        this.draw(cameraOffsetX, cameraOffsetY);
    }
}

class PlanetField {
    constructor(color) {
        this.x = planet.x;
        this.y = planet.y;
        this.radius = planet.radius * 4;
        this.color = color;
        this.dx = planet.dx;
        this.dy = planet.dy;
    }

    draw(cameraOffsetX, cameraOffsetY) {
        context.beginPath();
        context.arc(this.x - cameraOffsetX, this.y - cameraOffsetY, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.strokeStyle = "white";
        context.lineWidth = 10;
        context.stroke();
        context.fill();
    }

    update(cameraOffsetX, cameraOffsetY) {
        this.x += this.dx;
        this.y += this.dy;
        this.draw(cameraOffsetX, cameraOffsetY);
    }
}

function initializePlanet() {
    let x = canvas.width / 2;
    let y = canvas.height / 2 + 600;
    let planetRadius = 350;
    let planetColor = "black";
    let dx = Math.random() - Math.random();
    let dy = Math.random() - Math.random();
    planet = new Planet(x, y, planetRadius, planetColor, dx, dy);

    let fieldColor = "rgb(100, 100, 100, 0.1";
    planetField = new PlanetField(fieldColor);
}

let planetField;
let planet;

