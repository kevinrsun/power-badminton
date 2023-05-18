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
        let xMin = -width/2;
        let xMax =  width/2
        let yMin = -height/2;
        let yMax =  height/2;
        
        noFill();
        for (let i = 0; i <= this.horizon; i++) {
            const inter = map(i, 0, this.horizon, 0, 1);
            const c = lerpColor(this.colours[0], color(0, 0 ,0), inter);
            stroke(c);
            line(xMin, yMin + i, xMax, yMin + i);
        }

        fill(0,0,0);
        line(xMin, 0.6153*yMax, 0.2816*xMin, 0.6153*yMax);

        // beginShape();
        // vertex(xMin, 0.6153*yMax);
        // vertex(0, 35);
        // vertex(10, 10);
        // vertex(35, 0);
        // vertex(10, -8);
        // vertex(0, -35);
        // vertex(-10, -8);
        // vertex(-35, 0);
        // endShape();

        // Add some stars
        // noStroke();
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

        // translate(width/2, height/2);
        noStroke();
        texture(img);
        rectMode(CENTER);
        rect(0, 0, width, height);
        console.log(width);
        console.log(height);
    }
}