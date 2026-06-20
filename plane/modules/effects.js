console.log('stuff');


const [...paths] = document.getElementsByTagName('path');

// console.log(paths);
// console.dir(paths[0]);
// console.dir(paths[0].attributes['fill'].nodeValue);

function colourise() {
  paths.forEach(p => {
    p.attributes['fill'].nodeValue = `hsl(210deg 100% ${Math.floor(Math.random() * 100)}%)`;
    // p.attributes['fill'].nodeValue = `hsl(${Math.floor(Math.random() * 360)}deg 100% ${Math.floor(Math.random() * 100)}%)`;
  });
}



// setInterval(colourise, 2000);

