class Birdie {

    constructor(asset) {
        this.w = 700
        this.h = 450
        this.velocity = 0;
        // this.birdPosition = { y: (CANVAS_HEIGHT / 2) - (BIRDSIZE.Width / 2), x: (CANVAS_WIDTH / 2) - (BIRDSIZE.Height / 2) };
        this.img = asset;
        this.birdRotate = { angle: 0, xOffset: 0, yOffset: 0 };
    }

    start() {

        angleMode(DEGREES);
        rotateX(160);
        image(this.img,0,0)
    }

    jump() {
        this.velocity = this.lift;
        this.birdRotate = { angle: -25, xOffset: -10, yOffset: 15 };
    }

    isDead() {
        return this.birdPosition.y >= CANVAS_HEIGHT - BIRDSIZE.Height - FLOOROFFSET ? true : false;
    }

    update() {
        this.velocity += this.gravity;
        this.birdPosition.y += this.velocity;

        if (this.velocity > 8)
            this.birdRotate = { angle: 0, xOffset: 0, yOffset: 0 };
        if (this.velocity > 9)
            this.birdRotate = { angle: 22.5, xOffset: 12, yOffset: -10 };

        if (this.velocity > 10)
            this.birdRotate = { angle: 45, xOffset: 30, yOffset: -15 };

        if (this.velocity > 11)
            this.birdRotate = { angle: 67.5, xOffset: 45, yOffset: -10 };

        if (this.velocity > 12)
            this.birdRotate = { angle: 90, xOffset: 60, yOffset: -10 };

        if (this.isDead()) {
            this.birdPosition.y = CANVAS_HEIGHT - BIRDSIZE.Height - FLOOROFFSET;
            this.velocity = 0;
            this.dead = true;
        }

        if (this.velocity > 15)
            this.velocity = 15;
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