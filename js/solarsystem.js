let img;
let img1;
let img2;
let img3;
let img4;
let img5;
let img6;
let img7;
let img8;
let img9;
let img10;
let font;

function preload() {
    font = loadFont("fonts/ComicNeue-Bold.ttf");
    font2 = loadFont("fonts/BobbyJones-Soft.otf");
    img = loadImage("images/rocket.PNG");
    img1 = loadImage("images/sun.PNG");
    img1.resize(350, 0);
    img2 = loadImage("images/mercury.PNG");
    img3 = loadImage("images/venus.PNG");
    img4 = loadImage("images/earth.PNG");
    img5 = loadImage("images/mars.PNG");
    img6 = loadImage("images/jupiter.PNG");
    img7 = loadImage("images/saturn.PNG");
    img8 = loadImage("images/uranus.PNG");
    img9 = loadImage("images/neptune.PNG");
    img10 = loadImage("images/moon.PNG");
}

let NUM_OF_PARTICLES = 300;
let particles = [];

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("canvas-container");

    for (let i = 0; i < NUM_OF_PARTICLES; i++) {
        particles.push(new Particle(random(width), random(height)));
    }
}

function draw() {
    background(2, 7, 82);

    // Draw stars
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.display();
    }

    // Orbit lines
    for (let i = 0; i < 10; i++) {
        let x = width * 0.05;
        let y = height * 0.5;
        let dia = i * width * 0.187;
        noFill();
        stroke(255);
        circle(x, y, dia);
    }

    imageMode(CENTER);

    renderPlanet(img1, width * 0.05, height * 0.5, width * 0.33, "Sun", width * 0.16, height * 0.23, "sun.html");
    renderPlanet(img2, width * 0.22, height * 0.6, width * 0.068, "Mercury", width * 0.25, height * 0.5, "mercury2.html");
    renderPlanet(img3, width * 0.32, height * 0.4, width * 0.097, "Venus", width * 0.32, height * 0.28, "venus.html");
    renderPlanet(img4, width * 0.42, height * 0.55, width * 0.12, "Earth", width * 0.40, height * 0.41, "earth.html");
    renderPlanet(img10, width * 0.46, height * 0.43, width * 0.037, "Moon", width * 0.46, height * 0.36, "moon2.html");
    renderPlanet(img5, width * 0.5, height * 0.73, width * 0.089, "Mars", width * 0.51, height * 0.62, "mars2.html");
    renderPlanet(img6, width * 0.61, height * 0.4, width * 0.19, "Jupiter", width * 0.65, height * 0.19, "jupiter2.html");
    renderPlanet(img7, width * 0.695, height * 0.7, width * 0.2, "Saturn", width * 0.74, height * 0.52, "saturn.html");
    renderPlanet(img8, width * 0.8, height * 0.35, width * 0.14, "Uranus", width * 0.84, height * 0.20, "uranus.html");
    renderPlanet(img9, width * 0.89, height * 0.6, width * 0.13, "Neptune", width * 0.89, height * 0.44, "neptune2.html");
}

function renderPlanet(img, x, y, baseWidth, name, textX, textY, pageUrl) {
    let baseHeight = baseWidth * (img.height / img.width);

    let mouseDist = dist(mouseX, mouseY, x, y);
    let hoverSize = 1.2;
    let planetWidth = baseWidth;
    let planetHeight = baseHeight;

    if (mouseDist < baseWidth / 2) {
        planetWidth = baseWidth * hoverSize;
        planetHeight = baseHeight * hoverSize;

        fill(255);
        textFont(font2);
        textAlign(CENTER, CENTER);
        let textSizeValue = width * 0.02;
        textSize(textSizeValue);
        text(name, textX, textY);

        if (mouseIsPressed) {
            window.open(pageUrl, "_self");
        }
    }

    image(img, x, y, planetWidth, planetHeight);
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