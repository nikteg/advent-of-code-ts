import { compact } from "lodash-es";

const PART: 1 | 2 = 2;

let path = import.meta.dir + "/sample.txt";
path = import.meta.dir + "/input.txt";

const file = Bun.file(path);
const text = await file.text();
const lines = compact(text.split("\n"));

const corruptedMemory = lines.join();

type State = "read-instruction" | "parse-x" | "parse-y" | "summarize";

const chars = corruptedMemory.split("");
let i = 0;
let x = 0;
let y = 0;
let sum = 0;
let enabled = true;
let state: State = "read-instruction";

function isNumber(str: string) {
  return !isNaN(Number(str));
}

function readInstruction() {
  if (
    chars[i] === "m" &&
    chars[i + 1] === "u" &&
    chars[i + 2] === "l" &&
    chars[i + 3] === "("
  ) {
    i += 3;
    if (enabled) {
      state = "parse-x";
    }
  } else if (
    PART === 2 &&
    chars[i] === "d" &&
    chars[i + 1] === "o" &&
    chars[i + 2] === "(" &&
    chars[i + 3] === ")"
  ) {
    i += 3;
    enabled = true;
  } else if (
    PART === 2 &&
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
  sum += x * y;
  state = "read-instruction";
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
      summarize();
      break;
  }

  // console.log(state, "x=", x, "y=", y, "sum=", sum);
}

console.log("Part", PART, sum);
