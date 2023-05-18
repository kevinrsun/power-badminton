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

let colours = {};
let accelValues;

function preload() {
  retroBackground = loadImage('assests/retro_background.png');
  debugTools = document.getElementById('debug');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  startGame();

  // Create stars for start game transition
  for (let i = 0; i < 100; i++) {
    stars.push(new Star());
  }

  stage = new Stage();

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
        for (let i = 0; i < stars.length; i++) {
          stars[i].update();
          stars[i].display();
        }
      } else {
        stage.drawStage(retroBackground);
        
        console.log();
        
        // plane(3400, 2600);

        // fill(0, 0, 0, 0);
        // texture(canvasSun);
        // plane(1500);
        // translate(0, 400, 2000);
        

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

function win_logic(){
  if (player1Score == 2){
    winningCondition("Player1");
  }

  else if (player2score == 2){
    winningCondition("Player2")
  }
}

function winningCondition(str){
  if (str == "Player1"){
    sessionStorage.setItem("Win", "Player1");
    window.location = "/podium.html"
  }
  else{
    sessionStorage.setItem("Win", "Player2");
    window.location = "/podium.html"
  }
}


// function drawSky() {
//   const horizon = 1000;
//   const sky = createGraphics(width, height);

//   // Draw gradient sky
//   sky.noFill();
//   for (let i = 0; i <= horizon; i++) {
//     const inter = map(i, 0, horizon, 0, 1);
//     const c = lerpColor(colours[0], color(0, 0 ,0), inter);
//     sky.stroke(c);
//     sky.line(0, i, width, i);
//   }

//   // Add some stars
//   sky.noStroke();
//   sky.fill(255, 255, 255, random(100, 255));
//   for (let i = 0; i < 100; i++) {
//     sky.ellipse(random(0, 1100), random(0, 550), random(1, 5));
//   }

//   return sky;
// }

// // Draw gradient sun
// function drawSun() {
//   const sun = createGraphics(1000, 1000);
//   sun.noFill();

//   for (let i = 0; i <= sun.height; i++) {
//     // Which colour?
//     if (i % 10 >= 0 && i % 10 < 5) {
//       sun.stroke(colours[2]);
//     } else {
//       sun.stroke(colours[3]);
//     }

//     // Calc colour
//     const inter = map(i, 0, sun.height, 0, 1);

//     // Calc circle
//     const s = i * 2;
//     const r = sun.width;
//     const lineWidth = Math.sqrt((2 * s * r) - (s * s));
//     const offset = (sun.width / 2) - (lineWidth / 2);
//     sun.line(offset, i, lineWidth + offset, i);
//   }
//   return sun;
// }