let font;
let NUM_OF_PARTICLES = 300; // Number of stars
let particles = [];
let saturnRingsX, saturnRingsY, saturnRingsWidth, saturnRingsHeight;
let saturnRingsVelX, saturnRingsVelY; // Velocity of the rings
let saturnRingsActive = false;
let saturnRingsDragging = false;
let saturnImageX, saturnImageY, saturnImageWidth, saturnImageHeight;
let sadSaturnX, sadSaturnY, sadSaturnWidth, sadSaturnHeight;
let sadSaturn, saturnRings, saturnImage;
let asteroids = []; // Array to store asteroid objects
let asteroidImage;

function preload() {
    font = loadFont("fonts/ComicNeue-Bold.ttf");
    sadSaturn = loadImage("images/sad-saturn.png");
    saturnRings = loadImage("images/saturn-rings.png");
    saturnImage = loadImage("images/saturn.PNG");
    asteroidImage = loadImage("images/asteroid.png");
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("canvas-container");
    imageMode(CENTER);

    // Set initial positions and sizes for the images
    sadSaturnWidth = width * 0.4;
    sadSaturnHeight = sadSaturnWidth * (sadSaturn.height / sadSaturn.width);
    sadSaturnX = width * 0.5;
    sadSaturnY = height * 0.5;

    // Make the saturn rings smaller
    saturnRingsWidth = width * 0.15; // Smaller rings size
    saturnRingsHeight = saturnRingsWidth * (saturnRings.height / saturnRings.width);
    saturnRingsX = sadSaturnX; // Centered on Saturn
    saturnRingsY = sadSaturnY - saturnRingsHeight; // Slightly above Saturn


    // Increase speed to make the rings move faster
    saturnRingsVelX = random(8, 16) * (random() > 0.5 ? 1 : -1); // Faster horizontal speed
    saturnRingsVelY = random(8, 16) * (random() > 0.5 ? 1 : -1); // Faster vertical speed

    saturnImageWidth = width * 0.4;
    saturnImageHeight = saturnImageWidth * (saturnImage.height / saturnImage.width);
    saturnImageX = -200; // Initially hide the saturn image off-screen
    saturnImageY = -200; // Initially hide the saturn image off-screen

    // Initialize stars
    for (let i = 0; i < NUM_OF_PARTICLES; i++) {
        particles.push(new Particle(random(width), random(height)));
    }

    // Create more asteroids falling from top and right edges, diagonal motion towards bottom-left
    for (let i = 0; i < 15; i++) { // Increased number of asteroids
        asteroids.push(new Asteroid());
    }
}

function draw() {
    background(2, 7, 82);

    // Display particles (stars)
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.display();
    }

    // Update the position of the saturn rings with its velocity
    saturnRingsX += saturnRingsVelX;
    saturnRingsY += saturnRingsVelY;

    // Bounce the rings off the edges of the canvas
    if (saturnRingsX - saturnRingsWidth / 2 <= 0 || saturnRingsX + saturnRingsWidth / 2 >= width) {
        saturnRingsVelX *= -1; // Reverse direction horizontally
    }
    if (saturnRingsY - saturnRingsHeight / 2 <= 0 || saturnRingsY + saturnRingsHeight / 2 >= height) {
        saturnRingsVelY *= -1; // Reverse direction vertically
    }

    // Display sad saturn image in the center
    image(sadSaturn, sadSaturnX, sadSaturnY, sadSaturnWidth, sadSaturnHeight);

    // Display saturn rings floating around (DVD style)
    if (!saturnRingsActive) {
        image(saturnRings, saturnRingsX, saturnRingsY, saturnRingsWidth, saturnRingsHeight);
    }

    // Display saturn image after the rings are placed correctly
    if (saturnRingsActive) {
        image(saturnImage, saturnImageX, saturnImageY, saturnImageWidth, saturnImageHeight);
    }

    // Update and display asteroids only if saturn.PNG has not appeared
    if (!saturnRingsActive) {
        for (let i = 0; i < asteroids.length; i++) {
            let asteroid = asteroids[i];
            asteroid.update();
            asteroid.display();
        }
    }
}

