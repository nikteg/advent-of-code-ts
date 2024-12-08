import { compact } from "lodash-es";

type Part = 1 | 2;
const PART: Part = 2 as Part;

let path = import.meta.dir + "/sample.txt";
path = import.meta.dir + "/input.txt";

const file = Bun.file(path);
let text = await file.text();
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

function nb(x: number, y: number, xx: number, yy: number) {
  return Math.abs(x - xx) <= 1 && Math.abs(y - yy) <= 1;
}

const letters = lines.map((line) => line.split("") as Array<TLetter>);

if (PART === 1) {
  let sum = 0;

  ls("X").forEach(([xx, xy]) => {
    ls("M").forEach(([mx, my]) => {
      if (nb(xx, xy, mx, my)) {
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

  console.log("Part 1", sum);
} else {
  let sum = 0;
  ls("A").forEach(([ax, ay]) => {
    let c = 0;
    ls("M").forEach(([mx, my]) => {
      if (nb(mx, my, ax, ay) && mx !== ax && my !== ay) {
        const [dx, dy] = dir(mx, my, ax, ay);
        const [nsx, nsy]: XY = [ax + dx, ay + dy];
        ls("S").forEach(([sx, sy]) => {
          if (sx === nsx && sy === nsy) {
            c++;
          }
        });
      }
    });
    if (c == 2) {
      sum++;
    }
  });

  console.log("Part 2", sum);
}
