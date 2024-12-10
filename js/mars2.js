let font;
let img;
let imgWidth, imgHeight, imgX, imgY;
let imgYOffset = 0;
let imgYSpeed = 0.5;

let NUM_OF_PARTICLES = 200;
let particles = [];
let explosionParticles = [];

function preload() {
    font = loadFont("fonts/ComicNeue-Bold.ttf");
    img = loadImage("images/mars.PNG");
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("canvas-container");
    imageMode(CENTER);

    for (let i = 0; i < NUM_OF_PARTICLES; i++) {
        particles.push(new Particle(random(width), random(height)));
    }

    updateImageProperties();
}

function draw() {
    background(2, 7, 82);

    //stars bg
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.display();
    }

    //explosion particles
    for (let i = explosionParticles.length - 1; i >= 0; i--) {
        let p = explosionParticles[i];
        p.move();
        p.checkEdges();
        p.display();

        if (p.isDone) {
            explosionParticles.splice(i, 1);
        }
    }

    if (mouseIsPressed) {
        for (let i = 0; i < 0.5; i++) {
            explosionParticles.push(new Particle2(mouseX, mouseY, random(2, 10)));
        }
    }

    imgYOffset += imgYSpeed;
    if (imgYOffset > 15 || imgYOffset < -15) {
        imgYSpeed *= -1;
    }
    push();
    translate(imgX, imgY + imgYOffset);
    imageMode(CENTER);
    image(img, 0, 0, imgWidth, imgHeight);
    pop();
}

function mouseIsPressed() {
    for (let i = 0; i < 15; i++) {
        explosionParticles.push(new Particle2(mouseX, mouseY, random(1, 8)));
    }
}

function updateImageProperties() {
    imgWidth = width * 0.4;
    imgHeight = imgWidth * (img.height / img.width);
    imgX = width * 0.3;
    imgY = height * 0.5;
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

        let oscillatingDia = this.baseDia + sin(frameCount * this.oscillationSpeed + this.timeOffset) * (this.baseDia / 2);
        star(0, 0, oscillatingDia / 2, oscillatingDia, 5);
        pop();
    }
}

class Particle2 {
    constructor(startX, startY, startDia) {
        this.x = startX;
        this.y = startY;
        this.xSpeed = random(-3, 3);
        this.ySpeed = random(-3, 3);
        this.dia = startDia;
        this.isDone = false;
    }

    move() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    checkEdges() {
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
            this.isDone = true;
        }
    }

    display() {
        push();
        noStroke();
        let randomBrightness = random(100, 255);
        fill(255, 255, randomBrightness);
        translate(this.x, this.y);
        rotate(PI / 4);
        rectMode(CENTER);
        star(0, 0, this.dia / 2, this.dia, 5);
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

    updateImageProperties();
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
