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
  background(0, 7, 111);

  // Draw stars and other content
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.display();
  }

  // Title
  let imgWidth = width * 0.6;
  let imgHeight = imgWidth * (img11.height / img11.width);
  imageMode(CENTER);
  image(img11, width * 0.5, height * 0.4, imgWidth, imgHeight);

  // Planet positions
  // Sun
  let sunWidth = width * 0.27;
  let sunHeight = sunWidth * (img1.height / img1.width);
  image(img1, width * 0.1, height * 0.23, sunWidth, sunHeight);

  // Mercury
  let mercuryWidth = width * 0.13;
  let mercuryHeight = mercuryWidth * (img2.height / img2.width);
  image(img2, width * 0.12, height * 0.62, mercuryWidth, mercuryHeight);

  // Venus
  let venusWidth = width * 0.15;
  let venusHeight = venusWidth * (img3.height / img3.width);
  image(img3, width * 0.25, height * 0.48, venusWidth, venusHeight);

  // Earth
  let earthWidth = width * 0.15;
  let earthHeight = earthWidth * (img4.height / img4.width);
  image(img4, width * 0.3, height * 0.2, earthWidth, earthHeight);

  // Moon
  let moonWidth = width * 0.1;
  let moonHeight = moonWidth * (img10.height / img10.width);
  image(img10, width * 0.7, height * 0.17, moonWidth, moonHeight);

  // Mars
  let marsWidth = width * 0.15;
  let marsHeight = marsWidth * (img5.height / img5.width);
  image(img5, width * 0.22, height * 0.8, marsWidth, marsHeight);

  // Jupiter
  let jupiterWidth = width * 0.2;
  let jupiterHeight = jupiterWidth * (img6.height / img6.width);
  image(img6, width * 0.8, height * 0.75, jupiterWidth, jupiterHeight);

  // Saturn
  let saturnWidth = width * 0.23;
  let saturnHeight = saturnWidth * (img7.height / img7.width);
  image(img7, width * 0.87, height * 0.2, saturnWidth, saturnHeight);

  // Uranus
  let uranusWidth = width * 0.15;
  let uranusHeight = uranusWidth * (img8.height / img8.width);
  image(img8, width * 0.74, height * 0.43, uranusWidth, uranusHeight);

  // Neptune
  let neptuneWidth = width * 0.13;
  let neptuneHeight = neptuneWidth * (img9.height / img9.width);
  image(img9, width * 0.89, height * 0.47, neptuneWidth, neptuneHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Adjust canvas size to match the new window dimensions
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