import * as hlp from "./scripts.js";

console.log('effects');

const ball = document.getElementById('ball');
const stops = ball.children;


export const fillThings = {
  'colourise': {
    'col': () => 0,
    'sat': () => Math.floor(hlp.getRandomIntInclusive(20, 100)),
    'lum': (idx) => 100 - (Math.floor(hlp.getRandomIntInclusive(1, 100)) + idx),
    'strk': (idx, col) => hlp.normCol(idx, col).next().value,
  },
  'colouriseWhiteish': {
    'col': () => 0,
    'sat': () => Math.floor(hlp.getRandomIntInclusive(20, 100)),
    'lum': (idx) => 100 - (Math.floor(hlp.getRandomIntInclusive(1, 100)) % idx),
    'strk': (idx, col) => hlp.normCol(idx, col).next().value,
  },
  'colouriseBlackToColour': {
    'col': () => 0,
    'sat': () => Math.floor(hlp.getRandomIntInclusive(20, 100)),
    'lum': (idx) => Math.floor(hlp.getRandomIntInclusive(1, 100)) % idx,
    'strk': (idx, col) => hlp.normCol(idx, col).next().value,
  },
  'colouriseBlackToBlack': {
    'col': () => 0,
    'sat': () => Math.floor(hlp.getRandomIntInclusive(20, 100)),
    'lum': (idx) => idx % Math.floor(hlp.getRandomIntInclusive(1, 100)),
    'strk': (idx, col) => hlp.normCol(idx, col).next().value,
  },
  'colouriseColourToWhite': {
    'col': () => 0,
    'sat': () => Math.floor(hlp.getRandomIntInclusive(20, 100)),
    'lum': (idx) => Math.floor(hlp.getRandomIntInclusive(1, 100)) * (idx),
    'strk': (idx, col) => hlp.normCol(idx, col).next().value,
  },
  'colouriseWhiteToColour': {
    'col': () => 0,
    'sat': () => Math.floor(hlp.getRandomIntInclusive(20, 100)),
    'lum': (idx) => Math.floor(hlp.getRandomIntInclusive(0, 100)) * (100/idx),
    'strk': (idx, col) => hlp.normCol(idx, col).next().value,
  },
  'colourWholeGradient': {
    'col': () => 0,
    'sat': (idx) => hlp.norm(idx).next().value,
    'lum': (idx) => Math.floor(hlp.getRandomIntInclusive(100 - idx, 100 - idx)),
    'strk': (idx, col) => hlp.normCol(idx, col).next().value,
  },
  'colourStripes': {
    'col': () => 0,
    'sat': () => Math.floor(hlp.getRandomIntInclusive(20, 100)),
    'lum': () => Math.floor(Math.random() * 100),
    'strk': (idx, col) => hlp.normCol(idx, col).next().value,
  },
  'whiteOutlines': {
    'col': () => 0,
    'sat': () => 0,
    'lum': () => 100,
    'strk': () => 'rgba(0,0,0,.4)',
  },
  'colourOutlines': {
    'col': (idx, col) => (col + 180) % 360,
    'sat': () => 0,
    'lum': () => 100,
    'strk': (idx, col) => `hsl(${(col + 180) % 360}deg 100% 50%)`,
  },
  'strokeGradient': {
    'col': (idx, col) => hlp.normColInv(idx, (col + 180) % 360).next().value,
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


export function style(type, idx, row, col, strk) {
  let sat, lum;
  if(type == 'colourWholeGradient') {
    sat = fillThings[type].sat(idx);
  }
  if(type == 'colourStripes') {
    sat = fillThings[type].sat(idx);
    lum = fillThings[type].lum(idx);
  }
  if(type == 'colourOutlines') {
    lum = fillThings[type].lum(idx);
  }
  row.forEach(r => {
    type == 'colouriseWhiteish' 
    || type == 'colouriseColourToWhite'
    || type == 'colouriseWhiteToColour'
    && idx == 0 
    ? idx = 1 
    : idx = idx;
    if(type !== 'colourWholeGradient' && 
       type !== 'colourStripes') {
      sat = fillThings[type].sat(idx);
    }
    if(type !== 'colourStripes') {
      lum = fillThings[type].lum(idx);
    }

    // console.log(`${idx} fill: hsl(${col}deg ${sat}% ${lum}%)`);
    r.attributes['fill'].nodeValue = `hsl(${col}deg ${sat}% ${lum}%)`;
    if(strk == 0) {
      r.setAttribute('stroke', 'none');
    } else {
      r.setAttribute('stroke', fillThings[type].strk(idx,col));
    }
  });
}




// export function colourise(idx, row, col, strk) {
//   row.forEach(r => {
//     let lumin = 100 - (Math.floor(hlp.getRandomIntInclusive(1, 100)) + idx);
//     let sat = Math.floor(hlp.getRandomIntInclusive(20, 100));
//     let currStroke = hlp.getStroke(idx, col);
//     r.attributes['fill'].nodeValue = `hsl(${col}deg ${sat}% ${lumin}%)`;
//     r.setAttribute('stroke', currStroke);
//   });
//   return 0;
// }

// export function colouriseWhiteish(idx, row, col, strk) {
//   row.forEach(r => {
//     idx==0 ? idx = 1 : idx = idx;
//     let sat = Math.floor(hlp.getRandomIntInclusive(20, 100));
//     let lumin = 100 - (Math.floor(hlp.getRandomIntInclusive(1, 100)) % idx);
//     let currStroke = hlp.getStroke(idx, col);
//     r.attributes['fill'].nodeValue = `hsl(${col}deg ${sat}% ${lumin}%)`;
//     r.setAttribute('stroke', currStroke);
//   });
//   return 0;
// }

// export function colouriseBlackToColour(idx, row, col, strk) {
//   row.forEach(r => {
//     let sat = Math.floor(hlp.getRandomIntInclusive(20, 100));
//     let lumin = Math.floor(hlp.getRandomIntInclusive(1, 100)) % idx;
//     let currStroke = hlp.getStroke(idx, col);
//     r.attributes['fill'].nodeValue = `hsl(${col}deg ${sat}% ${lumin}%)`;
//     r.setAttribute('stroke', currStroke);
//   });
//   return 0;
// }

// export function colouriseBlackToBlack(idx, row, col, strk) {
//   row.forEach(r => {
//     let sat = Math.floor(hlp.getRandomIntInclusive(20, 100));
//     let lumin = idx % Math.floor(hlp.getRandomIntInclusive(1, 100));
//     let currStroke = hlp.getStroke(idx, col);
//     r.attributes['fill'].nodeValue = `hsl(${col}deg ${sat}% ${lumin}%)`;
//     r.setAttribute('stroke', currStroke);
//   });
//   return 0;
// }

// export function colouriseColourToWhite(idx, row, col, strk) {
//   row.forEach(r => {
//     idx==0 ? idx = 1 : idx = idx;
//     let sat = Math.floor(hlp.getRandomIntInclusive(20, 100));
//     let lumin = Math.floor(hlp.getRandomIntInclusive(1, 100)) * (idx);
//     let currStroke = hlp.getStroke(idx, col);
//     r.attributes['fill'].nodeValue = `hsl(${col}deg ${sat}% ${lumin}%)`;
//     r.setAttribute('stroke', currStroke);
//   });
//   return 0;
// }

// export function colouriseWhiteToColour(idx, row, col, strk) {
//   row.forEach(r => {
//     idx==0 ? idx = 1 : idx = idx;
//     let sat = Math.floor(hlp.getRandomIntInclusive(20, 100));
//     let lumin = Math.floor(hlp.getRandomIntInclusive(0, 100)) * (100/idx);
//     let currStroke = hlp.getStroke(idx, col);
//     r.attributes['fill'].nodeValue = `hsl(${col}deg ${sat}% ${lumin}%)`;
//     r.setAttribute('stroke', currStroke);
//   });
//   return 0;
// }

// export function colourWholeGradient(idx, row, col, strk) {
//   let sat = hlp.norm(idx).next().value;
//   row.forEach(r => {
//     const val = 100 - idx;
//     const lumin = Math.floor(hlp.getRandomIntInclusive(val, val));
//     let currStroke = hlp.getStroke(idx, col);
//     r.attributes['fill'].nodeValue = `hsl(${col}deg ${sat}% ${lumin}%)`;
//     r.setAttribute('stroke', currStroke);
//   });
//   return 0;
// }

// export function colourStripes(idx, row, col, strk) {
//   let sat = Math.floor(hlp.getRandomIntInclusive(20, 100));
//   const lumin = Math.floor(Math.random() * 100);
//   let currStroke = hlp.getStroke(idx, col);
//   row.forEach(r => {
//     r.attributes['fill'].nodeValue = `hsl(${col}deg ${sat}% ${lumin}%)`;
//     r.setAttribute('stroke', currStroke);
//   });
//   return 0;
// }

// export function whiteOutlines(idx, row, col, strk) {
//   row.forEach(r => {
//     r.setAttribute('fill', `white`);
//     r.setAttribute('stroke', `black`);
//   });
//   console.log('with stroke');
//   return 0;
// }

// export function colourOutlines(idx, row, col, strk) {
//   row.forEach(r => {
//     r.setAttribute('fill', `white`);
//     r.setAttribute('stroke', `hsl(${(col + 180) % 360}deg 100% 50%)`);
//   });
//   console.log('with coloured stroke');
//   return 0;
// }

// export function strokeGradient(idx, row, col, strk) {
//   row.forEach(r => {
//     let currCol = hlp.normColInv(idx, (col + 180) % 360).next().value;
//     // let currCol = 100;
//     // console.log('inside strokeGradient currCol',currCol);
//     r.setAttribute('fill', `white`);
//     r.setAttribute('stroke', currCol);
//   });
//   console.log('with coloured stroke');
//   return 0;
// }


export function glitter(idx, row, col, strk) {
  const randFunc = hlp.getWeighedRandom([colourise, colouriseWhiteish, colouriseBlackToColour, colouriseBlackToBlack, colouriseColourToWhite, colouriseWhiteToColour, colourWholeGradient, colourStripes, whiteOutlines, colourOutlines, strokeGradient], [4,1,1,1,1,1,4,4,1,2,4]);
  let glitterID = setInterval(()=> {
    randFunc(idx, row, col, strk);
  }, 1000);
  hlp.glitterIDs.push(glitterID);
  // console.log('inside glittesr',glitterID);
  return glitterID;
}
