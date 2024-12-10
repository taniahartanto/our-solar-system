let font;
let darkSun, lightBulb, lightSun, fire, finalSun;
let currentState = "dark";

let lightBulbObject, fireObject;
let selectedObject = null;

let NUM_OF_PARTICLES = 300;
let particles = [];

function preload() {
    font = loadFont("fonts/ComicNeue-Bold.ttf");
    darkSun = loadImage("images/sun-dark.PNG");
    lightBulb = loadImage("images/lightbulb.PNG");
    lightSun = loadImage("images/sun-light.PNG");
    fire = loadImage("images/fire.PNG");
    finalSun = loadImage("images/sun.PNG");
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("canvas-container");
    imageMode(CENTER);

    for (let i = 0; i < NUM_OF_PARTICLES; i++) {
        particles.push(new Particle(random(width), random(height)));
    }

    lightBulbObject = new DraggableObject(lightBulb, width * 0.3, height * 0.5, width * 0.1, true);
    fireObject = new DraggableObject(fire, width * 0.7, height * 0.5, width * 0.1, false);
}

function draw() {
    background(2, 7, 82);

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.display();
    }

    if (currentState === "dark") {
        image(darkSun, width / 2, height / 2, width * 0.23, width * 0.23);
    } else if (currentState === "light") {
        image(lightSun, width / 2, height / 2, width * 0.23, width * 0.23);
    } else if (currentState === "fire") {
        image(finalSun, width / 2, height / 2, width * 0.4, width * 0.4);
    }

    if (lightBulbObject.isVisible) lightBulbObject.display();
    if (fireObject.isVisible) fireObject.display();
}

function mousePressed() {
    if (lightBulbObject.isVisible && lightBulbObject.isMouseOver()) {
        selectedObject = lightBulbObject;
    } else if (fireObject.isVisible && fireObject.isMouseOver()) {
        selectedObject = fireObject;
    }
}

function mouseDragged() {
    if (selectedObject) {
        selectedObject.x = mouseX;
        selectedObject.y = mouseY;
    }
}

function mouseReleased() {
    if (selectedObject) {
        if (currentState === "dark" && selectedObject === lightBulbObject) {
            if (isOverlapping(selectedObject.x, selectedObject.y, width / 2, height / 2, width * 0.4)) {
                currentState = "light";
                lightBulbObject.isVisible = false;
                fireObject.isVisible = true;
            }
        } else if (currentState === "light" && selectedObject === fireObject) {
            if (isOverlapping(selectedObject.x, selectedObject.y, width / 2, height / 2, width * 0.4)) {
                currentState = "fire";
                fireObject.isVisible = false;
            }
        }
        selectedObject = null;
    }
}

function mouseWheel(event) {
    if (selectedObject) {
        selectedObject.size += event.delta * -0.001;
        selectedObject.size = constrain(selectedObject.size, width * 0.05, width * 0.5);
    }
}

function isOverlapping(objX, objY, targetX, targetY, targetSize) {
    let distX = abs(objX - targetX);
    let distY = abs(objY - targetY);
    return distX < targetSize / 2 && distY < targetSize / 2;
}

class DraggableObject {
    constructor(img, x, y, size, isVisible) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.size = size;
        this.isVisible = isVisible;
    }

    display() {
        if (this.isVisible) {
            image(this.img, this.x, this.y, this.size, this.size);
        }
    }

    isMouseOver() {
        if (!this.isVisible) return false;
        let distX = abs(mouseX - this.x);
        let distY = abs(mouseY - this.y);
        return distX < this.size / 2 && distY < this.size / 2;
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

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x = random(width);
        p.y = random(height);
    }

    lightBulbObject.x = width * 0.3;
    lightBulbObject.y = height * 0.5;
    lightBulbObject.size = width * 0.1;

    fireObject.x = width * 0.7;
    fireObject.y = height * 0.5;
    fireObject.size = width * 0.1;
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
