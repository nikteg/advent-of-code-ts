import { getInput, trimSplit } from "../utils.ts";

type XY = [number, number];

const grid = trimSplit(await getInput(import.meta.dir)).map((l) => l.split(""));

function isAntenna(c: string) {
  return /[a-zA-Z0-9]/.test(c);
}

const frequencies = new Map<string, Array<XY>>();

const addAntenna = (c: string, x: number, y: number) => {
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
      addAntenna(c, x, y);
    }
  });
});

function k(coords: XY): string {
  return coords.join(",");
}

function withinBounds([x, y]: XY) {
  return x >= 0 && y >= 0 && x < grid[0].length && y < grid.length;
}

function getAntinodeCount(part2 = false) {
  const antinodes = new Set<string>();

  frequencies.entries().forEach(([c, antennas]) => {
    antennas.forEach(([x, y], i) => {
      antennas.forEach(([x2, y2], i2) => {
        // is same antenna
        if (i === i2) {
          return;
        }

        const [dx, dy] = distance([x, y], [x2, y2]);

        // don't include antenna itself in part 1
        let [nx, ny] = part2 ? [x, y] : [x + dx, y + dy];

        while (withinBounds([nx, ny])) {
          antinodes.add(k([nx, ny]));
          [nx, ny] = [nx + dx, ny + dy];

          // if part 1, only include the first antinode
          if (!part2) {
            break;
          }
        }
      });
    });
  });

  return antinodes.size;
}

console.log("Part 1", getAntinodeCount()); // 276
console.log("Part 2", getAntinodeCount(true)); // 991
