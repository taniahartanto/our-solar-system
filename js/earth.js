let font;
let earthNoAir, earthNoWater, earthNoLand, earthNoLife, earthImg;
let currentState = "no-air"; // States: "no-air", "no-water", "no-land", "no-life", "final"
let airObject, waterObject, landObject, lifeObject; // Draggable objects
let selectedObject = null;

let NUM_OF_PARTICLES = 300; // Number of stars
let particles = [];

function preload() {
    font = loadFont("fonts/ComicNeue-Bold.ttf");
    earthNoAir = loadImage("images/earth-no-air.png");
    earthNoWater = loadImage("images/earth-no-water.png");
    earthNoLand = loadImage("images/earth-no-land.png");
    earthNoLife = loadImage("images/earth-no-life.png");
    earthImg = loadImage("images/earth.PNG");
    airObject = loadImage("images/air.png");
    waterObject = loadImage("images/water.png");
    landObject = loadImage("images/land.png");
    lifeObject = loadImage("images/life.png");
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("canvas-container");
    imageMode(CENTER);

    // Initialize stars
    for (let i = 0; i < NUM_OF_PARTICLES; i++) {
        particles.push(new Particle(random(width), random(height)));
    }

    // Initialize draggable objects
    airObject = new DraggableObject(airObject, width * 0.7, height * 0.5, width * 0.1, true);
    waterObject = new DraggableObject(waterObject, width * 0.7, height * 0.5, width * 0.1, false);
    landObject = new DraggableObject(landObject, width * 0.7, height * 0.5, width * 0.1, false);
    lifeObject = new DraggableObject(lifeObject, width * 0.7, height * 0.5, width * 0.1, false);
}

function draw() {
    background(0, 7, 111);

    // Draw stars
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.display();
    }

    // Display Earth based on the current state
    let earthX = width * 0.5;
    let earthY = height * 0.5;
    let earthWidth = width * 0.3;
    let earthHeight = earthWidth * (earthNoAir.height / earthNoAir.width);

    if (currentState === "no-air") {
        image(earthNoAir, earthX, earthY, earthWidth, earthHeight);
    } else if (currentState === "no-water") {
        image(earthNoWater, earthX, earthY, earthWidth, earthHeight);
        waterObject.isVisible = true; // Show water draggable object
    } else if (currentState === "no-land") {
        image(earthNoLand, earthX, earthY, earthWidth, earthHeight);
        landObject.isVisible = true; // Show land draggable object
    } else if (currentState === "no-life") {
        image(earthNoLife, earthX, earthY, earthWidth, earthHeight);
        lifeObject.isVisible = true; // Show life draggable object
    } else if (currentState === "final") {
        image(earthImg, earthX, earthY, earthWidth, earthHeight);
    }

    // Display draggable objects if they are visible
    if (airObject.isVisible) airObject.display();
    if (waterObject.isVisible) waterObject.display();
    if (landObject.isVisible) landObject.display();
    if (lifeObject.isVisible) lifeObject.display();
}

function mousePressed() {
    // Check if an object is clicked for dragging
    if (airObject.isVisible && airObject.isMouseOver()) {
        selectedObject = airObject;
    } else if (waterObject.isVisible && waterObject.isMouseOver()) {
        selectedObject = waterObject;
    } else if (landObject.isVisible && landObject.isMouseOver()) {
        selectedObject = landObject;
    } else if (lifeObject.isVisible && lifeObject.isMouseOver()) {
        selectedObject = lifeObject;
    }
}

function mouseDragged() {
    // Drag the selected object
    if (selectedObject) {
        selectedObject.x = mouseX;
        selectedObject.y = mouseY;
    }
}

function mouseReleased() {
    if (selectedObject) {
        // Check for interactions when dragging ends
        if (currentState === "no-air" && selectedObject === airObject) {
            if (isOverlapping(selectedObject.x, selectedObject.y, width / 2, height / 2, width * 0.3)) {
                currentState = "no-water"; // Transition to no-water state
                airObject.isVisible = false; // Hide air
            }
        } else if (currentState === "no-water" && selectedObject === waterObject) {
            if (isOverlapping(selectedObject.x, selectedObject.y, width / 2, height / 2, width * 0.3)) {
                currentState = "no-land"; // Transition to no-land state
                waterObject.isVisible = false; // Hide water
            }
        } else if (currentState === "no-land" && selectedObject === landObject) {
            if (isOverlapping(selectedObject.x, selectedObject.y, width / 2, height / 2, width * 0.3)) {
                currentState = "no-life"; // Transition to no-life state
                landObject.isVisible = false; // Hide land
            }
        } else if (currentState === "no-life" && selectedObject === lifeObject) {
            if (isOverlapping(selectedObject.x, selectedObject.y, width / 2, height / 2, width * 0.3)) {
                currentState = "final"; // Transition to final Earth state
                lifeObject.isVisible = false; // Hide life
            }
        }
        selectedObject = null; // Deselect after release
    }
}

// Check if an object overlaps the Earth
function isOverlapping(objX, objY, targetX, targetY, targetSize) {
    let distX = abs(objX - targetX);
    let distY = abs(objY - targetY);
    return distX < targetSize / 2 && distY < targetSize / 2;
}

// Class for draggable objects
class DraggableObject {
    constructor(img, x, y, size, isVisible) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.size = size;
        this.isVisible = isVisible; // Controls visibility of the object
    }

    display() {
        if (this.isVisible) {
            image(this.img, this.x, this.y, this.size, this.size);
        }
    }

    isMouseOver() {
        if (!this.isVisible) return false;
        let distX = abs(mouseX - this.x);
        let distY = abs(mouseY - this.y);
        return distX < this.size / 2 && distY < this.size / 2;
    }
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

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x = random(width);
        p.y = random(height);
    }

    airObject.x = width * 0.7;
    airObject.y = height * 0.5;
    airObject.size = width * 0.1;

    // waterObject = new DraggableObject(waterObject, width * 0.7, height * 0.5, width * 0.1, false);
    // landObject = new DraggableObject(landObject, width * 0.7, height * 0.5, width * 0.1, false);
    // lifeObject = new DraggableObject(lifeObject, width * 0.7, height * 0.5, width * 0.1, false);
}
