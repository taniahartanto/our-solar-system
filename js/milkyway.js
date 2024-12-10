let img12;

function preload() {
    font = loadFont("fonts/ComicNeue-Bold.ttf");
    img12 = loadImage("images/milkyway.PNG");
}

let NUM_OF_PARTICLES = 300;
let particles = [];
let rotationAngle = 0;

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("canvas-container");
    for (let i = 0; i < NUM_OF_PARTICLES; i++) {
        particles.push(new Particle(random(width), random(height)));
    }
}

function draw() {
    background(2, 7, 82);

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.display();
    }

    imageMode(CENTER);

    // Milky Way
    let centerX = width / 2;
    let centerY = height / 2;
    let milkywayWidth = width * 0.45;
    let milkywayHeight = milkywayWidth * (img12.height / img12.width);

    push();
    translate(centerX, centerY);
    rotate(rotationAngle);
    image(img12, 0, 0, milkywayWidth, milkywayHeight);
    pop();

    rotationAngle -= 0.006;
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseDia = random(1, 5);
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