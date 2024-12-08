import { compact, identity, isEqual, orderBy, toNumber } from "lodash-es";

const PART1 = false;

let path = import.meta.dir + "/sample.txt";
path = import.meta.dir + "/input.txt";

const file = Bun.file(path);
const text = await file.text();
const lines = compact(text.split("\n"));

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

if (PART1) {
  let sum = 0;

  lines.forEach((line) => {
    const report = compact(line.split(" ").map(toNumber));

    if (isIncreasingOrDecreasing(report) && hasSafeDistances(report)) {
      sum += 1;
    }
  });

  console.log("Part 1", sum);
} else {
  let sum = 0;

  lines.forEach((line) => {
    const report = compact(line.split(" ").map(toNumber));

    if (isIncreasingOrDecreasing(report) && hasSafeDistances(report)) {
      sum += 1;
    } else {
      const reports = getWithRemovedLevels(report);

      let isSafeWithDampener = false;
      reports.forEach((r) => {
        if (isIncreasingOrDecreasing(r) && hasSafeDistances(r) && !isSafeWithDampener) {
          isSafeWithDampener = true;
        }
      });

      if (isSafeWithDampener) {
        sum += 1;
      }
    }
  });

  console.log("Part 2", sum);
}
