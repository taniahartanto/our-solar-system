let venusGlowImg;
let venusImg;
let earthImg;
let font;

function preload() {
    font = loadFont("fonts/ComicNeue-Bold.ttf");
    venusGlowImg = loadImage("images/venus-glow.PNG");
    venusImg = loadImage("images/venus.PNG");
    earthImg = loadImage("images/earth.PNG");
}

let NUM_OF_PARTICLES = 300;
let particles = [];
let venusAngle = 0;
let venusRotationSpeed = 0.007;
let maxAngle = 0.3;
let minAngle = -0.3;

let venusGlowScale = 1.33;

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("canvas-container");
    for (let i = 0; i < NUM_OF_PARTICLES; i++) {
        particles.push(new Particle(random(width), random(height)));
    }

    imageMode(CENTER);
}

function draw() {
    background(2, 7, 82);

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.display();
    }

    let venusX = width * 0.3;
    let venusY = height * 0.35;
    let venusWidth = width * 0.15;
    let venusHeight = venusWidth * (venusImg.height / venusImg.width);

    image(venusImg, venusX, venusY, venusWidth, venusHeight);

    if (dist(mouseX, mouseY, venusX, venusY) < venusWidth / 2) {
        updateVenusRotation();
        push();
        translate(venusX, venusY);
        rotate(venusAngle);
        image(venusGlowImg, 0, 0, venusWidth * venusGlowScale, venusHeight * venusGlowScale);
        pop();
    }

    let earthWidth = width * 0.7;
    let earthHeight = earthWidth * (earthImg.height / earthImg.width);
    image(earthImg, width * 0.7, height * 0.9, earthWidth, earthHeight);
}

function updateVenusRotation() {
    venusAngle += venusRotationSpeed;

    if (venusAngle > maxAngle || venusAngle < minAngle) {
        venusRotationSpeed *= -1;
    }
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

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x = random(width);
        p.y = random(height);
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