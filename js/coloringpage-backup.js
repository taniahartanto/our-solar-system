let font;
let colors = [];
let brushColor;
let x, y;

let g;
let planetX, planetY, planetRad;

let buttons = [];

let NUM_OF_PARTICLES = 300;
let particles = [];

function preload() {
    font = loadFont("fonts/ComicNeue-Bold.ttf");
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight); // Canvas will take 90% width and 90% height
    cnv.parent("canvas-container");
    g = createGraphics(windowWidth, windowHeight); // Create off-screen graphics with same size

    // Planet and button positions based on the canvas size
    planetX = width * 0.5;
    planetY = height * 0.53;
    planetRad = width * 0.2; // Adjusted planet radius for better fit
    g.noStroke();
    g.fill(255);
    g.circle(planetX, planetY, planetRad * 2);

    colors[0] = color(255, 105, 180); // pink;
    colors[1] = color(120, 81, 169); // purple
    colors[2] = color(64, 224, 208); // blue
    colors[3] = color(50, 205, 50); // green
    colors[4] = color(255, 255, 0); // yellow

    brushColor = color(random(255), random(255), random(255));

    let size = width * 0.06; // Smaller button size proportional to canvas width
    let startX = width * 0.919; // Start the palette near the left edge
    let startY = height * 0.3; // Space the buttons vertically

    for (let i = 0; i < colors.length; i++) {
        let c = colors[i];
        let btn = new Button(startX, startY + size * i, size, c); // Adjust vertical position based on index
        buttons.push(btn);
    }

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

    // Draw with the brush
    let distance = dist(planetX, planetY, mouseX, mouseY);
    let pdistance = dist(planetX, planetY, pmouseX, pmouseY);

    if (mouseIsPressed && distance < planetRad && pdistance < planetRad) {
        g.stroke(brushColor);
        g.strokeWeight(width * 0.02); // Smaller brush size proportional to canvas width
        g.line(pmouseX, pmouseY, mouseX, mouseY);
    }

    push();
    image(g, 0, 0);
    pop();

    for (let i = 0; i < buttons.length; i++) {
        let btn = buttons[i];
        btn.checkMouse();
        btn.display();
    }
}

function keyPressed() {
    if (key == "1") {
        colors[0] = color(255, 105, 180); // pink;
        colors[1] = color(120, 81, 169); // purple
        colors[2] = color(64, 224, 208); // blue
        colors[3] = color(50, 205, 50); // green
        colors[4] = color(255, 255, 0); // yellow
    }
    if (key == "2") {
        colors[0] = color(1, 155, 120);
        colors[1] = color(73, 190, 173);
        colors[2] = color(107, 179, 36);
        colors[3] = color(253, 55, 84);
        colors[4] = color(250, 154, 71);
    }
    if (key == "3") {
        colors[0] = color(255, 62, 111);
        colors[1] = color(255, 124, 72);
        colors[2] = color(220, 255, 0);
        colors[3] = color(0, 244, 255);
        colors[4] = color(243, 0, 255);
    }
    if (key == "4") {
        colors[0] = color(138, 147, 182);
        colors[1] = color(226, 228, 230);
        colors[2] = color(157, 135, 191);
        colors[3] = color(250, 236, 204);
        colors[4] = color(186, 203, 227);
    }
    if (key == "5") {
        colors[0] = color(164, 200, 233);
        colors[1] = color(159, 193, 108);
        colors[2] = color(212, 150, 187);
        colors[3] = color(239, 202, 102);
        colors[4] = color(181, 164, 227);
    }
    if (key == "6") {
        colors[0] = color(238, 204, 99);
        colors[1] = color(241, 96, 35);
        colors[2] = color(173, 224, 28);
        colors[3] = color(68, 222, 234);
        colors[4] = color(26, 118, 169);
    }
    if (key == "7") {
        colors[0] = color(253, 228, 198);
        colors[1] = color(251, 210, 185);
        colors[2] = color(244, 188, 176);
        colors[3] = color(225, 171, 181);
        colors[4] = color(197, 143, 143);
    }
    if (key == "8") {
        colors[0] = color(32, 182, 147);
        colors[1] = color(141, 219, 83);
        colors[2] = color(255, 225, 33);
        colors[3] = color(255, 177, 60);
        colors[4] = color(255, 101, 163);
    }
    if (key == "9") {
        colors[0] = color(140, 216, 197);
        colors[1] = color(170, 218, 186);
        colors[2] = color(204, 45, 103);
        colors[3] = color(239, 183, 207);
        colors[4] = color(244, 173, 33);
    }
    if (key == "0") {
        colors[0] = color(255, 255, 255);
        colors[1] = color(171, 171, 171);
        colors[2] = color(114, 114, 114);
        colors[3] = color(64, 64, 64);
        colors[4] = color(0, 0, 0);
    }

    if (keyCode == ENTER) {
        saveCanvas("MyPlanet", "png");
    }

    // Update the whole buttons' colors
    for (let i = 0; i < buttons.length; i++) {
        let clr = colors[i];
        let btn = buttons[i];
        btn.color = clr;
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

class Button {
    constructor(x, y, sz, c) {
        this.x = x;
        this.y = y;
        this.sz = sz;
        this.color = c;
    }
    display() {
        push();
        fill(this.color);
        stroke(0); // Add stroke to make it visible
        strokeWeight(3);
        rectMode(CENTER);
        rect(this.x, this.y, this.sz, this.sz);
        pop();
    }
    checkMouse() {
        if (
            mouseX > this.x - this.sz / 2 &&
            mouseX < this.x + this.sz / 2 &&
            mouseY > this.y - this.sz / 2 &&
            mouseY < this.y + this.sz / 2
        ) {
            brushColor = this.color;
        }
    }
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
