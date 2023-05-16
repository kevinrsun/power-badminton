let gui = new dat.GUI();
let mic;
let started = false;
let particles = [];
let particleSize;
let num;
let mouse;
let micSen;
let vol;

function setup() {
  gui.width = windowWidth / 3;

  window.background_color = "#000000";
  window.particles = 10;
  window.particleSize = 15;
  window.opacity = 200;
  window.mouseEnabled = false;
  window.micSenEnabled = false;

  createCanvas(windowWidth, windowHeight);

  gui.addColor(window, "background_color").name("Background Color");
  gui.add(window, "particles", 0, 100).name("Number of Particles").onChange(createParticles);
  gui.add(window, "particleSize", 5, 50).name("Particle Size").onChange(createParticles);
  gui.add(window, "opacity", 0, 255).name("Opacity");
  mouse = gui.add(window, "mouseEnabled").name("Mouse Enabled");
  micSen = gui.add(window, "micSenEnabled").name("Mic Volume Reactive");

  mic = new p5.AudioIn();
  mic.start();

  createParticles();
}

function createParticles() {
  num = parseInt(window.particles);
  particleSize = window.particleSize;

  for (let i = 0; i < num; i++) {
    if(particles[i] == null) {
      let pull = random(0.005, 0.05);
      let clr = color(random(64, 255), random(64, 255), random(64, 255));

      particles[i] = new Particle(pull, clr);      
    }
  }
}

function keyPressed() {
  if (keyCode === 32) {
    console.log("space");
    mouse.setValue(!window.mouseEnabled);
  }
  if (keyCode === 77) {
    console.log("m");
    micSen.setValue(!window.micSenEnabled);
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

function draw() {
  let background_clr = hexToRgb(window.background_color);
  background(background_clr.levels[0], background_clr.levels[1], background_clr.levels[2], window.opacity);
  noStroke();

  textSize(23);
  textAlign(CENTER);
  fill(inverseColor(hexToRgb(window.background_color)));
  if(!window.mouseEnabled && !window.micSenEnabled) {
    text("Use controls on the top-right to adjust Particle settings", width / 2, height / 20);
    text("Press Spacebar to enable Mouse Interaction", width / 2, height / 12.5);
    text("Press M to enable Microphone Input Interaction", width / 2, height / 9);
  } else {
    text("Use controls on the top-right to adjust Particle settings", width / 2, height / 20);
    if(window.mouseEnabled) {
      text("Press Spacebar to disable Mouse Interaction", width / 2, height / 12.5);
      text("Press Left-click to pull Particles", width / 5, height / 20);
      text("Press Right-click to push Particles", width / 5, height / 12.5);
    } else {
      text("Press Spacebar to enable Mouse Interaction", width / 2, height / 12.5);
    }

    if (window.micSenEnabled) {
      text("Particle size reacts to Microphone Input", width / 5, height / 7);
      text("Press M to disable Microphone Input Interaction", width / 2, height / 9);
    } else {
      text("Press M to enable Microphone Input Interaction", width / 2, height / 9);
    }
  }

  for (let i = 0; i < num; i++) {
    particles[i].display();
    particles[i].move();
  }

  if (num != parseInt(window.particles)) {
    if(num < parseInt(window.particles)) {
      createParticles();
    } else {
      num = parseInt(window.particles);
    }
  }

  if(window.micSenEnabled) {
    let level = mic.getLevel();
    vol = map(level, 0, 1, 0, 200);
  } else {
    vol = 0;
  }
}

class Particle {
  constructor(pull, clr) {
    this.position = createVector(random(0, width), random(0, height));
    this.diameter = random(0, 15);
    this.pull = pull;
    this.col = clr;
    this.radius = this.diameter / 2;
    this.velocity = createVector(random(-15, 15), random(-15, 15));
  }

  display() {
    fill(this.col);
    circle(this.position.x, this.position.y, this.diameter + particleSize + vol);
  }

  move() {
    if(mouseIsPressed && mouseEnabled) {
      if (mouseButton === LEFT) {
          this.velocity.x = (mouseX - this.position.x) * this.pull;
          this.position.x += this.velocity.x;

          this.velocity.y = (mouseY - this.position.y) * this.pull;
          this.position.y += this.velocity.y;
      }

      if (mouseButton === RIGHT) {
        if(this.position.x < windowWidth - this.radius && this.position.x > 0 + this.radius && this.position.y < windowHeight - this.radius && this.position.y > 0 + this.radius) {
          this.velocity.x = (mouseX - this.position.x) * -this.pull;
          this.position.x += this.velocity.x;

          this.velocity.y = (mouseY - this.position.y) * -this.pull;
          this.position.y += this.velocity.y;
        }
      }
    } else {
      if(this.position.x > windowWidth - this.radius || this.position.x < 0 + this.radius) {
        this.velocity.x = -this.velocity.x;
      }
      if(this.position.y > windowHeight - this.radius || this.position.y < 0 + this.radius) {
        this.velocity.y = -this.velocity.y;
      }

      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }
  }
}