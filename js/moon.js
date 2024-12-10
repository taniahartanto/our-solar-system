let font;
let earthImg, moonImg, humanImg, astronautImg;

function preload() {
    font = loadFont("fonts/ComicNeue-Bold.ttf");
    earthImg = loadImage("images/earthlandscape.png");
    moonImg = loadImage("images/moonlandscape.png");
    humanImg = loadImage("images/human.png");
    astronautImg = loadImage("images/astronaut.png");
}

let NUM_OF_PARTICLES = 300;
let particles = [];

let humanY, humanVelocity, humanAcceleration;
let astronautY, astronautVelocity, astronautAcceleration;

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("canvas-container");
    for (let i = 0; i < NUM_OF_PARTICLES; i++) {
        particles.push(new Particle(random(width), random(height)));
    }

    humanY = height * 0.73;
    humanVelocity = 0;
    humanAcceleration = 0.4;

    astronautY = height * 0.73;
    astronautVelocity = 0;
    astronautAcceleration = 0.1;
}

function draw() {
    background(2, 7, 82);

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.display();
    }

    push();
    imageMode(CORNER);
    // Earth and Moon images scaled to half the canvas width
    image(earthImg, 0, 0, width / 2, height);
    image(moonImg, width / 2, 0, width / 2, height * 0.95);
    pop();

    // Update human position with velocity and acceleration
    humanVelocity += humanAcceleration;
    humanY += humanVelocity;

    if (humanY > height * 0.73) {
        humanY = height * 0.73;
        humanVelocity = 0;
    }

    // Update astronaut position with velocity and acceleration
    astronautVelocity += astronautAcceleration;
    astronautY += astronautVelocity;

    if (astronautY > height * 0.73) {
        astronautY = height * 0.73;
        astronautVelocity = 0;
    }

    push();
    imageMode(CENTER);

    // Human image scaled based on width of canvas
    let humanWidth = width * 0.23;
    let humanHeight = humanWidth * (humanImg.height / humanImg.width);
    image(humanImg, width * 0.27, humanY, humanWidth, humanHeight);

    // Astronaut image scaled based on width of canvas
    let astronautWidth = width * 0.2;
    let astronautHeight = astronautWidth * (astronautImg.height / astronautImg.width);
    image(astronautImg, width * 0.73, astronautY, astronautWidth, astronautHeight);

    pop();
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseDia = random(1, 8);
        this.oscillationSpeed = random(0.01, 0.07);
        this.timeOffset = random(TWO_PI);
    }

    display() {
        push();
        noStroke();
        let randomBrightness = random(100, 255);
        fill(255, 255, randomBrightness);
        translate(this.x, this.y);
        rotate(PI / 4);
        rectMode(CENTER);

        let oscillatingDia =
            this.baseDia +
            sin(frameCount * this.oscillationSpeed + this.timeOffset) *
            (this.baseDia / 2);
        star(0, 0, oscillatingDia / 2, oscillatingDia, 5);
        pop();
    }
}

function star(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius2;
        let sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a + halfAngle) * radius1;
        sy = y + sin(a + halfAngle) * radius1;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    // Re-position particles and adjust image sizes on window resize
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x = random(width);
        p.y = random(height);
    }
}

function keyPressed() {
    if (key === ' ') {
        if (humanY === height * 0.73) {
            humanVelocity = -10;
        }
        if (astronautY === height * 0.73) {
            astronautVelocity = -8;
        }
    }
}

document.body.addEventListener('keydown', function (event) {
    event.preventDefault();
});

document.querySelector('button').addEventListener('keydown', function (event) {
    event.stopPropagation();
});

document.querySelector('#text-box').addEventListener('keydown', function (event) {
    event.stopPropagation();
});
