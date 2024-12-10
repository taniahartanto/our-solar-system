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
let img11;
let font;

// Random starting angles for planets
let angleMercury, angleVenus, angleEarth, angleMars, angleJupiter, angleSaturn, angleUranus, angleNeptune;

function preload() {
    font = loadFont("fonts/ComicNeue-Bold.ttf");
    img = loadImage("images/rocket.PNG");
    img1 = loadImage("images/sun.PNG");
    img2 = loadImage("images/mercury.PNG");
    img3 = loadImage("images/venus.PNG");
    img4 = loadImage("images/earth.PNG");
    img5 = loadImage("images/mars.PNG");
    img6 = loadImage("images/jupiter.PNG");
    img7 = loadImage("images/saturn.PNG");
    img8 = loadImage("images/uranus.PNG");
    img9 = loadImage("images/neptune.PNG");
    img10 = loadImage("images/moon.PNG");
    img11 = loadImage("images/title.PNG");
}

let NUM_OF_PARTICLES = 300;
let particles = [];

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("canvas-container");

    // Initialize random starting angles
    angleMercury = random(TWO_PI);
    angleVenus = random(TWO_PI);
    angleEarth = random(TWO_PI);
    angleMars = random(TWO_PI);
    angleJupiter = random(TWO_PI);
    angleSaturn = random(TWO_PI);
    angleUranus = random(TWO_PI);
    angleNeptune = random(TWO_PI);

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

    let centerX = width * 0.3;
    let centerY = height / 2;

    for (let i = 1; i <= 9; i++) {
        let dia = width * 0.05 * i;
        noFill();
        stroke(255, 150);
        circle(centerX, centerY, dia);
    }

    imageMode(CENTER);

    // Sun
    let sunWidth = width * 0.08;
    let sunHeight = sunWidth * (img1.height / img1.width);
    image(img1, centerX, centerY, sunWidth, sunHeight);

    // Planetary motion with random starting angles
    let mercuryDistance = width * 0.05;
    let mercuryX = centerX + cos(angleMercury) * mercuryDistance;
    let mercuryY = centerY + sin(angleMercury) * mercuryDistance;
    let mercuryWidth = width * 0.01;
    let mercuryHeight = mercuryWidth * (img2.height / img2.width);
    image(img2, mercuryX, mercuryY, mercuryWidth, mercuryHeight);

    let venusDistance = width * 0.075;
    let venusX = centerX + cos(angleVenus) * venusDistance;
    let venusY = centerY + sin(angleVenus) * venusDistance;
    let venusWidth = width * 0.02;
    let venusHeight = venusWidth * (img3.height / img3.width);
    image(img3, venusX, venusY, venusWidth, venusHeight);

    let earthDistance = width * 0.1;
    let earthX = centerX + cos(angleEarth) * earthDistance;
    let earthY = centerY + sin(angleEarth) * earthDistance;
    let earthWidth = width * 0.021;
    let earthHeight = earthWidth * (img4.height / img4.width);
    image(img4, earthX, earthY, earthWidth, earthHeight);

    let marsDistance = width * 0.125;
    let marsX = centerX + cos(angleMars) * marsDistance;
    let marsY = centerY + sin(angleMars) * marsDistance;
    let marsWidth = width * 0.018;
    let marsHeight = marsWidth * (img5.height / img5.width);
    image(img5, marsX, marsY, marsWidth, marsHeight);

    let jupiterDistance = width * 0.150;
    let jupiterX = centerX + cos(angleJupiter) * jupiterDistance;
    let jupiterY = centerY + sin(angleJupiter) * jupiterDistance;
    let jupiterWidth = width * 0.03;
    let jupiterHeight = jupiterWidth * (img6.height / img6.width);
    image(img6, jupiterX, jupiterY, jupiterWidth, jupiterHeight);

    let saturnDistance = width * 0.175;
    let saturnX = centerX + cos(angleSaturn) * saturnDistance;
    let saturnY = centerY + sin(angleSaturn) * saturnDistance;
    let saturnWidth = width * 0.025;
    let saturnHeight = saturnWidth * (img7.height / img7.width);
    image(img7, saturnX, saturnY, saturnWidth, saturnHeight);

    let uranusDistance = width * 0.2;
    let uranusX = centerX + cos(angleUranus) * uranusDistance;
    let uranusY = centerY + sin(angleUranus) * uranusDistance;
    let uranusWidth = width * 0.023;
    let uranusHeight = uranusWidth * (img8.height / img8.width);
    image(img8, uranusX, uranusY, uranusWidth, uranusHeight);

    let neptuneDistance = width * 0.225;
    let neptuneX = centerX + cos(angleNeptune) * neptuneDistance;
    let neptuneY = centerY + sin(angleNeptune) * neptuneDistance;
    let neptuneWidth = width * 0.023;
    let neptuneHeight = neptuneWidth * (img9.height / img9.width);
    image(img9, neptuneX, neptuneY, neptuneWidth, neptuneHeight);

    // Update the angles to keep the planets orbiting
    angleMercury += 0.02;
    angleVenus += 0.015;
    angleEarth += 0.01;
    angleMars += 0.008;
    angleJupiter += 0.005;
    angleSaturn += 0.004;
    angleUranus += 0.003;
    angleNeptune += 0.002;
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