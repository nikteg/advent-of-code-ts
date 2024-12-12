import { sumBy, toNumber } from "lodash-es";
import { getInput, trimSplit } from "../utils.ts";

type SumNums = [number, Array<number>];

const sumNums = trimSplit(await getInput(import.meta.dir)).map((l) => {
  const [sum, ...nums] = l.split(/[ :]+/).map(toNumber);

  return [sum, nums] as SumNums;
});

function calc(numbers: number[], currentResult: number = 0, index: number = 0): number[] {
  if (index === numbers.length - 1) {
    return [currentResult + numbers[index], currentResult * numbers[index]];
  }

  if (index === 0) {
    return calc(numbers, numbers[index], index + 1);
  }

  return [
    ...calc(numbers, currentResult + numbers[index], index + 1),
    ...calc(numbers, currentResult * numbers[index], index + 1),
  ];
}

function calc2(numbers: number[], currentResult: number = 0, index: number = 0): number[] {
  if (index === numbers.length - 1) {
    return [currentResult + numbers[index], currentResult * numbers[index], concat(currentResult, numbers[index])];
  }

  if (index === 0) {
    return calc2(numbers, numbers[index], index + 1);
  }

  return [
    ...calc2(numbers, currentResult + numbers[index], index + 1),
    ...calc2(numbers, currentResult * numbers[index], index + 1),
    ...calc2(numbers, concat(currentResult, numbers[index]), index + 1),
  ];
}

function concat(a: number, b: number) {
  return toNumber(String(a) + String(b));
}

console.log(
  "Part 1",
  sumBy(sumNums, ([s, nums]) => (calc(nums).some((n) => n === s) ? s : 0)),
); // 8401132154762

console.log(
  "Part 2",
  sumBy(sumNums, ([s, nums]) => (calc2(nums).some((n) => n === s) ? s : 0)),
); // 95297119227552
