import { getInput, trimSplit } from "../utils.ts";

const lines = trimSplit(await getInput(import.meta.dir));

const corruptedMemory = lines.join();

type State = "read-instruction" | "parse-x" | "parse-y" | "summarize";

const chars = corruptedMemory.split("");
let i = 0;
let x = 0;
let y = 0;
let enabled = true;
let state: State = "read-instruction";

function isNumber(str: string) {
  return !isNaN(Number(str));
}

function readInstruction(part2 = false) {
  if (chars[i] === "m" && chars[i + 1] === "u" && chars[i + 2] === "l" && chars[i + 3] === "(") {
    i += 3;
    if (enabled) {
      state = "parse-x";
    }
  } else if (part2 && chars[i] === "d" && chars[i + 1] === "o" && chars[i + 2] === "(" && chars[i + 3] === ")") {
    i += 3;
    enabled = true;
  } else if (
    part2 &&
    chars[i] === "d" &&
    chars[i + 1] === "o" &&
    chars[i + 2] === "n" &&
    chars[i + 3] === "'" &&
    chars[i + 4] === "t" &&
    chars[i + 5] === "(" &&
    chars[i + 6] === ")"
  ) {
    i += 6;
    enabled = false;
  }

  i++;
}

function getNumber() {
  let buffer = "";
  let j = 0;

  while (i + j < chars.length) {
    if (isNumber(chars[i + j])) {
      buffer += chars[i + j];
      j++;
    } else {
      break;
    }
  }

  return [Number(buffer), j];
}

function summarize() {
  state = "read-instruction";
  return x * y;
}

function parseX() {
  let [n, j] = getNumber();

  i += j;

  if (chars[i] === ",") {
    x = n;
    state = "parse-y";
  } else {
    state = "read-instruction";
  }

  i++;
}

function parseY() {
  let [n, j] = getNumber();

  i += j;

  if (chars[i] === ")") {
    y = n;
    state = "summarize";
  } else {
    state = "read-instruction";
  }

  i++;
}

let part1 = 0;

while (i < chars.length) {
  switch (state as State) {
    case "read-instruction":
      readInstruction();
      break;
    case "parse-x":
      parseX();
      break;
    case "parse-y":
      parseY();
      break;
    case "summarize":
      part1 += summarize();
      break;
  }
}

console.log("Part 1", part1);

i = 0;

let part2 = 0;

while (i < chars.length) {
  switch (state as State) {
    case "read-instruction":
      readInstruction(true);
      break;
    case "parse-x":
      parseX();
      break;
    case "parse-y":
      parseY();
      break;
    case "summarize":
      part2 += summarize();
      break;
  }
}

console.log("Part 2", part2);
