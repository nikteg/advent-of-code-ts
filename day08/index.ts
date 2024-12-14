import { toNumber } from "lodash-es";
import { getInput, trimSplit } from "../utils.ts";

type XY = [number, number];

const grid = trimSplit(await getInput(import.meta.dir)).map((l) => l.split(""));

function isAntenna(c: string) {
  return /[a-zA-Z0-9]/.test(c);
}

const frequencies = new Map<string, Array<XY>>();

const update = (c: string, x: number, y: number) => {
  const existing = frequencies.get(c);

  if (existing) {
    existing.push([x, y]);
  } else {
    frequencies.set(c, [[x, y]]);
  }
};

function distance([ax, ay]: XY, [bx, by]: XY): XY {
  return [ax - bx, ay - by];
}

grid.forEach((row, y) => {
  row.forEach((c, x) => {
    if (isAntenna(c)) {
      update(c, x, y);
    }
  });
});

function k(coords: XY): string {
  return coords.join(",");
}

function v(str: string): XY {
  return str.split(",").map(toNumber) as XY;
}

const antinodes = new Set<string>();

frequencies.entries().forEach(([c, antennas]) => {
  antennas.forEach(([x, y], i) => {
    antennas.forEach(([x2, y2], i2) => {
      // is same antenna
      if (i === i2) {
        return;
      }

      // is antinode
      const [dx, dy] = distance([x, y], [x2, y2]);
      const [nx, ny] = [x + dx, y + dy];

      // console.log(c, [x, y], [x2, y2], [dx, dy], [nx, ny]);

      if (nx < 0 || ny < 0 || nx >= grid[0].length || ny >= grid.length) {
        return;
      }

      antinodes.add(k([nx, ny]));
    });
  });
});

grid.forEach((row, y) => {
  let line = "";
  row.forEach((c, x) => {
    if (antinodes.has(k([x, y]))) {
      line += "#";
    } else {
      line += c;
    }
  });
  console.log(line);
});

console.log("Part 1", antinodes.size); // 276
