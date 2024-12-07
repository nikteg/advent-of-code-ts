import { compact, toNumber } from "lodash-es";

const PART1 = false;

let path = import.meta.dir + "/sample.txt";
path = import.meta.dir + "/input.txt";

const file = Bun.file(path);
const text = await file.text();
const lines = compact(text.split("\n"));

const left: Array<number> = [];
const right: Array<number> = [];

lines.forEach((line) => {
  const [l, r] = compact(line.split(" ").map(toNumber));

  left.push(l);
  right.push(r);
});

if (PART1) {
  left.sort();
  right.sort();

  let sum = 0;
  left.forEach((l, i) => {
    sum += Math.abs(l - right[i]);
  });

  console.log("Part 1", sum);
} else {
  function count(number: number) {
    return right.filter((r) => r === number).length;
  }

  let sum = 0;
  left.forEach((l, i) => {
    sum += l * count(l);
  });

  console.log("Part 2", sum);
}
