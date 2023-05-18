class Birdie {

    leftEnd = 3.90;
    rightEnd = 5.50;
    startSpeed = 0.02;
    hitZone = 0.2;
    winScore = 5;

    constructor() {
        this.centerX = 0;
        this.centerY = 500;
        this.x = 0;
        this.y = 0;
        this.angle = 4.7;
        this.angleSpeed = this.startSpeed;
        this.arcRadius = 450;
        this.started = false;

        this.notUpdated = true;
        this.leftScore = 0;
        this.rightScore = 0;
        
        this.startTimer = 0;
        this.startWait = 4;
        this.isBlinking = false;

        this.blinkTimer = 0;
        this.blinkDuration = 2;
        this.isBlinking = false;

        this.hitSound = new Audio('assets/hit-sound.mp3');
        this.missSound = new Audio('assets/miss.mp3');
    }

    start() {
        this.started = !this.started;

        let rand = random();
        if(rand > 0.5) {
            this.angleSpeed *= -1; // Negative speed for left direction
        }
    }

    restart() {
        this.started = false;
        this.angle = 4.7;
        this.angleSpeed = this.startSpeed;
        this.notUpdated = true;
    }

    playHitSound() {
        this.hitSound.currentTime = 0;
        this.hitSound.play();
    }

    playMissSound() {
        this.missSound.currentTime = 0;
        this.missSound.play();
    }

    leftHit(speed) {
        if(this.angle < this.leftEnd + this.hitZone && this.angle > this.leftEnd) {
            this.playHitSound();
            this.angle = this.leftEnd;
            this.angleSpeed = map(speed, 0, -20, 0, 0.10);
        }
    }

    leftPoint() {
        this.playMissSound();
        this.isBlinking = true;
        this.leftScore++;
        this.notUpdated = false;
        console.log("Score is: " + this.leftScore + " - " + this.rightScore);
        if(this.leftScore == this.winScore) {
            this.leftWin();
        }
    }

    leftWin() {
        winner("Player1");
    }

    rightHit(speed) { 
        if(this.angle > this.rightEnd - this.hitZone && this.angle < this.rightEnd) {
            this.playHitSound();
            this.angle = this.rightEnd;
            this.angleSpeed = map(speed, 0, -20, 0, -0.10);
        }
    }

    rightPoint() {
        this.playMissSound();
        this.isBlinking = true;
        this.rightScore++;
        this.notUpdated = false;
        console.log("Score is: " + this.leftScore + " - " + this.rightScore);
        if(this.rightScore == this.winScore) {
            this.rightWin();
        }
    }

    rightWin() {
        winner("Player2");
    }

    update() {
        if(this.started) {
            this.angle += this.angleSpeed;
            if(this.angle < this.leftEnd) {
                this.angleSpeed = 0;
                if(this.notUpdated) {
                    this.rightPoint();
                }
            }
            if(this.angle > this.rightEnd) {
                this.angleSpeed = 0;
                if(this.notUpdated) {
                    this.leftPoint();
                }
            }
        } else {
            this.startTimer += deltaTime / 1000;
            if (this.startTimer >= this.startWait) {
                this.startTimer = 0;
                this.start();
            }
        }

        if (this.isBlinking) {
            this.blinkTimer += deltaTime / 1000;
            if (this.blinkTimer >= this.blinkDuration) {
                this.isBlinking = false;
                this.blinkTimer = 0;
                this.restart();
            }
        }
    }

    display() {
        if (this.isBlinking) {
            if (frameCount % 30 < 15) {
                // Blink on/off every half second
                fill(255, 0, 0); // Red color during blink
            } else {
                noFill(); // Default color
            }
        } else {
            fill(255);
        }

        this.x = this.centerX + this.arcRadius * cos(this.angle);
        this.y = this.centerY + this.arcRadius * sin(this.angle);
        ellipse(this.x, this.y, 50);

        noFill();
        this.x = this.centerX + this.arcRadius * cos(3.90);
        this.y = this.centerY + this.arcRadius * sin(3.90);
        ellipse(this.x, this.y, 50);
        this.x = this.centerX + this.arcRadius * cos(5.50);
        this.y = this.centerY + this.arcRadius * sin(5.50);
        ellipse(this.x, this.y, 50);

        // Draw the left score
        fill(255);
        textSize(40);
        text("Left Score: " + this.leftScore, -840, 300);

        // Draw the right score
        fill(255);
        textSize(40);
        text("Right Score: " + this.rightScore, 600, 300);
    }
}