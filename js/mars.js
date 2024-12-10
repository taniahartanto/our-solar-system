let NUM_OF_PARTICLES = 300; // Number of stars
let particles = [];
let marsRover, marsTerrain; // Variables for images
let roverX, roverY; // Position of the Mars rover
let roverSpeed = 5; // Speed of horizontal movement
let roverFlipped = false; // Variable to track rover's flip state
let roverWidth, roverHeight; // Dynamic size of the Mars rover
let terrainWidth, terrainHeight; // Dynamic size of the Mars terrain

function preload() {
    font = loadFont("fonts/ComicNeue-Bold.ttf");
    marsRover = loadImage("images/marsrover.png");
    marsTerrain = loadImage("images/marsterrain.png");
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("canvas-container");
    imageMode(CENTER);

    // Initialize stars
    for (let i = 0; i < NUM_OF_PARTICLES; i++) {
        particles.push(new Particle(random(width), random(height)));
    }

    // Set initial position of the Mars rover
    roverX = width / 2;
    roverY = height * 0.65;

    // Set initial dynamic size for rover and terrain (initial size based on original dimensions)
    updateSizes();
}

function draw() {
    background(2, 7, 82);

    // Display stars
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.display();
    }

    // Display Mars terrain as the background
    image(marsTerrain, width / 2, height * 0.63, terrainWidth, terrainHeight);

    // Display the Mars rover, flipping horizontally if needed
    push();
    if (roverFlipped) {
        scale(-1, 1); // Flip horizontally
        image(marsRover, -roverX, roverY, roverWidth, roverHeight);
    } else {
        image(marsRover, roverX, roverY, roverWidth, roverHeight);
    }
    pop();

    // Handle rover movement
    handleRoverMovement();
}

// Function to handle left/right arrow key input
function handleRoverMovement() {
    if (keyIsDown(LEFT_ARROW)) {
        roverX -= roverSpeed;
        roverFlipped = false; // Reset flip to normal when moving left
    }
    if (keyIsDown(RIGHT_ARROW)) {
        roverX += roverSpeed;
        roverFlipped = true; // Flip rover when moving right
    }

    // Constrain the rover's X position to stay within the canvas
    roverX = constrain(roverX, roverWidth / 2, width - roverWidth / 2);
}

// Handle window resize to adjust the canvas and reposition particles
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    // Update sizes for rover and terrain, but preserve the aspect ratio
    updateSizes();

    // Reposition stars randomly for new window size
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x = random(width);
        p.y = random(height);
    }
}

// Function to update the sizes of the rover and terrain
function updateSizes() {
    // Calculate scaling factors for the rover's size based on the current window size
    let widthScale = windowWidth / 1920;  // assuming 1920px was the original width (adjust as needed)
    let heightScale = windowHeight / 1080; // assuming 1080px was the original height (adjust as needed)

    // Set rover size based on the current window size, keeping its original aspect ratio intact
    roverWidth = marsRover.width * widthScale;
    roverHeight = marsRover.height * heightScale;

    // Set terrain size to a percentage of the window width and height
    terrainWidth = width * 0.9;  // 90% of window width
    terrainHeight = height * 0.9; // 90% of window height

    // Update rover position based on new window size
    roverX = width / 2;
    roverY = height * 0.65;
}

// Class for stars (particles)
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

// Function to draw a star shape
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