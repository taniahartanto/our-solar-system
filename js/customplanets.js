let img1;
let img2;
let img3;
let img4;

let font;

function preload() {
  font = loadFont("fonts/ComicNeue-Bold.ttf");
  img1 = loadImage("images/ever.png");
  img2 = loadImage("images/ian.png");
  img3 = loadImage("images/leon.png");
  img4 = loadImage("images/martina.png");
}

let NUM_OF_PARTICLES = 400;
let particles = [];

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("canvas-container"); // Ensure canvas is attached to #canvas-container
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  background(2, 7, 82);

  // Draw stars and other content
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.display();
  }

  imageMode(CENTER);

  // Sun
  let sunWidth = width * 0.2;
  let sunHeight = sunWidth * (img1.height / img1.width);
  image(img1, width * 0.2, height * 0.35, sunWidth, sunHeight);

  // Mercury
  let mercuryWidth = width * 0.2;
  let mercuryHeight = mercuryWidth * (img2.height / img2.width);
  image(img2, width * 0.4, height * 0.65, mercuryWidth, mercuryHeight);

  // Venus
  let venusWidth = width * 0.2;
  let venusHeight = venusWidth * (img3.height / img3.width);
  image(img3, width * 0.6, height * 0.4, venusWidth, venusHeight);

  // Earth
  let earthWidth = width * 0.2;
  let earthHeight = earthWidth * (img4.height / img4.width);
  image(img4, width * 0.77, height * 0.7, earthWidth, earthHeight);


}


class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.baseDia = random(1, 8); // Base diameter for oscillation
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