import { compact, groupBy, mapValues, sum, toNumber } from "lodash-es";

type Part = 1 | 2;
const PART: Part = 1 as Part;

let path = import.meta.dir + "/sample.txt";
path = import.meta.dir + "/input.txt";

const file = Bun.file(path);
let text = await file.text();

const [rulesLines, updatesLines] = text
  .split("\n\n")
  .map((s) => compact(s.split("\n")));

const ruleNumbers = rulesLines.map((rl) => rl.split("|").map(toNumber));
const updates = updatesLines.map((up) => up.split(",").map(toNumber));

const rules = mapValues(
  groupBy(ruleNumbers, (r) => r[1]),
  (v) => v.map((x) => x[0]),
);

const totalSum = sum(
  updates
    .filter((us) => {
      for (let i = 0; i < us.length - 1; i++) {
        const ua = us[i];
        const ub = us[i + 1];

        if (rules[ua] && rules[ua].includes(ub)) {
          return false;
        }
      }
      return true;
    })
    .map((us) => us[Math.floor(us.length / 2)]),
);

console.log("Part 1", totalSum);
