import { flow, groupBy, mapValues, negate, sum, toNumber } from "lodash-es";
import { getInput, trimSplit } from "../utils.ts";

const lines = trimSplit(await getInput(import.meta.dir), "\n\n");

const [rulesLines, updatesLines] = lines.map((s) => trimSplit(s));

const ruleNumbers = rulesLines.map((rl) => rl.split("|").map(toNumber));
const updates = updatesLines.map((up) => up.split(",").map(toNumber));

const rules = mapValues(
  groupBy(ruleNumbers, (r) => r[1]),
  (v) => v.map((x) => x[0]),
);

function isAfter(ua: number, ub: number) {
  return rules[ua] && rules[ua].includes(ub);
}

function isCorrect(us: Array<number>) {
  for (let i = 0; i < us.length - 1; i++) {
    if (isAfter(us[i], us[i + 1])) {
      return false;
    }
  }
  return true;
}

function getMiddleNumber(us: Array<number>) {
  return us[Math.floor(us.length / 2)];
}

function sortUpdate(us: Array<number>) {
  return us.toSorted((ua, ub) => (isAfter(ua, ub) ? -1 : isAfter(ub, ua) ? 1 : 0));
}

const part1 = sum(updates.filter(isCorrect).map(getMiddleNumber));

console.log("Part 1", part1);

const part2 = sum(updates.filter(negate(isCorrect)).map(flow([sortUpdate, getMiddleNumber])));

console.log("Part 2", part2);