// Mouse interaction to drag Saturn Rings
function mousePressed() {
    if (dist(mouseX, mouseY, saturnRingsX, saturnRingsY) < saturnRingsWidth / 2) {
        saturnRingsDragging = true; // Start dragging the rings
    }

    // Check if any asteroid is clicked
    for (let i = 0; i < asteroids.length; i++) {
        let asteroid = asteroids[i];
        if (asteroid.isClicked(mouseX, mouseY)) {
            // Shrink the rings when asteroid is clicked
            saturnRingsWidth *= 0.9;
            saturnRingsHeight *= 0.9;
            break; // Exit after shrinking the rings once
        }
    }
}

function mouseDragged() {
    if (saturnRingsDragging) {
        saturnRingsX = mouseX;
        saturnRingsY = mouseY;
    }
}

function mouseReleased() {
    // Check if the rings are in the correct position on sad saturn
    if (saturnRingsDragging) {
        let distance = dist(saturnRingsX, saturnRingsY, sadSaturnX, sadSaturnY);
        let threshold = sadSaturnWidth / 2;

        // If the rings are close to the center of the sad saturn image, "lock" them in place
        if (distance < threshold) {
            saturnRingsActive = true; // Activate the Saturn image to appear
            saturnImageX = sadSaturnX; // Position the Saturn image at the center
            saturnImageY = sadSaturnY;
        } else {
            // If not in correct position, reset rings
            saturnRingsX = sadSaturnX; // Reset to Saturn's center
            saturnRingsY = sadSaturnY - saturnRingsHeight; // Slightly above Saturn

        }

        saturnRingsDragging = false; // Stop dragging the rings
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

// Asteroid class for falling asteroids
class Asteroid {
    constructor() {
        // Randomly decide whether to start from the top or the right edge
        if (random() < 0.5) {
            // Start from top edge with random X
            this.x = random(width);
            this.y = -100; // Offscreen at top
        } else {
            // Start from right edge with random Y
            this.x = width + 100; // Offscreen at right
            this.y = random(height);
        }

        this.size = random(100, 200); // Larger initial size
        this.velX = random(-3, -5); // Diagonal motion towards bottom-left
        this.velY = random(3, 5); // Diagonal motion towards bottom-left
    }

    update() {
        this.x += this.velX;
        this.y += this.velY;

        // Reset asteroid if it goes off screen (bottom left)
        if (this.x < -this.size || this.y > height + this.size) {
            if (random() < 0.5) {
                this.x = random(width);
                this.y = -100; // Reset to top
            } else {
                this.x = width + 100; // Reset to right edge
                this.y = random(height);
            }
        }
    }

    display() {
        image(asteroidImage, this.x, this.y, this.size, this.size);
    }

    isClicked(mx, my) {
        let d = dist(mx, my, this.x, this.y);
        return d < this.size / 2;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    // Recalculate sad Saturn sizes and positions
    sadSaturnWidth = width * 0.4;
    sadSaturnHeight = sadSaturnWidth * (sadSaturn.height / sadSaturn.width);
    sadSaturnX = width * 0.5;
    sadSaturnY = height * 0.5;

    // Recalculate Saturn rings sizes and positions
    saturnRingsWidth = width * 0.15;
    saturnRingsHeight = saturnRingsWidth * (saturnRings.height / saturnRings.width);
    saturnRingsX = saturnRingsActive ? sadSaturnX : sadSaturnX; // Lock to sad Saturn if active
    saturnRingsY = saturnRingsActive ? sadSaturnY : sadSaturnY - saturnRingsHeight;

    // Recalculate Saturn image sizes and positions
    saturnImageWidth = sadSaturnWidth; // Match sad Saturn size
    saturnImageHeight = sadSaturnHeight;
    saturnImageX = sadSaturnX;
    saturnImageY = sadSaturnY;

    // Resize asteroids dynamically
    for (let i = 0; i < asteroids.length; i++) {
        let asteroid = asteroids[i];
        asteroid.size = random(width * 0.05, width * 0.1); // Adjust size based on window width
    }

    // Reinitialize particles (optional, or leave them untouched)
    particles = [];
    for (let i = 0; i < NUM_OF_PARTICLES; i++) {
        particles.push(new Particle(random(width), random(height)));
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
