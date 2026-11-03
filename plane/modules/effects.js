console.log('stuff');


const [...paths] = document.getElementsByTagName('path');
const [...rows] = document.getElementsByClassName('rows');
const circ = document.getElementsByTagName('circle')[0];
const ball = document.getElementById('ball');
const stops = ball.children;

// console.log(ball);
// console.log(stops);
// console.log(stops[0]);
// console.log(paths);
// console.log(rows);
// console.dir(paths[0]);
// console.dir(paths[0].attributes['fill'].nodeValue);



function colourBall() {
  let circCol = Math.floor(Math.random() * 360);
  circCol = circCol + 30 >= 360 ? 360 : circCol;
  const circColX = (circCol - 30 >= 0) ? circCol - 30 : 0;

  const circ1 = `hsl(${circCol}deg 100% 90%)`;
  const circ2 = `hsl(${circCol}deg 90% 50%)`;
  const circ3 = `hsl(${circColX}deg 100% 50%)`;

  stops[0].attributes['stop-color'].nodeValue = circ1;
  stops[1].attributes['stop-color'].nodeValue = circ2;
  stops[2].attributes['stop-color'].nodeValue = circ3;
}


function colourise(idx, row, col) {
  // const newCol = Math.floor(Math.random() * 360);
  const lumin = Math.floor(Math.random() * 100);
  row.forEach(r => {
    r.attributes['fill'].nodeValue = `hsl(${col}deg 100% ${lumin}%)`;
  });
}

// setInterval(colouriseAll, 2000);




function reDraw() {
  const newCol = Math.floor(Math.random() * 360);
  rows.forEach((row, idx) => {
    console.log(`row ${idx}`);
    const [...paths] = row.children;
    setTimeout(()=> {
      colourise(idx, paths, newCol);
    }, idx * 100);
  });
}


setInterval(()=> {
  // colourise(paths);
  reDraw();
  colourBall();
// }, 10000); // 10sec
}, 2000); // 10sec
// reDraw();