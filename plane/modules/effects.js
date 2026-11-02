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
console.log(rows);
// console.dir(paths[0]);
// console.dir(paths[0].attributes['fill'].nodeValue);



function colouriseAll() {

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


function colourise(group) {
  const newCol = Math.floor(Math.random() * 360);
  group.forEach(p => {
    p.attributes['fill'].nodeValue = `hsl(${newCol}deg 100% ${Math.floor(Math.random() * 100)}%)`;
  });
}

// setInterval(colouriseAll, 2000);




rows.forEach((row, idx) => {
  // console.log(row.children);
  console.log(`row ${idx}`);
  // console.log(idx);
  // console.log(row);
  const [...paths] = row.children;
  // setTimeout(()=>colourise(paths), 5000);
  // setInterval(colourise(paths), 5000);
  // colourise(paths);
  // row.wait(1000);

  setTimeout(()=> {
    colourise(paths);
    // console.log(el);
  }, idx * 100);

});

// var array = ['some', 'array', 'containing', 'words'];
// array.forEach(function (el) {
//   console.log(el);
//   wait(1000); // wait 1000 milliseconds
// });
// console.log('Loop finished.');