import * as ffs from "./effects.js";

console.log('scripts');

// const [...paths] = document.getElementsByTagName('path');
const [...rows] = document.getElementsByClassName('rows');
// const circ = document.getElementsByTagName('circle')[0];
// const ball = document.getElementById('ball');
// const stops = ball.children;
let timerIDs = [];
export let glitterIDs = [];

clearoutTime(timerIDs);
clearoutInt(glitterIDs);




export function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}


export function add(a, b) { return a + b; } // helper export function
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
  // console.log('inside normCol idx, lum', idx, lum);
  yield `hsl(${col}deg 100% ${lum}%)`
}

export function* normColInv(idx, col) {
  const lum = (idx - 0) / ((rows.length * 2) - 0) * 100;
  // console.log('inside normCol idx, lum', idx, lum);
  yield `hsl(${col}deg 100% ${50 - lum}%)`
}

// console.log(normCol(0, 200).next().value);
// console.log(normCol(20, 200).next().value);
// console.log(normCol(40, 200).next().value);
// console.log(normCol(67, 200).next().value);


export function getStroke(idx, col) {
  let newCol = normCol(idx, col).next().value;
  return getWeighedRandom['none','rgba(0,0,0,.4)',newCol],[2,1,2];
}


export function clearoutInt(ids) {
  console.log('clearing Intervals');
  ids.forEach(gid => {
    clearInterval(gid);
  });
}
export function clearoutTime(ids) {
  console.log('clearing Timeouts');
  ids.forEach(tid => {
    clearTimeout(tid);
  });
}



export function reDrawNew(type) {
  // console.log('inside reDraw',func.name);
  console.log('inside reDraw',type);
  const hue = Math.floor(Math.random() * 360);
  // const randomNumber = Math.round(Math.random());
  // const strk = getWeighedRandom([0,1],[5,1]);
  // const strk = getWeighedRandom([0,1],[1,1]);
  // strk==0? console.log('no stroke') : console.log('with stroke');
  rows.forEach((row, idx) => {
    const [...paths] = row.children;
    let timerID = setTimeout(()=> {
      ffs.fillStyle(type, idx, paths, hue);
      // ffs.strokeStyle(type, idx, paths, hue);
    }, idx * 100);
    timerIDs.push(timerID);
  });
  ffs.colourBall(hue);
  // clearoutTime(timerIDs);
  clearoutInt(glitterIDs);
}

// export function reDraw(func) {
//   // console.log('inside reDraw',func.name);
//   const newCol = Math.floor(Math.random() * 360);
//   // const randomNumber = Math.round(Math.random());
//   const strk = getWeighedRandom([0,1],[5,1]);
//   strk==0? console.log('no stroke') : console.log('with stroke');
//   rows.forEach((row, idx) => {
//     const [...paths] = row.children;
//     let timerID = setTimeout(()=> {
//       func(idx, paths, newCol, strk);
//     }, idx * 100);
//     timerIDs.push(timerID);
//   });
//   ffs.colourBall(newCol);
//   // clearoutTime(timerIDs);
//   clearoutInt(glitterIDs);
// }

// // MAIN GAME LOOP
let freq = 100;
const mainLoop = () => {
  freq = getRandomIntInclusive(500, 20000);
  const randFunc = getWeighedRandom([
    'harlequin', 
    'bright', 
    'inkflood', 
    'inkstain', 
    'milkstain', 
    'milkGradient', 
    'stripes', 
    'snow', 
    'outlines', 
    'gradientOutlines'
  ], [1,1,1,1,1,1,1,1,1,1]);
  reDrawNew(randFunc);
  setTimeout(mainLoop, freq);
  console.log('freq', freq);
  // console.log('func', randFunc.name);
}

const testLoop = () => {
    // freq = getRandomIntInclusive(500, 6000);
    freq = 20000;
    // const testFuncs = getWeighedRandom([colourise, glitter], [1,1]);
    const testFuncs = ['harlequin','bright','inkflood','inkstain','milkstain','milkGradient','stripes','snow','outlines','gradientOutlines'];
    // const testFuncs = ffs.colourise;
    // const testFuncs = 'colourise';
    
    // reDrawNew(testFuncs[10]);
    reDrawNew('sideGradient');
    // reDrawNew('milkGradient');
    setTimeout(testLoop, freq);

    console.log('freq', freq);
    // console.log('func', testFuncs.name);
    // console.log('func', testFuncs);
}




// COMMANDS TO START RUNNING
// setTimeout(mainLoop, freq);
setTimeout(testLoop, freq);

// reDraw(whiteOutlines); // testing line
// reDraw(glitter); // testing line