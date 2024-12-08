import { compact } from "lodash-es";

export async function getInput(path: string, sample = false) {
  return Bun.file(path + (sample ? "/sample.txt" : "/input.txt")).text();
}

export function trimSplit(text: string, splitter = "\n") {
  return compact(text.split(splitter));
}
