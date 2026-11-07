import * as hlp from "./scripts.js";

console.log('effects');

const ball = document.getElementById('ball');
const stops = ball.children;


export const fillThings = {
  'harlequin': {
    'sat': () => Math.floor(hlp.getRandomIntInclusive(20, 100)),
    'lum': (idx) => 100 - (Math.floor(hlp.getRandomIntInclusive(1, 100)) + idx),
    'strk': (idx, col) => hlp.normCol(idx, col).next().value,
  },
  'bright': {
    'sat': () => Math.floor(hlp.getRandomIntInclusive(20, 100)),
    'lum': (idx) => Math.floor(hlp.getRandomIntInclusive(1, 100)) * (idx),
    'strk': (idx, col) => hlp.normCol(idx, col).next().value,
  },
  'inkstain': {
    'sat': () => Math.floor(hlp.getRandomIntInclusive(20, 100)),
    'lum': (idx) => idx % Math.floor(hlp.getRandomIntInclusive(1, 100)),
    'strk': (idx, col) => hlp.normCol(idx, col).next().value,
  },
  'inkflood': {
    'sat': () => Math.floor(hlp.getRandomIntInclusive(20, 100)),
    'lum': (idx) => Math.floor(hlp.getRandomIntInclusive(1, 100)) % idx,
    'strk': (idx, col) => hlp.normCol(idx, col).next().value,
  },
  'milkstain': {
    'sat': () => Math.floor(hlp.getRandomIntInclusive(20, 100)),
    'lum': (idx) => Math.floor(hlp.getRandomIntInclusive(0, 100)) * (100/idx),
    'strk': (idx, col) => hlp.normCol(idx, col).next().value,
  },
  'milkflood': {
    'sat': () => Math.floor(hlp.getRandomIntInclusive(20, 100)),
    'lum': (idx) => (100/idx) * Math.floor(hlp.getRandomIntInclusive(0, 100)),
    'strk': (idx, col) => hlp.normCol(idx, col).next().value,
  },
  'milkGradient': {
    'sat': (idx) => hlp.norm(idx).next().value,
    'lum': (idx) => Math.floor(hlp.getRandomIntInclusive(100 - idx, 100 - idx)),
    'strk': (idx, col) => hlp.normCol(idx, col).next().value,
  },
  'inkGradient': {
    'sat': (idx) => hlp.norm(idx).next().value,
    'lum': (idx) => Math.floor(hlp.getRandomIntInclusive(0 + idx, 100 - idx)),
    'strk': (idx, col) => hlp.normCol(idx, col).next().value,
  },
  'stripes': {
    'sat': () => Math.floor(hlp.getRandomIntInclusive(20, 100)),
    'lum': () => Math.floor(Math.random() * 100),
    'strk': (idx, col) => hlp.normCol(idx, col).next().value,
  },
  'snow': {
    'sat': () => 0,
    'lum': () => 100,
    'strk': () => 'rgba(0,0,0,.4)',
  },
  'outlines': {
    'sat': () => 0,
    'lum': () => 100,
    'strk': (idx, col) => `hsl(${(col + 180) % 360}deg 100% 50%)`,
  },
  'gradientOutlines': {
    'sat': () => 0,
    'lum': () => 100,
    'strk': (idx, col) => hlp.normColInv(idx, (col + 180) % 360).next().value,
  }
};








export function colourBall(col) {
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



// STYLE export functionS


export function style(type, idx, row, hue, strk) {
  let sat, lum;
  if(type == 'milkGradient' || 
     type == 'inkGradient') {
    sat = fillThings[type].sat(idx);
  }
  if(type == 'stripes') {
    sat = fillThings[type].sat(idx);
    lum = fillThings[type].lum(idx);
  }
  if(type == 'outlines') {
    lum = fillThings[type].lum(idx);
  }
  row.forEach(r => {
    type == 'bright'
    || type == 'milkstain'
    || type == 'milkflood'
    && idx == 0 ? idx = 1 : idx = idx;
    if(type !== 'milkGradient' && 
       type !== 'inkGradient' && 
       type !== 'stripes') {
      sat = fillThings[type].sat(idx);
    }
    if(type !== 'stripes') {
      lum = fillThings[type].lum(idx);
    }

    // console.log(`${idx} fill: hsl(${col}deg ${sat}% ${lum}%)`);
    r.attributes['fill'].nodeValue = `hsl(${hue}deg ${sat}% ${lum}%)`;
    if(strk == 0) {
      r.setAttribute('stroke', 'none');
    } else {
      r.setAttribute('stroke', fillThings[type].strk(idx,hue));
    }
  });
}




export function glitter(idx, row, col, strk) {
  const randFunc = hlp.getWeighedRandom([colourise, colouriseWhiteish, colouriseBlackToColour, colouriseBlackToBlack, colouriseColourToWhite, colouriseWhiteToColour, colourWholeGradient, colourStripes, whiteOutlines, colourOutlines, strokeGradient], [4,1,1,1,1,1,4,4,1,2,4]);
  let glitterID = setInterval(()=> {
    randFunc(idx, row, col, strk);
  }, 1000);
  hlp.glitterIDs.push(glitterID);
  // console.log('inside glittesr',glitterID);
  return glitterID;
}
