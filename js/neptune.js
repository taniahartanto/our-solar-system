let font;
let NUM_OF_PARTICLES = 300;
let particles = [];
let neptuneImg, neptunePoofImg, poofSound;

let neptuneX, neptuneY;
let neptuneCurrentImg;
let neptuneClicked = false;

function preload() {
    font = loadFont("fonts/ComicNeue-Bold.ttf");
    neptuneImg = loadImage("images/neptune.PNG");
    neptunePoofImg = loadImage("images/neptune-poof.png");
    poofSound = loadSound("sound/poof-sound-effect.mp3");
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("canvas-container");
    imageMode(CENTER);
    neptuneX = width / 2;
    neptuneY = height * 0.55;
    neptuneCurrentImg = neptuneImg;
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
    let neptuneWidth = width * 0.35;
    let neptuneHeight = neptuneWidth * (neptuneImg.height / neptuneImg.width);
    if (neptuneCurrentImg) {
        image(neptuneCurrentImg, neptuneX, neptuneY, neptuneWidth, neptuneHeight);
    }
}

function mousePressed() {
    let d = dist(mouseX, mouseY, neptuneX, neptuneY);
    let neptuneWidth = width * 0.35;
    if (d < (neptuneWidth / 2) && !neptuneClicked) {
        neptuneCurrentImg = neptunePoofImg;
        neptuneClicked = true;
        if (!poofSound.isPlaying()) {
            poofSound.play();
        }
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

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    neptuneX = width / 2;
    neptuneY = height / 2;
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
