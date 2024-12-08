import { compact } from "lodash-es";

const PART: 1 | 2 = 1;

let path = import.meta.dir + "/sample.txt";
path = import.meta.dir + "/input.txt";

const file = Bun.file(path);
const text = await file.text();
const lines = compact(text.split("\n"));

type TLetter = "X" | "M" | "A" | "S";
type XY = [number, number];

function ls(letter: TLetter) {
  const found: Array<XY> = [];

  letters.forEach((row, y) => {
    row.forEach((c, x) => {
      if (c === letter) {
        found.push([x, y]);
      }
    });
  });

  return found;
}

function dir(x: number, y: number, xx: number, yy: number): XY {
  let dx = Math.sign(xx - x);
  let dy = Math.sign(yy - y);

  return [dx, dy];
}

function neighbor(x: number, y: number, xx: number, yy: number) {
  return Math.abs(x - xx) <= 1 && Math.abs(y - yy) <= 1;
}

const letters = lines.map((line) => line.split("") as Array<TLetter>);

let sum = 0;

ls("X").forEach(([xx, xy]) => {
  ls("M").forEach(([mx, my]) => {
    if (neighbor(xx, xy, mx, my)) {
      const [dx, dy] = dir(xx, xy, mx, my);
      const [nax, nay]: XY = [mx + dx, my + dy];
      ls("A").forEach(([ax, ay]) => {
        if (ax === nax && ay == nay) {
          const [nsx, nsy]: XY = [ax + dx, ay + dy];
          ls("S").forEach(([sx, sy]) => {
            if (sx === nsx && sy == nsy) {
              sum++;
            }
          });
        }
      });
    }
  });
});

console.log("Part", PART, sum);
