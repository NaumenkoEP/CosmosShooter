const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth * 3;
canvas.height = window.innerHeight * 4;

canvas.style.backgroundColor = "black";

const shootSound = document.querySelector('#shoot-sound');
const engineSound = document.querySelector('#engine-sound');
const spaceSound = document.querySelector('#space-sound');

function getRandomOperator() {
    return Math.random() < 0.5 ? -1 : 1;
}

document.addEventListener('DOMContentLoaded', function() {
    const spaceSound = document.getElementById('space-sound');
    try {
        if (spaceSound) {
            const playSound = () => {
                spaceSound.playbackRate = 0.5;
                spaceSound.play();
                spaceSound.loop = true;
                document.removeEventListener('click', playSound);
            };
            document.addEventListener('click', playSound);
        }
    } catch (e) {
        console.log("No sound");
    }
});

let keys = {
    w: false,
    a: false,
    s: false,
    d: false
};

let engineSoundPlaying = false;
const checkEngineSound = () => {
    if (keys.w || keys.a || keys.s || keys.d) {
        if (!engineSoundPlaying && checkPresenceInPlanetField() === false) {
            engineSound.play();
            engineSoundPlaying = true;
        } else if (checkPresenceInPlanetField() === true){
            engineSound.pause();
            engineSound.currentTime = 0;
            engineSoundPlaying = false; 
        }
    } 
    else{
        engineSound.pause();
        engineSound.currentTime = 0;
        engineSoundPlaying = false;
    }
};
window.document.addEventListener('keydown', function(event) {
    if (event.code === "KeyS") keys.s = true;
    if (event.code === "KeyW") keys.w = true;
    if (event.code === "KeyD") keys.d = true;
    if (event.code === "KeyA") keys.a = true;
});

window.document.addEventListener('keyup', function(event) {
    if (event.code === "KeyS") keys.s = false;
    if (event.code === "KeyW") {
        setTimeout(function() {
            keys.w = false;
            particles = []
        }, 100);
    }
    if (event.code === "KeyD") keys.d = false;
    if (event.code === "KeyA") keys.a = false;
});

window.document.addEventListener('click', function(event) {
    if(checkPresenceInPlanetField() === false){
        event.preventDefault();
        const angle = player.angle - Math.PI / 2; // Calculate the angle in which the player is pointing
        const speed = 35; // Speed of the projectile
        const x = player.xPos + Math.cos(angle) * 30 + ((Math.random() * 10) * getRandomOperator()); // Starting x position of the projectile
        const y = player.yPos + Math.sin(angle) * 30 + 10; // Starting y position of the projectile
        const radius = 5;
        const color = "white";
        const velocity = {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed
        };
        shootSound.playbackRate = 0.5
        shootSound.currentTime = 0; // Reset the audio to the start
        shootSound.play(); // Play the shooting sound
        projectiles.push(new Projectile(x, y, radius, color, velocity));
    }
});

let shieldState = false;
window.document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    shieldState = true;
});

window.document.addEventListener('mouseup', function(event) {
    if (event.button === 2) {
        shieldState = false;
    }
});


let indexW = 22;
const animate = () => {
    checkPresenceInPlanetField();
    checkEngineSound();

    if (keys.w && !checkPresenceInPlanetField() || keys.a && !checkPresenceInPlanetField() || keys.s && !checkPresenceInPlanetField() || keys.d && !checkPresenceInPlanetField()) {
        context.fillStyle = 'rgba(0, 0, 0, 0.09)';
        context.fillRect(0, 0, canvas.width, canvas.height);
    } else {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    requestAnimationFrame(animate);

    let cameraOffsetX = player.camerabox.x + player.camerabox.width / 2 - canvas.width / 2;
    let cameraOffsetY = player.camerabox.y + player.camerabox.height / 2 - canvas.height / 2;

    regenerateStars(cameraOffsetX, cameraOffsetY);

    stars.forEach(star => {
        star.draw(cameraOffsetX, cameraOffsetY);
    });

    if (keys.w || keys.a || keys.s || keys.d) {
        if (!checkPresenceInPlanetField()) {
            particles.forEach((particle, index) => {
                if (particle.radius <= 0) {
                    particles.splice(index, 1);
                } else {
                    particle.update(cameraOffsetX, cameraOffsetY);
                }
            });
    
            let velocity;
            if (keys.w) {
                velocity = { x: 0, y: -Math.random() * 6 };
            } else if (keys.s) {
                velocity = { x: 0, y: Math.random() * 6 };
            } else if (keys.a) {
                velocity = { x: -Math.random() * 6, y: 0 };
            } else if (keys.d) {
                velocity = { x: Math.random() * 6, y: 0 };
            } else {
                velocity = { x: Math.cos(angle) * Math.random(), y: Math.sin(angle) * (Math.random() * 6) };
            }
    
            if (keys.s) {
                indexW = -5;
            } else if (keys.w) {
                indexW = 22;
            } else if (keys.a || keys.d) {
                indexW = -Math.random() * 20 * getRandomOperator();
            }
    
            const color = fireColors[Math.floor(Math.random() * fireColors.length)];
            particles.push(new FireParticle(player.xPos - Math.random() * 20 * getRandomOperator(), player.yPos + indexW, 5, color, velocity));
        }
    }

    projectiles.forEach((projectile) => {
        projectile.update(cameraOffsetX, cameraOffsetY);
    });

    player.draw(cameraOffsetX, cameraOffsetY);
    player.update();

    if (shieldState) {
        shield.update(cameraOffsetX, cameraOffsetY, player.angle);
    }

    planetField.update(cameraOffsetX, cameraOffsetY);
    planet.update(cameraOffsetX, cameraOffsetY);

    checkPresenceInPlanetField();
};

const checkPresenceInPlanetField = () => {
    const distance = Math.sqrt(Math.pow(player.xPos - planetField.x, 2) + Math.pow(player.yPos - planetField.y, 2));
    if(distance < 0 + planetField.radius){
        acceleration = 0.1;
        return true;
    } else {
        acceleration = 0.3;
        return false;
    }
};

initializePlanet();
initializeShield();
initializePlayer();
initializeStars();
animate();
































