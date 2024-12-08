import { compact, identity, isEqual, orderBy, toNumber } from "lodash-es";
import { getInput, trimSplit } from "../utils.ts";

const lines = trimSplit(await getInput(import.meta.dir));

function isIncreasingOrDecreasing(numbers: Array<number>) {
  return isEqual(orderBy(numbers), numbers) || isEqual(orderBy(numbers, identity, "desc"), numbers);
}

function isSafeDistance(num1: number, num2: number) {
  const diff = Math.abs(num1 - num2);

  return !(diff < 1 || diff > 3);
}

function hasSafeDistances(numbers: Array<number>) {
  for (let i = 0; i < numbers.length - 1; i++) {
    if (!isSafeDistance(numbers[i], numbers[i + 1])) {
      return false;
    }
  }

  return true;
}

function getWithRemovedLevels(numbers: Array<number>) {
  return numbers.map((_, i) => numbers.filter((_, i2) => i !== i2));
}

let part1 = 0;

lines.forEach((line) => {
  const report = compact(line.split(" ").map(toNumber));

  if (isIncreasingOrDecreasing(report) && hasSafeDistances(report)) {
    part1 += 1;
  }
});

console.log("Part 1", part1);

let part2 = 0;

lines.forEach((line) => {
  const report = compact(line.split(" ").map(toNumber));

  if (isIncreasingOrDecreasing(report) && hasSafeDistances(report)) {
    part2 += 1;
  } else {
    const reports = getWithRemovedLevels(report);

    let isSafeWithDampener = false;
    reports.forEach((r) => {
      if (isIncreasingOrDecreasing(r) && hasSafeDistances(r) && !isSafeWithDampener) {
        isSafeWithDampener = true;
      }
    });

    if (isSafeWithDampener) {
      part2 += 1;
    }
  }
});

console.log("Part 2", part2);
