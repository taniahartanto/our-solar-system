let mercuryImg;
let slider;
let dimImg, brightImg;
let snowflakeImg, fireImg;
let starParticles = [];
let particles = []; // Fire and snowflake particles
let brightness = 1;
let maxParticles = 30; // Maximum number of orbiting particles
let font;

function preload() {
    font = loadFont("fonts/ComicNeue-Bold.ttf");
    mercuryImg = loadImage("images/mercury.PNG");
    dimImg = loadImage("images/dim.png");
    brightImg = loadImage("images/bright.png");
    snowflakeImg = loadImage("images/snowflake.PNG");
    fireImg = loadImage("images/fire.PNG");
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("canvas-container");
    imageMode(CENTER);

    slider = createSlider(0, 1, 1, 0.01);
    slider.style("width", "300px");
    slider.position(width / 2, height * 0.8); // Slider position unchanged

    for (let i = 0; i < 300; i++) {
        starParticles.push(new Star(random(width), random(height)));
    }
}

function draw() {
    background(2, 7, 82);

    let sliderValue = slider.value();
    brightness = map(sliderValue, 0, 1, 0.3, 1);

    displayStars();
    displayMercury();
    manageParticles(sliderValue);
    displayParticles();

    let sliderX = windowWidth / 2;
    let sliderY = height * 0.8;

    image(dimImg, sliderX - 200, sliderY, 60, 60); // Dim image
    image(brightImg, sliderX + 200, sliderY, 60, 60); // Bright image
}

function displayMercury() {
    push();
    tint(255 * brightness);
    image(mercuryImg, width / 2, height / 2, width * 0.3, width * 0.3);
    pop();
}

function manageParticles(sliderValue) {
    // Add new particles if the total particle count is less than the max limit
    if (particles.length < maxParticles) {
        let numParticles = 10; // Number of particles to orbit around Mercury
        let radius = width * 0.3 / 2; // Radius of the circle around Mercury

        for (let i = 0; i < numParticles; i++) {
            let angle = random(TWO_PI);
            let offset = random(-20, 20);
            let x = width / 2 + cos(angle) * (radius + offset);
            let y = height / 2 + sin(angle) * (radius + offset);
            let img = sliderValue < 0.5 ? snowflakeImg : fireImg;
            particles.push(new Particle(x, y, img, angle, radius + offset));
        }
    }

    // Remove particles of the opposite type when slider value changes
    particles = particles.filter(particle => {
        return sliderValue < 0.5 ? particle.img === snowflakeImg : particle.img === fireImg;
    });
}

function displayParticles() {
    for (let particle of particles) {
        particle.update();
        particle.display();
    }
}

class Particle {
    constructor(x, y, img, angle, radius) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.angle = angle;
        this.radius = radius;
        this.size = random(width * 0.01, width * 0.03); // Size based on window width
        this.growthRate = random(-0.2, 0.2); // Growth or shrink rate
        this.speed = random(0.01, 0.02); // Speed of orbiting
    }

    update() {
        // Orbit around Mercury
        this.angle += this.speed;
        this.x = width / 2 + cos(this.angle) * this.radius;
        this.y = height / 2 + sin(this.angle) * this.radius;

        // Size oscillation
        this.size += this.growthRate;
        if (this.size < width * 0.01 || this.size > width * 0.06) {
            this.growthRate *= -1; // Reverse growth direction
        }
    }

    display() {
        image(this.img, this.x, this.y, this.size, this.size);
    }

    resize() {
        // Update radius and size when window is resized
        this.radius = width * 0.3 / 2 + random(-20, 20);
        this.size = constrain(this.size, width * 0.01, width * 0.06);
    }
}

function displayStars() {
    for (let star of starParticles) {
        star.update();
        star.display();
    }
}

class Star {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseDia = random(1, 8);
        this.oscillationSpeed = random(0.01, 0.07);
        this.timeOffset = random(TWO_PI);
    }

    update() {
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

        let oscillatingDia = this.size;
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

    // Keep the original slider position
    slider.position(width / 2, height * 0.8);

    // Update star positions
    for (let i = 0; i < starParticles.length; i++) {
        let star = starParticles[i];
        star.x = random(width);
        star.y = random(height);
    }

    // Resize fire and snowflake particles
    for (let i = 0; i < particles.length; i++) {
        particles[i].resize();
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
