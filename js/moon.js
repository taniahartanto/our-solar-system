let font;
let basketball, baseball, golfball;
let earthOrbitAngle = 0;
let earthRotationAngle = 0;
let moonOrbitAngle = 0;
let earthOrbitRadius = 200;
let moonOrbitRadius = 50;
let basketsun, baseearth, golfmoon;

// Sun (Basketball), Earth (Baseball), and Moon (Golf Ball) sizes
let sunDiameter = 200;  // Sun (Basketball) size
let earthDiameter = 80; // Earth (Baseball) size
let moonDiameter = 30;  // Moon (Golf Ball) size

let NUM_OF_PARTICLES = 300; // Number of stars
let particles = [];

function preload() {
    font = loadFont("fonts/ComicNeue-Bold.ttf");
    basketball = loadImage("images/basketball.png");
    baseball = loadImage("images/baseball.png");
    golfball = loadImage("images/golfball.png");
    basketsun = loadImage("images/basketsun.png");
    baseearth = loadImage("images/baseearth.png");
    golfmoon = loadImage("images/golfmoon.png");
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("canvas-container");

    imageMode(CENTER);

    for (let i = 0; i < NUM_OF_PARTICLES; i++) {
        particles.push(new Particle(random(width), random(height)));
    }
}

function draw() {
    background(0, 7, 111);

    // Display particles (stars)
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.display();
    }

    // Calculate positions for Sun, Earth, and Moon
    let sunX = width * 0.35;
    let sunY = height / 2;
    let earthX = sunX + earthOrbitRadius * cos(earthOrbitAngle);
    let earthY = sunY + earthOrbitRadius * sin(earthOrbitAngle);
    let moonX = earthX + moonOrbitRadius * cos(moonOrbitAngle);
    let moonY = earthY + moonOrbitRadius * sin(moonOrbitAngle);

    // Draw orbit lines
    stroke(255, 100); // Orbit lines color (white with some transparency)
    noFill();

    // Earth's orbit (around the Sun)
    ellipse(sunX, sunY, earthOrbitRadius * 2, earthOrbitRadius * 2);

    // Moon's orbit (around the Earth)
    ellipse(earthX, earthY, moonOrbitRadius * 2, moonOrbitRadius * 2);

    // Draw the Sun (Basketball) in orbit
    image(basketball, sunX, sunY, sunDiameter, sunDiameter);

    // Draw the Earth (Baseball) in orbit with rotation
    push(); // Save the current transformation matrix
    translate(earthX, earthY); // Move to the Earth's position
    rotate(earthRotationAngle); // Rotate the Earth
    image(baseball, 0, 0, earthDiameter, earthDiameter); // Draw Earth at the rotated position
    pop(); // Restore the original transformation matrix

    // Draw the Moon (Golf Ball) in orbit
    image(golfball, moonX, moonY, moonDiameter, moonDiameter);

    // Update the orbit angles
    earthOrbitAngle += 0.01; // Speed of Earth's orbit around the Sun
    moonOrbitAngle += 0.03; // Speed of Moon's orbit around the Earth
    earthRotationAngle += 0.05; // Speed of Earth's rotation around its own axis

    // Draw the static Sun (basketsun)
    let sunWidth = width * 0.2;
    let sunHeight = sunWidth * (basketsun.height / basketsun.width);
    image(basketsun, width * 0.67, height * 0.35, sunWidth, sunHeight);

    // Draw the static Earth (baseearth)
    let earthWidth = width * 0.2; // Slightly smaller than the Sun
    let earthHeight = earthWidth * (baseearth.height / baseearth.width);
    image(baseearth, width * 0.65, height * 0.5, earthWidth, earthHeight);

    // Draw the static Moon (golfmoon)
    let moonWidth = width * 0.2; // Smaller than the Earth
    let moonHeight = moonWidth * (golfmoon.height / golfmoon.width);
    image(golfmoon, width * 0.65, height * 0.65, moonWidth, moonHeight);
}


// Particle class for stars
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
}
