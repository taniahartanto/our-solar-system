let img12;

function preload() {
    font = loadFont("fonts/ComicNeue-Bold.ttf");
    img12 = loadImage("images/milkyway.PNG"); // Ensure the file path is correct
}

let NUM_OF_PARTICLES = 600;
let particles = [];
let rotationAngle = 0; // Initialize rotation angle

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("canvas-container"); // Ensure canvas is attached to #canvas-container
    for (let i = 0; i < NUM_OF_PARTICLES; i++) {
        particles.push(new Particle(random(width), random(height)));
    }
}

function draw() {
    background(0, 7, 111);

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.display();
    }

    imageMode(CENTER);

    // Milky Way (Rotating)
    let centerX = width / 2; // Define centerX
    let centerY = height / 2; // Define centerY
    let milkywayWidth = width * 0.45;
    let milkywayHeight = milkywayWidth * (img12.height / img12.width);

    push(); // Save current drawing state
    translate(centerX, centerY); // Move to the center of the canvas
    rotate(rotationAngle); // Apply rotation
    image(img12, 0, 0, milkywayWidth, milkywayHeight); // Draw image at the rotated position
    pop(); // Restore previous drawing state

    // Update rotation angle
    rotationAngle -= 0.006; // Adjust the speed of rotation
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight); // Adjust canvas size to match the new window dimensions
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseDia = random(1, 5); // Base diameter for oscillation
        this.oscillationSpeed = random(0.01, 0.07); // Speed of oscillation
        this.timeOffset = random(TWO_PI); // Randomize start phase
    }
    display() {
        push();
        noStroke();
        let randomBrightness = random(100, 255);
        fill(255, 255, randomBrightness);
        translate(this.x, this.y);
        rotate(PI / 4);
        rectMode(CENTER);

        // Oscillate the size
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
