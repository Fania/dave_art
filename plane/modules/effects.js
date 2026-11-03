
const [...paths] = document.getElementsByTagName('path');
const [...rows] = document.getElementsByClassName('rows');
const circ = document.getElementsByTagName('circle')[0];
const ball = document.getElementById('ball');
const stops = ball.children;
let timerIDs = [];
let glitterIDs = [];

clearoutTime(timerIDs);
clearoutInt(glitterIDs);

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

function add(a, b) { return a + b; } // helper function
function getWeighedRandom(elems, weights) {
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






function colourBall(col) {
  // let circCol = Math.floor(Math.random() * 360);
  let circCol = col;
  circCol = circCol + 30 >= 360 ? 360 : circCol;
  const circColX = (circCol - 30 >= 0) ? circCol - 30 : 0;
  const circ1 = `hsl(${circCol}deg 100% 90%)`;
  const circ2 = `hsl(${circCol}deg 90% 50%)`;
  const circ3 = `hsl(${circColX}deg 100% 50%)`;
  stops[0].attributes['stop-color'].nodeValue = circ1;
  stops[1].attributes['stop-color'].nodeValue = circ2;
  stops[2].attributes['stop-color'].nodeValue = circ3;
}


// STYLE FUNCTIONS

function colourise(idx, row, col, strk) {
  row.forEach(r => {
    let lumin = 100 - (Math.floor(getRandomIntInclusive(1, 100)) + idx);
    let sat = Math.floor(getRandomIntInclusive(20, 100));
    r.attributes['fill'].nodeValue = `hsl(${col}deg ${sat}% ${lumin}%)`;
    r.setAttribute('stroke', ['none','rgba(0,0,0,.4)'][strk]);
  });
  return 0;
}

function colouriseWhiteish(idx, row, col, strk) {
  row.forEach(r => {
    idx==0 ? idx = 1 : idx = idx;
    let sat = Math.floor(getRandomIntInclusive(20, 100));
    let lumin = 100 - (Math.floor(getRandomIntInclusive(1, 100)) % idx);
    r.attributes['fill'].nodeValue = `hsl(${col}deg ${sat}% ${lumin}%)`;
    r.setAttribute('stroke', ['none','rgba(0,0,0,.4)'][strk]);
  });
  return 0;
}

function colouriseBlackToColour(idx, row, col, strk) {
  row.forEach(r => {
    let sat = Math.floor(getRandomIntInclusive(20, 100));
    let lumin = Math.floor(getRandomIntInclusive(1, 100)) % idx;
    r.attributes['fill'].nodeValue = `hsl(${col}deg ${sat}% ${lumin}%)`;
    r.setAttribute('stroke', ['none','rgba(0,0,0,.4)'][strk]);
  });
  return 0;
}

function colouriseBlackToBlack(idx, row, col, strk) {
  row.forEach(r => {
    let sat = Math.floor(getRandomIntInclusive(20, 100));
    let lumin = idx % Math.floor(getRandomIntInclusive(1, 100));
    r.attributes['fill'].nodeValue = `hsl(${col}deg ${sat}% ${lumin}%)`;
    r.setAttribute('stroke', ['none','rgba(0,0,0,.4)'][strk]);
  });
  return 0;
}

function colouriseColourToWhite(idx, row, col, strk) {
  row.forEach(r => {
    idx==0 ? idx = 1 : idx = idx;
    let sat = Math.floor(getRandomIntInclusive(20, 100));
    let lumin = Math.floor(getRandomIntInclusive(1, 100)) * (idx);
    r.attributes['fill'].nodeValue = `hsl(${col}deg ${sat}% ${lumin}%)`;
    r.setAttribute('stroke', ['none','rgba(0,0,0,.4)'][strk]);
  });
  return 0;
}

function colouriseWhiteToColour(idx, row, col, strk) {
  row.forEach(r => {
    idx==0 ? idx = 1 : idx = idx;
    let sat = Math.floor(getRandomIntInclusive(20, 100));
    let lumin = Math.floor(getRandomIntInclusive(0, 100)) * (100/idx);
    r.attributes['fill'].nodeValue = `hsl(${col}deg ${sat}% ${lumin}%)`;
    r.setAttribute('stroke', ['none','rgba(0,0,0,.4)'][strk]);
  });
  return 0;
}

function colourWholeGradient(idx, row, col, strk) {
  row.forEach(r => {
    const val = 100 - idx;
    let sat = Math.floor(getRandomIntInclusive(20, 100));
    const lumin = Math.floor(getRandomIntInclusive(val, val));
    r.attributes['fill'].nodeValue = `hsl(${col}deg ${sat}% ${lumin}%)`;
    r.setAttribute('stroke', ['none','rgba(0,0,0,.4)'][strk]);
  });
  return 0;
}

function colourStripes(idx, row, col, strk) {
  let sat = Math.floor(getRandomIntInclusive(20, 100));
  const lumin = Math.floor(Math.random() * 100);
  row.forEach(r => {
    r.attributes['fill'].nodeValue = `hsl(${col}deg ${sat}% ${lumin}%)`;
    r.setAttribute('stroke', ['none','rgba(0,0,0,.4)'][strk]);
  });
  return 0;
}

function whiteOutlines(idx, row, col, strk) {
  row.forEach(r => {
    r.setAttribute('fill', `white`);
    r.setAttribute('stroke', `black`);
  });
  console.log('with stroke');
  return 0;
}


function glitter(idx, row, col, strk) {
  const randFunc = getWeighedRandom([colourise, colouriseWhiteish, colouriseBlackToColour, colouriseBlackToBlack, colouriseColourToWhite, colouriseWhiteToColour, colourWholeGradient, colourStripes, whiteOutlines], [4,1,1,1,1,1,4,4,1]);
  let glitterID = setInterval(()=> {
    randFunc(idx, row, col, strk);
  }, 1000);
  glitterIDs.push(glitterID);
  // console.log('inside glitter',glitterID);
  return glitterID;
}





function clearoutInt(ids) {
  console.log('clearing Intervals');
  ids.forEach(gid => {
    clearInterval(gid);
  });
}
function clearoutTime(ids) {
  console.log('clearing Timeouts');
  ids.forEach(tid => {
    clearTimeout(tid);
  });
}



function reDraw(func) {
  // console.log('inside reDraw',func.name);
  const newCol = Math.floor(Math.random() * 360);
  // const randomNumber = Math.round(Math.random());
  const strk = getWeighedRandom([0,1],[3,1]);
  strk==0? console.log('no stroke') : console.log('with stroke');
  rows.forEach((row, idx) => {
    const [...paths] = row.children;
    let timerID = setTimeout(()=> {
      func(idx, paths, newCol, strk);
    }, idx * 100);
    timerIDs.push(timerID);
  });
  colourBall(newCol);
  // clearoutTime(timerIDs);
  clearoutInt(glitterIDs);
}


// // MAIN GAME LOOP
let freq = 100;
const mainLoop = () => {
    freq = getRandomIntInclusive(500, 20000);
    const randFunc = getWeighedRandom([colourise, colouriseWhiteish, colouriseBlackToColour, colouriseBlackToBlack, colouriseColourToWhite, colouriseWhiteToColour, colourWholeGradient, colourStripes, whiteOutlines, glitter], [4,1,1,1,1,1,4,4,1,3]);
    const testFuncs = getWeighedRandom([colourise, glitter], [1,1]);
    reDraw(randFunc);
    // reDraw(testFuncs);
    setTimeout(mainLoop, freq);
    console.log('freq', freq);
    console.log('func', randFunc.name);
    // console.log('func', testFuncs.name);
}

const testLoop = () => {
    freq = getRandomIntInclusive(500, 6000);
    const testFuncs = getWeighedRandom([colourise, glitter], [1,1]);
    reDraw(testFuncs);
    setTimeout(testLoop, freq);
    console.log('freq', freq);
    console.log('func', testFuncs.name);
}




// COMMANDS TO START RUNNING
// setTimeout(mainLoop, freq);
// setTimeout(testLoop, freq);

// reDraw(whiteOutlines); // testing line
// reDraw(glitter); // testing line