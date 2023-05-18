class Stage {
  colours = [
    color(8, 44, 127), // Night blue
    color(0, 255, 248), // Neon blue
    color(255, 0, 253), // Neon pink
    color(0, 29, 95), // Dark blue
  ];

  horizon = 850;

  constructor() {
    
  }

    drawSky() {
        // Draw gradient sky
        noFill();
        for (let i = 0; i <= this.horizon; i++) {
            const inter = map(i, 0, this.horizon, 0, 1);
            const c = lerpColor(this.colours[0], color(0, 0 ,0), inter);
            stroke(c);
            line(-width/2, -height/2 + i, width, -height/2 + i);
        }

        // Add some stars
        noStroke();
        // fill(255, 255, 255, random(100, 255));
        // for (let i = 0; i < 100; i++) {
        //     ellipse(random(0, 1100), random(0, 550), random(1, 5));
        // }
    }

    // Draw gradient sun
    drawSun() {
        const sun = createGraphics(1000, 1000);
        sun.noFill();

        for (let i = 0; i <= sun.height; i++) {
            // Which colour?
            if (i % 10 >= 0 && i % 10 < 5) {
            sun.stroke(this.colours[2]);
            } else {
            sun.stroke(this.colours[3]);
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

    // Draw stage
    drawStage(img) {

        const clearColor = color(0, 0, 0, 0); // Set the alpha value to 0 for full transparency
        clear();
        background(clearColor);

        // translate(width/2, height/2);
        texture(img);
        rectMode(CENTER);
        rect(0, 0, width, height);
        console.log(width);
        console.log(height);
    }
}