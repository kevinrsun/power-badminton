let gameStarted = false;
let transitionComplete = false;
let transitionTime = 2000;
let transitionStartTime;
let stars = [];
let retroBackground;
let canvasSky;
let canvasSun;

let colours = {};

function preload() {
  retroBackground = loadImage('assests/retro_background.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create stars for start game transition
  for (let i = 0; i < 100; i++) {
    stars.push(new Star());
  }

  colours = [
    color(8, 44, 127), // Night blue
    color(0, 255, 248), // Neon blue
    color(255, 0, 253), // Neon pink
    color(0, 29, 95), // Dark blue
  ];

  canvasSky = drawSky();
  canvasSun = drawSun();
}

function keyPressed() {
  if (keyCode === 32) {
    console.log("space");
  }
  if (keyCode === 77) {
    console.log("m");
  }
}

function inverseColor(clr) {
  r = 255 - clr.levels[0];
  g = 255 - clr.levels[1];
  b = 255 - clr.levels[2];

  return color(r, g, b);
}

function hexToRgb(hex) {
  hex = hex.replace("#", "");

  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return color(r, g, b);
}

function startGame() {
  document.getElementById("start-page").remove();
  gameStarted = true;
  transitionStartTime = millis();

}

function draw() {

  if(gameStarted) {
    if(transitionComplete) {
      
      translate(0, -400, -2000);
      texture(canvasSky);
      plane(3400, 2600);

      fill(0, 0, 0, 0);
      texture(canvasSun);
      plane(1500);
      translate(0, 400, 2000);

      // background(retroBackground, 180);

      for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].display();
      }
    } else {
      // Show transition animation
      background(0);
      
      // Display the passing stars/warp effect
      for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].display();
      }
      
      let elapsedTime = millis() - transitionStartTime;
      if (elapsedTime >= transitionTime) {
        transitionComplete = true;
      }
    }
  }
}

class Star {
  constructor() {
    this.x = random(-width, width); // Start the stars outside the canvas
    this.y = random(-height, height); // Start the stars outside the canvas
    this.z = random(width); // Randomize the initial depth
    this.pz = this.z; // Store the previous z value for calculating the warp effect
  }

  update() {
    this.z -= 10; // Move the stars toward the viewer

    // Reset the stars once they move past the viewer
    if (this.z < 1) {
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.z = random(width);
      this.pz = this.z;
    }
  }

  display() {
    fill(255);
    noStroke();

    const sx = map(this.x / this.z, 0, 1, 0, width);
    const sy = map(this.y / this.z, 0, 1, 0, height);
    const r = map(this.z, 0, width, 8, 0);
    ellipse(sx, sy, r, r);

    const px = map(this.x / this.pz, 0, 1, 0, width);
    const py = map(this.y / this.pz, 0, 1, 0, height);
    this.pz = this.z;

    stroke(255);
    line(px, py, sx, sy);
  }
}

function drawSky() {
  const horizon = 1000;
  const sky = createGraphics(width, height);

  // Draw gradient sky
  sky.noFill();
  for (let i = 0; i <= horizon; i++) {
    const inter = map(i, 0, horizon, 0, 1);
    const c = lerpColor(colours[0], color(0, 0 ,0), inter);
    sky.stroke(c);
    sky.line(0, i, width, i);
  }

  // Add some stars
  sky.noStroke();
  sky.fill(255, 255, 255, random(100, 255));
  for (let i = 0; i < 100; i++) {
    sky.ellipse(random(0, 1100), random(0, 550), random(1, 5));
  }

  return sky;
}

// Draw gradient sun
function drawSun() {
  const sun = createGraphics(1000, 1000);
  sun.noFill();

  for (let i = 0; i <= sun.height; i++) {
    // Which colour?
    if (i % 10 >= 0 && i % 10 < 5) {
      sun.stroke(colours[2]);
    } else {
      sun.stroke(colours[3]);
    }

    // Calc colour
    const inter = map(i, 0, sun.height, 0, 1);

    // Calc circle
    const s = i * 2;
    const r = sun.width;
    const lineWidth = Math.sqrt((2 * s * r) - (s * s));
    const offset = (sun.width / 2) - (lineWidth / 2);
    sun.line(offset, i, lineWidth + offset, i);
  }
  return sun;
}