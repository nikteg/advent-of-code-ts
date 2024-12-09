import { getInput, trimSplit } from "../utils.ts";

const grid = trimSplit(await getInput(import.meta.dir)).map((l) => l.split(""));

type XY = [number, number];

let guard: XY = [0, 0];
let direction: XY = [0, -1];

outer: for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[0].length; x++) {
    if (grid[y][x] === "^") {
      guard = [x, y];

      break outer;
    }
  }
}

function turn() {
  let [dx, dy] = direction;

  if (dx === 0 && dy === -1) {
    direction = [1, 0];
  } else if (dx === 1 && dy === 0) {
    direction = [0, 1];
  } else if (dx === 0 && dy === 1) {
    direction = [-1, 0];
  } else if (dx === -1 && dy === 0) {
    direction = [0, -1];
  }
}

const positions = new Set<string>();

while (true) {
  let [x, y] = guard;
  let [dx, dy] = direction;
  let [nx, ny] = [x + dx, y + dy];

  positions.add(`${x},${y}`);

  if (ny < 0 || ny >= grid.length || nx < 0 || nx >= grid[0].length) {
    break;
  }

  if (grid[ny][nx] === "#") {
    turn();
  } else {
    guard = [nx, ny];
  }
}

// for (let y = 0; y < grid.length; y++) {
//   let line = "";
//   for (let x = 0; x < grid[0].length; x++) {
//     if (positions.has(`${x},${y}`)) {
//       line += "X";
//     } else {
//       line += grid[y][x];
//     }
//   }
//   console.log(line);
// }

console.log("Part 1", positions.size);
