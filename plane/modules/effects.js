import * as hlp from "./scripts.js";

console.log('effects');

const ball = document.getElementById('ball');
const stops = ball.children;


export const fillThings = {
  'harlequin': {
    'sat': () => Math.floor(hlp.getRandomIntInclusive(20, 100)),
    'lum': (idx) => 100 - (Math.floor(hlp.getRandomIntInclusive(1, 100)) + idx),
  },
  'bright': {
    'sat': () => Math.floor(hlp.getRandomIntInclusive(20, 100)),
    'lum': (idx) => Math.floor(hlp.getRandomIntInclusive(1, 100)) * (idx),
  },
  'inkstain': {
    'sat': () => Math.floor(hlp.getRandomIntInclusive(20, 100)),
    'lum': (idx) => idx % Math.floor(hlp.getRandomIntInclusive(1, 100)),
  },
  'inkflood': {
    'sat': () => Math.floor(hlp.getRandomIntInclusive(20, 100)),
    'lum': (idx) => Math.floor(hlp.getRandomIntInclusive(1, 100)) % idx,
  },
  'milkstain': {
    'sat': () => Math.floor(hlp.getRandomIntInclusive(20, 100)),
    'lum': (idx) => Math.floor(hlp.getRandomIntInclusive(0, 100)) * (100/idx),
  },
  'milkflood': {
    'sat': () => Math.floor(hlp.getRandomIntInclusive(20, 100)),
    'lum': (idx) => (100/idx) * Math.floor(hlp.getRandomIntInclusive(0, 100)),
  },
  'milkGradient': {
    'sat': (idx) => hlp.norm(idx).next().value,
    'lum': (idx) => Math.floor(hlp.getRandomIntInclusive(100 - idx, 100 - idx)),
  },
  'sideGradient': {
    'sat': (idx) => hlp.norm(idx).next().value,
    'lum': (idx) => Math.floor(hlp.getRandomIntInclusive(100 - idx, 100 - idx)),
  },
  'stripes': {
    'sat': () => Math.floor(hlp.getRandomIntInclusive(20, 100)),
    'lum': () => Math.floor(Math.random() * 100),
  },
  'snow': {
    'sat': () => 0,
    'lum': () => 100,
    'strk': () => 'rgba(0,0,0,.4)',
  },
  'outlines': {
    'sat': () => 0,
    'lum': () => 100,
    'strk': (idx, hue) => `hsl(${(hue + 180) % 360}deg 100% 50%)`,
  },
  'gradientOutlines': {
    'sat': () => 0,
    'lum': () => 100,
    'strk': (idx, hue) => hlp.normColInv(idx, (hue + 180) % 360).next().value,
  },
  'tron': {
    'sat': () => 90,
    'lum': () => 10,
    'strk': (idx, hue) => `hsl(${(hue + 180) % 360}deg 100% 50%)`,
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


export function strokeStyle(type, idx, row, hue) {
  row.forEach(r => {
    if(type == 'outlines') {
      r.setAttribute('stroke', `hsl(${(hue + 180) % 360}deg 100% 50%)`);
    } else
    if(type == 'gradientOutlines') {
      r.setAttribute('stroke', hlp.normColInv(idx, (hue + 180) % 360).next().value);
    } else
    if(type == 'tron') {
      r.setAttribute('stroke', `hsl(${(hue + 180) % 360}deg 100% 50%)`);
    } else {
      r.setAttribute('stroke', hlp.normCol(idx, hue).next().value);
    }
  });
}


export function fillStyle(type, idx, row, hue) {
  let sat, lum;
  if(type == 'milkGradient') {
    sat = fillThings[type].sat(idx);
  }
  if(type == 'stripes' || 
     type == 'inkGradient') {
    sat = fillThings[type].sat(idx);
    lum = fillThings[type].lum(idx);
  }
  if(type == 'outlines') {
    lum = fillThings[type].lum(idx);
  }
  // console.log(row.length);
  row.forEach((r,i) => {
  // console.log(i, r);
  // console.log(i, hlp.normCell(i,row.length).next().value);
    type == 'bright'
    || type == 'milkstain'
    || type == 'milkflood'
    && idx == 0 ? idx = 1 : idx = idx;
    if(type !== 'milkGradient' && 
       type !== 'inkGradient' && 
       type !== 'stripes') {
      sat = fillThings[type].sat(idx);
    }
    if(type !== 'stripes' && 
       type !== 'inkGradient') {
      lum = fillThings[type].lum(idx);
    }
    if(type == 'sideGradient') {
      // console.log(idx, hlp.normCell(idx).next().value);
      r.attributes['fill'].nodeValue = `hsl(${hue}deg ${50}% ${hlp.normCell(i,row.length).next().value}%)`;
    } else {
      // console.log(`${idx} fill: hsl(${col}deg ${sat}% ${lum}%)`);
      r.attributes['fill'].nodeValue = `hsl(${hue}deg ${sat}% ${lum}%)`;
    }
  });
}

//<path d="M 14 234 L 33 257 14 264 Z" fill="hsl(210deg 100% 35%)"/>
//<path d="M 14 263 L 33 256 171 318 107 320 14 291 Z" fill="hsl(210deg 100% /55%)"/>
//<path d="M 170 319 L 388 378 293 392 107 320 Z" fill="hsl(210deg 100% 15%)"/>



export function glitter(idx, row, col, strk) {
  const randFunc = hlp.getWeighedRandom([colourise, colouriseWhiteish, colouriseBlackToColour, colouriseBlackToBlack, colouriseColourToWhite, colouriseWhiteToColour, colourWholeGradient, colourStripes, whiteOutlines, colourOutlines, strokeGradient], [4,1,1,1,1,1,4,4,1,2,4]);
  let glitterID = setInterval(()=> {
    randFunc(idx, row, col, strk);
  }, 1000);
  hlp.glitterIDs.push(glitterID);
  // console.log('inside glittesr',glitterID);
  return glitterID;
}
