import { compact, flow, groupBy, mapValues, negate, sum, toNumber } from "lodash-es";

let path = import.meta.dir + "/sample.txt";
path = import.meta.dir + "/input.txt";

const file = Bun.file(path);
let text = await file.text();

const [rulesLines, updatesLines] = text.split("\n\n").map((s) => compact(s.split("\n")));

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
