import * as ffs from "./effects.js";

const [...rows] = document.getElementsByClassName('rows');

let timerIDs = [];
export let glitterIDs = [];

clearoutTime(timerIDs);
clearoutInt(glitterIDs);



export const styles = {
  'harlequin': 4,
  'bright': 1,
  'inkstain': 2,
  'inkflood': 1,
  'milkstain': 0,
  'milkGradient': 3,
  'sideGradient': 2,
  'stripes': 4,
  'gradientOutlines': 1,
  'tron': 2,
  'glitter': 3
};




export function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}


function add(a, b) { return a + b; }
export function getWeighedRandom(elems, weights) {
  // get total weight (sum of all items in weights array)
  const totalWeight = weights.reduce(add, 0);
  const weighedElems = [];
  let currentElem = 0;
  while (currentElem < elems.length) {
    for (let i = 0; i < weights[currentElem]; i++)
      weighedElems[weighedElems.length] = elems[currentElem];
    currentElem++;
  }
  // console.log('weighedElems',weighedElems);
  const rnd = Math.floor(Math.random() * totalWeight);
  // console.log('weighedElems[rnd]',weighedElems[rnd]);
  return weighedElems[rnd];
}


export function* norm(idx) {
  yield (idx) / (rows.length) * 100;
}
export function* normCell(i,len) {
  yield (i) / (len) * 100;
}

export function* normCol(idx, col) {
  const lum = (idx - 0) / ((rows.length * 2) - 0) * 100;
  yield `hsl(${col}deg 100% ${lum}%)`
}

function clearoutInt(ids) {
  // console.log('clearing Intervals');
  ids.forEach(gid => {
    clearInterval(gid);
  });
}
function clearoutTime(ids) {
  // console.log('clearing Timeouts');
  ids.forEach(tid => {
    clearTimeout(tid);
  });
}



function draw(type) {
  // console.log('inside reDraw',func.name);
  clearoutTime(timerIDs);
  const hue = Math.floor(Math.random() * 360);
  const toggle = getWeighedRandom([false,true],[1,1]);
  const test = ffs.styleDefs[type].strk();
  console.log(type, freq, test, toggle);
  rows.forEach((row, idx) => {
    const [...paths] = row.children;
    let timerID = setTimeout(()=> {
      ffs.fillStyle(type, idx, paths, hue);
      ffs.strokeStyle(type, idx, paths, hue, toggle);
    }, idx * 100);
    timerIDs.push(timerID);
  });
  ffs.colourBall(hue);
  clearoutInt(glitterIDs);
}



// // MAIN GAME LOOP
let freq = 100;
const mainLoop = () => {
  const randStyle = getWeighedRandom(Object.keys(styles), Object.values(styles));
  if(randStyle == 'glitter') {
    freq = 20000;
  } else {
    freq = getWeighedRandom([500,1000,2000,4000,6000,10000,15000,20000], [1,1,2,1,2,3,2]);
  }
  draw(randStyle);
  setTimeout(mainLoop, freq);
}

const testLoop = () => {
    freq = 200000;
    draw('sideGradient');
    setTimeout(testLoop, freq);
    console.log('freq', freq);
}




// COMMAND TO START MAIN LOOP
setTimeout(mainLoop, freq);

// COMMAND TO START TESTING LOOP
// setTimeout(testLoop, freq);

// STATIC TESTS
// draw('glitter');