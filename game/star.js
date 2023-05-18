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