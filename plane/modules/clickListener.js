const my_svg = document.getElementById('svg');
const [...blocks] = document.getElementById('colour_blocks').children;
// const [...gradients] = document.getElementById('gradients').children;

console.log(`There are a total of ${blocks.length} colour blocks.`);
// console.log(`And there are ${gradients.length} unique gradients.`);


let coords_list = [];


my_svg.addEventListener("click", (ev) => {
  // console.log(ev);
  // const elem = document.elementFromPoint(ev.offsetX, ev.offsetY);
  // console.log(elem);
  console.log(`(${ev.offsetX}, ${ev.offsetY})`);
  coords_list.push(`${ev.offsetX} ${ev.offsetY}`);
  // navigator.clipboard.writeText(`${ev.offsetX} ${ev.offsetY}`);
  // console.log(coords_list);
  // console.log(coords_list.join(' '));
});


blocks.forEach(block => {
  block.addEventListener("dblclick", (ev) => {
    console.log(block.id);
    // console.log(ev);
    // const elem = document.elementFromPoint(ev.offsetX, ev.offsetY);
    // console.log(elem.id);
  });
});



document.addEventListener("keydown", event => {
  if (event.key === "x") {
    console.log(coords_list);
    const [head, ...rest] = coords_list; 
    const newpath = `<path d="M ${head} L ${rest.join(' ')} Z" fill="hsl(210deg 100% 25%)"/>`

    // navigator.clipboard.writeText(coords_list.join(' '));
    navigator.clipboard.writeText(newpath);
    coords_list = [];
  }
});

// 309 3532 465 3544 375 3659