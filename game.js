let gameStarted = false;
let transitionComplete = false;
let transitionTime = 2000;
let transitionStartTime;
let setupFinished = false;
let stars = [];
let retroBackground;
let canvasSky;
let canvasSun;
let debugTools;
let debugEnabled = false;

let stage;
let player;

let colours = {};
let accelValues;

function preload() {
  retroBackground = loadImage('assets/retro_background.png');
  player1Img = loadImage('assets/player1.png');
  player2Img = loadImage('assets/player2.png');
  debugTools = document.getElementById('debug');
  customFont = loadFont('assets/BreeSerif-Regular.ttf');
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  textFont(customFont);
  startGame();

  // Create stars for start game transition
  for (let i = 0; i < 100; i++) {
    stars.push(new Star());
  }

  stage = new Stage();
  birdie = new Birdie();
  player1 = new Player(player1Img);
  player2 = new Player(player2Img);

  // colours = [
  //   color(8, 44, 127), // Night blue
  //   color(0, 255, 248), // Neon blue
  //   color(255, 0, 253), // Neon pink
  //   color(0, 29, 95), // Dark blue
  // ];

  // canvasSky = stage.drawSky();
  // canvasSun = stage.drawSun();
}

function keyPressed() {
  // Press space for Joy con debug
  if (keyCode === 32) {
    if(debugEnabled) {
      debugTools.style.display = 'none';
      debugEnabled = false;
    } else {
      debugTools.style.display = 'flex';
      debugEnabled = true;
    }
  }
  // Press S to start game
  if (keyCode === 83) {
    console.log("Started");
    birdie.start();
  }
  // Press A to Left Hit
  if (keyCode === 65) {
    birdie.leftHit(-10);
  }
  // Press D to Right hit
  if (keyCode === 68) {
    birdie.rightHit(-10);
  }
  // Press R to Reset
  if (keyCode === 82) {
    birdie.restart();
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
  gameStarted = true;
  transitionStartTime = millis();

}

function draw() {

  // console.log(value);

  if(gameStarted) {
    if(transitionComplete) {
      if(setupFinished) {
        stage.drawSky();
        stage.drawStage(retroBackground);
        for (let i = 0; i < stars.length; i++) {
          stars[i].update();
          stars[i].display();
        }

        birdie.display();
        birdie.update();

        player1.display();
        player2.display();

        // Bird starting - Random direction
        // Pass in speed value and direction

      } else {
        
        // plane(3400, 2600);

        // fill(0, 0, 0, 0);
        // texture(canvasSun);
        // plane(1500);
        // translate(0, 400, 2000);

        player1.setupLeft();
        player2.setupRight();
        

        setupFinished = true;
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

function winner(str){
  if (str == "Player1"){
    sessionStorage.setItem("Win", "Player1");
    window.location = "/result1.html"
  }
  else{
    sessionStorage.setItem("Win", "Player2");
    window.location = "/result2.html"
  }
}