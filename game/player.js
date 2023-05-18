class Player {

    constructor(asset) {
        this.x = 0;
        this.y = 0;
        this.player = 0;
        this.img = asset;
    }

    display() {
        translate(0, height / 5);
        image(this.img, this.x, this.y, 50, 120)
        translate(0, -height / 5)
    }

    setupLeft(x, y) {
        this.x = -400;
        this.y = 0;
    }

    setupRight(x, y) {
        this.x = 330;
        this.y = 0;
    }
}