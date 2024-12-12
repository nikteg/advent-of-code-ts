import { sumBy, toNumber } from "lodash-es";
import { getInput, trimSplit } from "../utils.ts";

type SumNums = [number, Array<number>];

const sumNums = trimSplit(await getInput(import.meta.dir)).map((l) => {
  const [sum, ...nums] = l.split(/[ :]+/).map(toNumber);

  return [sum, nums] as SumNums;
});

function isValid(
  numbers: number[],
  total: number,
  part2 = false,
  currentResult: number = numbers[0],
  index: number = 1,
): boolean {
  return index === numbers.length
    ? currentResult === total
    : (index === numbers.length && currentResult === total) ||
        isValid(numbers, total, part2, currentResult + numbers[index], index + 1) ||
        isValid(numbers, total, part2, currentResult * numbers[index], index + 1) ||
        (part2 && isValid(numbers, total, part2, concat(currentResult, numbers[index]), index + 1));
}

function concat(a: number, b: number) {
  return toNumber(String(a) + String(b));
}

console.log(
  "Part 1",
  sumBy(sumNums, ([s, nums]) => (isValid(nums, s, false) ? s : 0)),
); // 8401132154762

console.log(
  "Part 2",
  sumBy(sumNums, ([s, nums]) => (isValid(nums, s, true) ? s : 0)),
); // 95297119227552
