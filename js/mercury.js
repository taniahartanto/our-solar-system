let mercuryImg, sunIcon, fireImg, snowflakeImg;
let slider; // Slider for brightness control
let particles = []; // Array to hold particles (fire, snowflakes, stars)
let starParticles = []; // Separate particles for the stars
let brightness = 1; // Initial brightness of Mercury (normalized)
let maxParticles = 30; // Maximum number of particles to be displayed

function preload() {
    font = loadFont("fonts/ComicNeue-Bold.ttf");
    mercuryImg = loadImage("images/mercury.PNG");
    sunIcon = loadImage("images/sun.PNG");
    fireImg = loadImage("images/fire.PNG");
    snowflakeImg = loadImage("images/snowflake.PNG");
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("canvas-container");
    imageMode(CENTER);

    // Create slider for brightness control
    slider = createSlider(0, 1, 1, 0.01); // Default value: 1 (original brightness)
    slider.position(width / 2 - 100, height - 130);
    slider.style("width", "200px");

    // Initialize the star particles
    for (let i = 0; i < 300; i++) {  // Adjust number of stars
        starParticles.push(new Star(random(width), random(height)));
    }
}

function draw() {
    background(0, 7, 111);  // Set the background color for the night sky

    // Draw sun icons at slider ends
    drawSliderIcons();

    // Adjust brightness based on slider value
    let sliderValue = slider.value();
    brightness = map(sliderValue, 0, 1, 0.3, 1); // Map slider: 0=darkest tint, 1=original brightness

    // Display stars in the background
    displayStars();

    // Display Mercury image
    displayMercury();

    // Manage particles based on slider position (snowflakes/fire)
    updateParticles(sliderValue);

    // Display particles (snowflakes or fire)
    displayParticles();
}

function drawSliderIcons() {
    push();
    imageMode(CENTER);

    // Left end: Small sun icon
    image(sunIcon, slider.x - 20, slider.y + 10, 30, 30);

    // Right end: Large sun icon
    image(sunIcon, slider.x + slider.width + 20, slider.y + 10, 50, 50);
    pop();
}

function displayMercury() {
    push();
    tint(255 * brightness); // Apply brightness tint
    image(mercuryImg, width / 2, height / 2, width * 0.3, width * 0.3); // Display Mercury at center
    pop();
}

function updateParticles(sliderValue) {
    // Add new particles based on slider position, only if the total particle count is less than the max limit
    if (particles.length < maxParticles) {
        let numParticles = 12; // Number of particles to be distributed around Mercury's circumference
        let radius = width * 0.3 / 2; // Set the radius of the circle around Mercury

        if (sliderValue < 0.5) {
            // Snowflake particles (left side of slider)
            for (let i = 0; i < numParticles; i++) {
                let angle = random(TWO_PI); // Random angle for each particle
                let offset = random(-20, 20); // Random offset for variation
                let x = width / 2 + cos(angle) * (radius + offset); // Randomized position
                let y = height / 2 + sin(angle) * (radius + offset); // Randomized position
                particles.push(new Particle(x, y, snowflakeImg));
            }
        } else {
            // Fire particles (right side of slider)
            for (let i = 0; i < numParticles; i++) {
                let angle = random(TWO_PI); // Random angle for each particle
                let offset = random(-20, 20); // Random offset for variation
                let x = width / 2 + cos(angle) * (radius + offset); // Randomized position
                let y = height / 2 + sin(angle) * (radius + offset); // Randomized position
                particles.push(new Particle(x, y, fireImg));
            }
        }
    }

    // Remove particles from the other type (ensuring we only show snowflakes or fire at a time)
    particles = particles.filter(particle => {
        if (sliderValue < 0.5) {
            return particle.img === snowflakeImg;
        } else {
            return particle.img === fireImg;
        }
    });

    // Check particles to cycle them based on size limits
    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        if (p.size < 10 || p.size > 60) {
            // Remove the particle if it's too small or too big
            particles.splice(i, 1);

            // Add a new particle at a random position
            let angle = random(TWO_PI);
            let offset = random(-20, 20);
            let radius = width * 0.3 / 2;
            let x = width / 2 + cos(angle) * (radius + offset);
            let y = height / 2 + sin(angle) * (radius + offset);

            // Add new particle
            if (sliderValue < 0.5) {
                particles.push(new Particle(x, y, snowflakeImg));
            } else {
                particles.push(new Particle(x, y, fireImg));
            }
        }
    }
}

function displayParticles() {
    for (let particle of particles) {
        particle.update();
        particle.display();
    }
}

function displayStars() {
    for (let star of starParticles) {
        star.update();
        star.display();
    }
}

class Particle {
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.size = random(20, 50); // Random initial size
        this.growthRate = random(-0.2, 0.2); // Random growth speed
        this.img = img; // Particle image (snowflake or fire)
    }

    update() {
        this.size += this.growthRate;

        // Keep size within bounds
        if (this.size < 10 || this.size > 60) {
            this.growthRate *= -1; // Reverse growth direction
        }
    }

    display() {
        push();
        image(this.img, this.x, this.y, this.size, this.size);
        pop();
    }
}

// Class for stars
class Star {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseDia = random(1, 8); // Base diameter for oscillation
        this.oscillationSpeed = random(0.01, 0.07); // Speed of oscillation
        this.timeOffset = random(TWO_PI); // Randomize start phase
    }

    update() {
        // Make the stars twinkle by oscillating their size
        this.size = this.baseDia + sin(frameCount * this.oscillationSpeed + this.timeOffset) * (this.baseDia / 2);
    }

    display() {
        push();
        noStroke();
        let randomBrightness = random(100, 255);
        fill(255, 255, randomBrightness);
        translate(this.x, this.y);
        rotate(PI / 4);
        rectMode(CENTER);

        // Display the twinkling star
        let oscillatingDia = this.size;
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

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    slider.position(width / 2 - 100, height - 130);
}
