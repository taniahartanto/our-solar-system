let font;
let NUM_OF_PARTICLES = 300; // Number of stars
let particles = [];

let bnwUranus, paintBucket, blankPaintbrush, bluePaintbrush, uranusColored;
let brushX, brushY, brushSize;
let brushActive = false; // Determines if the brush is active
let planetPainted = false; // Whether the planet has been painted
let draggingBrush = false; // Track if the brush is being dragged
let bucketX, bucketY; // Position for the paint bucket
let brushOverBucket = false; // Track if the brush is over the paint bucket

function preload() {
    font = loadFont("fonts/ComicNeue-Bold.ttf");
    bnwUranus = loadImage("images/bnw-uranus.png");
    paintBucket = loadImage("images/paint-bucket.png");
    blankPaintbrush = loadImage("images/blank-paintbrush.png");
    bluePaintbrush = loadImage("images/blue-paintbrush.png");
    uranusColored = loadImage("images/uranus.PNG");
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("canvas-container");
    imageMode(CENTER);

    brushX = width * 0.8;
    brushY = height * 0.5;
    brushSize = width * 0.07;
    bucketX = width * 0.7; // Initial position for the paint bucket
    bucketY = height * 0.5;

    // Initialize stars
    for (let i = 0; i < NUM_OF_PARTICLES; i++) {
        particles.push(new Particle(random(width), random(height)));
    }
}

function draw() {
    background(2, 7, 82);

    // Display particles (stars)
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.display();
    }

    // Display planet image
    let planetWidth = width * 0.35;
    let planetHeight = planetWidth * (bnwUranus.height / bnwUranus.width);
    if (planetPainted) {
        image(uranusColored, width * 0.5, height * 0.5, planetWidth, planetHeight);
    } else {
        image(bnwUranus, width * 0.5, height * 0.5, planetWidth, planetHeight);
    }

    // Display paint bucket (if dragging, update its position)
    let bucketWidth = width * 0.1;
    let bucketHeight = bucketWidth * (paintBucket.height / paintBucket.width);
    image(paintBucket, bucketX, bucketY, bucketWidth, bucketHeight);

    // Display paintbrush (blank or blue based on brush state)
    if (draggingBrush && brushActive) {
        image(bluePaintbrush, mouseX, mouseY, brushSize, brushSize);
    } else {
        image(blankPaintbrush, brushX, brushY, brushSize, brushSize);
    }
}

// Mouse interactions for dragging the paintbrush
function mousePressed() {
    // If the paintbrush is clicked, make it follow the mouse
    if (dist(mouseX, mouseY, brushX, brushY) < brushSize) {
        draggingBrush = true;
    }
}

function mouseDragged() {
    // If dragging, move the brush with the mouse
    if (draggingBrush) {
        brushX = mouseX;
        brushY = mouseY;

        // If the brush is over the paint bucket, change it to blue
        if (!brushActive && dist(mouseX, mouseY, bucketX, bucketY) < width * 0.1 / 2) {
            brushActive = true; // Make the brush blue
        }
    }
}

function mouseReleased() {
    // When released, check for interactions with the planet or the paint bucket
    if (draggingBrush) {
        // If the blue brush is on the planet, paint the planet
        if (brushActive && dist(mouseX, mouseY, width * 0.5, height * 0.5) < width * 0.35 / 2) {
            planetPainted = true; // Change the planet to colored version
        }

        // If the brush is over the paint bucket, reset it to blue and place it over the bucket
        if (dist(mouseX, mouseY, bucketX, bucketY) < width * 0.1 / 2) {
            brushActive = true;
            brushX = bucketX; // Place brush on top of the paint bucket
            brushY = bucketY;
        }

        // Reset dragging state after releasing
        draggingBrush = false;
    }
}

// Check if the mouse is over the paintbrush
function isMouseOverBrush() {
    return dist(mouseX, mouseY, brushX, brushY) < brushSize;
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

    // Re-initialize particle positions
    for (let i = 0; i < particles.length; i++) {
        particles[i].x = random(width);
        particles[i].y = random(height);
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