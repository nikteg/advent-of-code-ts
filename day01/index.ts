import { compact, toNumber } from "lodash-es";
import { getInput, trimSplit } from "../utils.ts";

const lines = trimSplit(await getInput(import.meta.dir));

function count(number: number) {
  return right.filter((r) => r === number).length;
}

const left: Array<number> = [];
const right: Array<number> = [];

lines.forEach((line) => {
  const [l, r] = compact(line.split(" ").map(toNumber));

  left.push(l);
  right.push(r);
});

left.sort();
right.sort();

let part1 = 0;

left.forEach((l, i) => (part1 += Math.abs(l - right[i])));

console.log("Part 1", part1);

let part2 = 0;

left.forEach((l) => (part2 += l * count(l)));

console.log("Part 2", part2);
