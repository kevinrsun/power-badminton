class Stage {
    colours = [
    color(8, 44, 127), // Night blue
    color(0, 255, 248), // Neon blue
    color(255, 0, 253), // Neon pink
    color(0, 29, 95), // Dark blue
    ];

    horizon = height*0.6153;

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

        translate(-width/2, -height/2);
        fill(0, 0, 0);
        noStroke();
        beginShape();
        vertex(this.processPointX(0), this.processPointY(886));
        vertex(this.processPointX(0), this.processPointY(1367));
        vertex(this.processPointX(370), this.processPointY(1367));
        vertex(this.processPointX(727), this.processPointY(886));
        endShape();
        beginShape();
        vertex(this.processPointX(0), this.processPointY(1367));
        vertex(this.processPointX(0), this.processPointY(1440));
        vertex(this.processPointX(2560), this.processPointY(1440));
        vertex(this.processPointX(2560), this.processPointY(1367));
        endShape();
        beginShape();
        vertex(this.processPointX(1879), this.processPointY(886));
        vertex(this.processPointX(2102), this.processPointY(1367));
        vertex(this.processPointX(2560), this.processPointY(1367));
        vertex(this.processPointX(2560), this.processPointY(886));
        endShape();

        translate(width/2, height/2);
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
    }

    processPointX(x) {
        return width*(x/2560);
    }

    processPointY(y) {
        return height*(y/1440);
    }
}