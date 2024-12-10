let jupiterImg, stormImg;
let jupiterX, jupiterY, jupiterWidth, jupiterHeight;
let stormX, stormY, stormWidth, stormHeight;
let NUM_OF_PARTICLES = 300;
let particles = [];
let stormVisible = false;
let jupiterTargetY;

function preload() {
    jupiterImg = loadImage("images/jupiter.PNG");
    stormImg = loadImage("images/storm.gif");
    font = loadFont("fonts/ComicNeue-Bold.ttf");
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("canvas-container");
    imageMode(CENTER);

    for (let i = 0; i < NUM_OF_PARTICLES; i++) {
        particles.push(new Particle(random(width), random(height)));
    }

    updateImagePositionsAndSizes();
}

function draw() {
    background(2, 7, 82);

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.display();
    }

    let distanceToJupiter = dist(mouseX, mouseY, jupiterX, jupiterY);
    if (distanceToJupiter < jupiterWidth / 2) {
        stormVisible = true;
        jupiterTargetY = height * 0.6;
    } else {
        stormVisible = false;
        jupiterTargetY = height / 2;
    }

    jupiterY = lerp(jupiterY, jupiterTargetY, 0.05);

    image(jupiterImg, jupiterX, jupiterY, jupiterWidth, jupiterHeight);

    if (stormVisible) {
        image(stormImg, stormX, stormY, stormWidth, stormHeight);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    updateImagePositionsAndSizes();
}

function updateImagePositionsAndSizes() {
    let sizeFactor = min(width, height) / 1000;

    jupiterX = width / 2;
    jupiterY = height / 2;
    jupiterWidth = jupiterImg.width * 0.9 * sizeFactor;
    jupiterHeight = jupiterWidth * (jupiterImg.height / jupiterImg.width);

    stormX = width / 2;
    stormY = height * 0.3;
    stormWidth = stormImg.width * 0.6 * sizeFactor;
    stormHeight = stormWidth * (stormImg.height / stormImg.width);
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

document.body.addEventListener('keydown', function (event) {
    event.preventDefault();
});

document.querySelector('button').addEventListener('keydown', function (event) {
    event.stopPropagation();
});

document.querySelector('#text-box').addEventListener('keydown', function (event) {
    event.stopPropagation();
});
