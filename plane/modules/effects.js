import * as hlp from "./scripts.js";

console.log('effects');

const ball = document.getElementById('ball');
const stops = ball.children;


export const styleDefs = {
  'harlequin': {
    'sat': () => Math.floor(hlp.getRandomIntInclusive(20, 100)),
    'lum': (idx) => 100 - (Math.floor(hlp.getRandomIntInclusive(1, 100)) + idx),
    'strk': () => 'never',
  },
  'bright': {
    'sat': () => Math.floor(hlp.getRandomIntInclusive(20, 100)),
    'lum': (idx) => Math.floor(hlp.getRandomIntInclusive(1, 100)) * (idx),
    'strk': () => 'sometimes',
  },
  'inkstain': {
    'sat': () => Math.floor(hlp.getRandomIntInclusive(20, 100)),
    'lum': (idx) => idx % Math.floor(hlp.getRandomIntInclusive(1, 100)),
    'strk': () => 'sometimes',
  },
  'inkflood': {
    'sat': () => Math.floor(hlp.getRandomIntInclusive(20, 100)),
    'lum': (idx) => Math.floor(hlp.getRandomIntInclusive(1, 100)) % idx,
    'strk': () => 'sometimes',
  },
  'milkstain': {
    'sat': () => Math.floor(hlp.getRandomIntInclusive(20, 100)),
    'lum': (idx) => Math.floor(hlp.getRandomIntInclusive(0, 100)) * (100/idx),
    'strk': () => 'sometimes',
  },
  'milkGradient': {
    'sat': (idx) => hlp.norm(idx).next().value,
    'lum': (idx) => Math.floor(hlp.getRandomIntInclusive(100 - idx, 100 - idx)),
    'strk': () => 'never',
  },
  'sideGradient': {
    'sat': (idx) => hlp.norm(idx).next().value,
    'lum': (idx) => Math.floor(hlp.getRandomIntInclusive(100 - idx, 100 - idx)),
    'strk': () => 'sometimes',
  },
  'stripes': {
    'sat': () => Math.floor(hlp.getRandomIntInclusive(20, 100)),
    'lum': () => Math.floor(Math.random() * 100),
    'strk': () => 'sometimes',
  },
  'gradientOutlines': {
    'sat': () => 0,
    'lum': () => 100,
    'strk': () => 'always',
    'strkCol': (idx, hue) => hlp.normColInv(idx, (hue + 180) % 360).next().value,
  },
  'tron': {
    'sat': () => 90,
    'lum': () => 10,
    'strk': () => 'always',
    'strkCol': (idx, hue) => `hsl(${(hue + 180) % 360}deg 100% 50%)`,
  },
  'glitter': {
    'run': (idx, row, hue) => glitter(idx, row, hue),
    'strk': () => 'sometimes',
  }
};








export function colourBall(hue) {
  // let circCol = Math.floor(Math.random() * 360);
  let circCol = hue;
  circCol = circCol + 30 >= 360 ? 360 : circCol;
  const circColX = (circCol - 30 >= 0) ? circCol - 30 : 0;
  const circ1 = `hsl(${circCol}deg 100% 90%)`;
  const circ2 = `hsl(${circCol}deg 90% 50%)`;
  const circ3 = `hsl(${circColX}deg 100% 50%)`;
  stops[0].attributes['stop-color'].nodeValue = circ1;
  stops[1].attributes['stop-color'].nodeValue = circ2;
  stops[2].attributes['stop-color'].nodeValue = circ3;
}



// STYLE export functions


export function strokeStyle(type, idx, row, hue, freq) {
  const trigger = styleDefs[type].strk();
  row.forEach(r => {
    switch (trigger) {
      case "never":
        r.setAttribute('stroke', `none`);
        break;
      case "sometimes":
        if(freq) {
          r.setAttribute('stroke', hlp.normCol(idx, hue).next().value);
        } else {
          r.setAttribute('stroke', 'none');
        }
        break;
      case "always":
        r.setAttribute('stroke', styleDefs[type].strkCol(idx, hue));
        break;
      default:
        console.log('test default');
    }
  });
}


export function fillStyle(type, idx, row, hue) {
  let sat, lum;
  if(type == 'milkGradient') {
    sat = styleDefs[type].sat(idx);
  }
  if(type == 'stripes' || 
     type == 'inkGradient') {
    sat = styleDefs[type].sat(idx);
    lum = styleDefs[type].lum(idx);
  }
  if(type == 'outlines') {
    lum = styleDefs[type].lum(idx);
  }
  if(type == 'glitter') {
    styleDefs[type].run(idx, row, hue);
    return 0;
  }
  row.forEach((r,i) => {
    type == 'bright'
    || type == 'milkstain'
    || type == 'milkflood'
    && idx == 0 ? idx = 1 : idx = idx;
    if(type !== 'milkGradient' && 
       type !== 'inkGradient' && 
       type !== 'stripes') {
      sat = styleDefs[type].sat(idx);
    }
    if(type !== 'stripes' && 
       type !== 'inkGradient') {
      lum = styleDefs[type].lum(idx);
    }
    if(type == 'sideGradient') {
      r.attributes['fill'].nodeValue = `hsl(${hue}deg ${50}% ${hlp.normCell(i,row.length).next().value}%)`;
    } else {
      r.attributes['fill'].nodeValue = `hsl(${hue}deg ${sat}% ${lum}%)`;
    }
  });
}



export function glitter(idx, row, hue) {
  if(hlp.styles['glitter']) delete hlp.styles['glitter'];
  const randStyle = hlp.getWeighedRandom(Object.keys(hlp.styles), Object.values(hlp.styles));
  const freq = hlp.getWeighedRandom([false,true],[1,1]);
  let glitterID = setInterval(()=> {
    fillStyle(randStyle, idx, row, hue);
    strokeStyle(randStyle, idx, row, (hue + 180) % 360, freq);
  }, 1000);
  hlp.glitterIDs.push(glitterID);
  return glitterID;
}
