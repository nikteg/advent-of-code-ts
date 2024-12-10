import { toNumber, without } from "lodash-es";
import { getInput, trimSplit } from "../utils.ts";

const grid = trimSplit(await getInput(import.meta.dir)).map((l) => l.split(""));

type XY = [number, number];

let guard: XY = [0, 0];
let start: XY = [0, 0];
let direction: XY = [0, -1];

outer: for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[0].length; x++) {
    if (grid[y][x] === "^") {
      start = [x, y];

      break outer;
    }
  }
}

function printGrid() {
  for (let y = 0; y < grid.length; y++) {
    let line = "";
    for (let x = 0; x < grid[0].length; x++) {
      if (visited.has(k([x, y]))) {
        line += "X";
      } else {
        line += grid[y][x];
      }
    }
    console.log(line);
  }
}

function k(ns: Array<number>) {
  return ns.join(",");
}

function v(str: string) {
  return str.split(",").map(toNumber);
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

function reset() {
  guard = start;
  direction = [0, -1];
}

function go(x: number, y: number) {
  guard = [x, y];
}

const visited = new Set<string>();

reset();

while (true) {
  let [x, y] = guard;
  let [dx, dy] = direction;
  let [nx, ny] = [x + dx, y + dy];

  visited.add(k([x, y]));

  if (ny < 0 || ny >= grid.length || nx < 0 || nx >= grid[0].length) {
    break;
  }

  if (grid[ny][nx] === "#") {
    turn();
  } else {
    go(nx, ny);
  }
}

console.log("Part 1", visited.size); // 4967

reset();

const obsPositions = without(Array.from(visited.values()), k(guard)).map(v);
let loops = 0;

obsPositions.forEach(([opx, opy]) => {
  reset();
  const visitedWithDirection = new Set<string>();
  grid[opy][opx] = "#";

  while (true) {
    let [x, y] = guard;
    let [dx, dy] = direction;
    let [nx, ny] = [x + dx, y + dy];

    visitedWithDirection.add(k([x, y, dx, dy]));

    if (ny < 0 || ny >= grid.length || nx < 0 || nx >= grid[0].length) {
      break;
    }

    if (visitedWithDirection.has(k([nx, ny, dx, dy]))) {
      loops++;
      break;
    }

    if (grid[ny][nx] === "#") {
      turn();
    } else {
      go(nx, ny);
    }
  }

  grid[opy][opx] = ".";
});

console.log("Part 2", loops); // 1789
