import {
  connectJoyCon,
  connectedJoyCons,
  JoyConLeft,
  JoyConRight,
  GeneralController,
} from './libs/joycon/webhid.js';

const connectButton = document.querySelector('#connect-joy-cons');
const connectButtonRingCon = document.querySelector('#connect-ring-con');
const debugLeft = document.querySelector('#debug-left');
const debugRight = document.querySelector('#debug-right');
// const showDebug = document.querySelector('#show-debug');
const rootStyle = document.documentElement.style;

var bestXLeft = 0;
var bestYLeft = 0;
var bestZLeft = 0;
var lowXLeft = 0;
var lowYLeft = 0;
var lowZLeft = 0;

var bestXRight = 0;
var bestYRight = 0;
var bestZRight = 0;
var lowXRight = 0;
var lowYRight = 0;
var lowZRight = 0;

const visualize = (joyCon, packet) => {
  if (!packet || !packet.actualOrientation) {
    return;
  }
  const {
    actualAccelerometer: accelerometer,
    buttonStatus: buttons,
    actualGyroscope: gyroscope,
    actualOrientation: orientation,
    actualOrientationQuaternion: orientationQuaternion,
    ringCon: ringCon,
  } = packet;

  if (joyCon instanceof JoyConLeft) {
    rootStyle.setProperty('--left-alpha', `${orientation.alpha}deg`);
    rootStyle.setProperty('--left-beta', `${orientation.beta}deg`);
    rootStyle.setProperty('--left-gamma', `${orientation.gamma}deg`);
  } else if (joyCon instanceof JoyConRight) {
    rootStyle.setProperty('--right-alpha', `${orientation.alpha}deg`);
    rootStyle.setProperty('--right-beta', `${orientation.beta}deg`);
    rootStyle.setProperty('--right-gamma', `${orientation.gamma}deg`);
  }

  if (joyCon instanceof JoyConLeft || joyCon instanceof GeneralController) {
    const joystick = packet.analogStickLeft;
    const joystickMultiplier = 10;
  }
  if (joyCon instanceof JoyConRight || joyCon instanceof GeneralController) {
    const joystick = packet.analogStickRight;
    const joystickMultiplier = 10;

    // document.querySelector('#rc-st').value = ringCon.strain;
  }

  // Rumble
  if (buttons.y || buttons.left) {
    // joyCon.rumble(600, 600, 0.5);
  }

  // Joy Con Data
    const controller = joyCon instanceof JoyConLeft ? debugLeft : debugRight;
    if(controller == debugLeft) {
      let xLeft = Math.round(accelerometer.x * 166);
      let yLeft = Math.round(accelerometer.y * 166);
      let zLeft = Math.round(accelerometer.z * 166);

      document.querySelector('#x-left').textContent = "Current X is: " + xLeft + "\nHighest X is: " + bestXLeft + "\nLowest X is: " + lowXLeft + "\nRange is: " + (bestXLeft - lowXLeft);
      if(xLeft > bestXLeft) {
        // Avg grav is 4
        bestXLeft = xLeft;
      } else if(xLeft < lowXLeft) {
        lowXLeft = xLeft;
      }
      document.querySelector('#acc-x-left').value = xLeft;

      document.querySelector('#y-left').textContent = "Current Y is: " + yLeft + "\nHighest Y is: " + bestYLeft + "\nLowest Y is: " + lowYLeft + "\nRange is: " + (bestYLeft - lowYLeft);
      if(yLeft > bestYLeft) {
        // Avg grav is 4
        bestYLeft = yLeft;
      } if(yLeft < lowYLeft) {
        lowYLeft = yLeft;
      }
      document.querySelector('#acc-y-left').value = yLeft;

      document.querySelector('#z-left').textContent = "Current Z is: " + zLeft + "\nHighest Z is: " + bestZLeft + "\nLowest Z is: " + lowZLeft + "\nRange is: " + (bestZLeft - lowZLeft);
      if(zLeft > bestZLeft) {s
        // Avg grav is 4
        bestZLeft = zLeft;
      } if(zLeft < lowZLeft) {
      
        lowZLeft = zLeft;
      }
      document.querySelector('#acc-z-left').value = zLeft;
    } else if(controller == debugRight) {
      let xRight = Math.round(accelerometer.x * 166);
      let yRight = Math.round(accelerometer.y * 166);
      let zRight = Math.round(accelerometer.z * 166);

      document.querySelector('#x-right').textContent = "Current X is: " + xRight + "\nHighest X is: " + bestXRight + "\nLowest X is: " + lowXRight + "\nRange is: " + (bestXRight - lowXRight);
      if(xRight > bestXRight) {
        // Avg grav is 4
        bestXRight = xRight;
      } else if(xRight < lowXRight) {
        lowXRight = xRight;
      }
      document.querySelector('#acc-x-right').value = xRight;

      document.querySelector('#y-right').textContent = "Current Y is: " + yRight + "\nHighest Y is: " + bestYRight + "\nLowest Y is: " + lowYRight + "\nRange is: " + (bestYRight - lowYRight);
      if(yRight > bestYRight) {
        // Avg grav is 4
        bestYRight = yRight;
      } if(yRight < lowYRight) {
        lowYRight = yRight;
      }
      document.querySelector('#acc-y-right').value = yRight;

      document.querySelector('#z-right').textContent = "Current Z is: " + zRight + "\nHighest Z is: " + bestZRight + "\nLowest Z is: " + lowZRight + "\nRange is: " + (bestZRight - lowZRight);
      if(zRight > bestZRight) {
        // Avg grav is 4
        bestZRight = zRight;
      } if(zRight < lowZRight) {
      
        lowZRight = zRight;
      }
      document.querySelector('#acc-z-right').value = zRight;
    }
};

// Joy-Cons may sleep until touched, so attach the listener dynamically.
setInterval(async () => {
  for (const joyCon of connectedJoyCons.values()) {
    if (joyCon.eventListenerAttached) {
      continue;
    }
    joyCon.eventListenerAttached = true;
    await joyCon.enableVibration();
    joyCon.addEventListener('hidinput', (event) => {
      visualize(joyCon, event.detail);
    });
  }
}, 2000);

// showDebug.addEventListener('input', (e) => {
//   document.querySelector('#debug').style.display = e.target.checked
//     ? 'flex'
//     : 'none';
// });
