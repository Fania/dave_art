console.log('stuff');


const [...paths] = document.getElementsByTagName('path');
const circ = document.getElementsByTagName('circle')[0];
const ball = document.getElementById('ball');
const stops = ball.children;

// console.log(ball);
// console.log(stops);
// console.log(stops[0]);
// console.log(paths);
// console.dir(paths[0]);
// console.dir(paths[0].attributes['fill'].nodeValue);

function colourise() {

  const newCol = Math.floor(Math.random() * 360);
  let circCol = Math.floor(Math.random() * 360);
  circCol = circCol + 30 >= 360 ? 360 : circCol;
  const circColX = (circCol - 30 >= 0) ? circCol - 30 : 0;

  const circ1 = `hsl(${circCol}deg 100% 90%)`;
  const circ2 = `hsl(${circCol}deg 90% 50%)`;
  const circ3 = `hsl(${circColX}deg 100% 50%)`;

  stops[0].attributes['stop-color'].nodeValue = circ1;
  stops[1].attributes['stop-color'].nodeValue = circ2;
  stops[2].attributes['stop-color'].nodeValue = circ3;

  paths.forEach(p => {
    p.attributes['fill'].nodeValue = `hsl(${newCol}deg 100% ${Math.floor(Math.random() * 100)}%)`;
  });
}



// setInterval(colourise, 2000);

