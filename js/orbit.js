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

let NUM_OF_PARTICLES = 600;
let particles = [];

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

    // Orbit lines 
    let centerX = width / 3;
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

    // Planetary motion
    let angleMercury = frameCount * 0.02;
    let angleVenus = frameCount * 0.015;
    let angleEarth = frameCount * 0.01;
    let angleMars = frameCount * 0.008;
    let angleJupiter = frameCount * 0.005;
    let angleSaturn = frameCount * 0.004;
    let angleUranus = frameCount * 0.003;
    let angleNeptune = frameCount * 0.002;

    // Mercury (Orbit 1) – Adjusted distance
    let mercuryDistance = width * 0.05;
    let mercuryX = centerX + cos(angleMercury) * mercuryDistance;
    let mercuryY = centerY + sin(angleMercury) * mercuryDistance;
    let mercuryWidth = width * 0.01;
    let mercuryHeight = mercuryWidth * (img2.height / img2.width);
    image(img2, mercuryX, mercuryY, mercuryWidth, mercuryHeight);

    // Venus (Orbit 2)
    let venusDistance = width * 0.075;
    let venusX = centerX + cos(angleVenus) * venusDistance;
    let venusY = centerY + sin(angleVenus) * venusDistance;
    let venusWidth = width * 0.02;
    let venusHeight = venusWidth * (img3.height / img3.width);
    image(img3, venusX, venusY, venusWidth, venusHeight);

    // Earth (Orbit 3)
    let earthDistance = width * 0.1;
    let earthX = centerX + cos(angleEarth) * earthDistance;
    let earthY = centerY + sin(angleEarth) * earthDistance;
    let earthWidth = width * 0.021;
    let earthHeight = earthWidth * (img4.height / img4.width);
    image(img4, earthX, earthY, earthWidth, earthHeight);

    // Mars (Orbit 4)
    let marsDistance = width * 0.125;
    let marsX = centerX + cos(angleMars) * marsDistance;
    let marsY = centerY + sin(angleMars) * marsDistance;
    let marsWidth = width * 0.018;
    let marsHeight = marsWidth * (img5.height / img5.width);
    image(img5, marsX, marsY, marsWidth, marsHeight);

    // Jupiter (Orbit 5)
    let jupiterDistance = width * 0.150;
    let jupiterX = centerX + cos(angleJupiter) * jupiterDistance;
    let jupiterY = centerY + sin(angleJupiter) * jupiterDistance;
    let jupiterWidth = width * 0.03;
    let jupiterHeight = jupiterWidth * (img6.height / img6.width);
    image(img6, jupiterX, jupiterY, jupiterWidth, jupiterHeight);

    // Saturn (Orbit 6)
    let saturnDistance = width * 0.175;
    let saturnX = centerX + cos(angleSaturn) * saturnDistance;
    let saturnY = centerY + sin(angleSaturn) * saturnDistance;
    let saturnWidth = width * 0.025;
    let saturnHeight = saturnWidth * (img7.height / img7.width);
    image(img7, saturnX, saturnY, saturnWidth, saturnHeight);

    // Uranus (Orbit 7)
    let uranusDistance = width * 0.2;
    let uranusX = centerX + cos(angleUranus) * uranusDistance;
    let uranusY = centerY + sin(angleUranus) * uranusDistance;
    let uranusWidth = width * 0.023;
    let uranusHeight = uranusWidth * (img8.height / img8.width);
    image(img8, uranusX, uranusY, uranusWidth, uranusHeight);

    // Neptune (Orbit 8)
    let neptuneDistance = width * 0.225;
    let neptuneX = centerX + cos(angleNeptune) * neptuneDistance;
    let neptuneY = centerY + sin(angleNeptune) * neptuneDistance;
    let neptuneWidth = width * 0.023;
    let neptuneHeight = neptuneWidth * (img9.height / img9.width);
    image(img9, neptuneX, neptuneY, neptuneWidth, neptuneHeight);
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
