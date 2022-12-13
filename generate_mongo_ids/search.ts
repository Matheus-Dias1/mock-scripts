// Variables (change these to your liking)
const WANTED_FIELD = "id";
const SEARCH_FIELD = "name";

import { getData } from "./in/data";
import * as fs from "node:fs/promises";

const getSearchValues = async () => {
  // open in/search.txt and split it by new line
  const file = await fs.readFile("in/search.txt", "utf-8");
  return file.split("\n").filter((x) => x);
};

const main = async () => {
  const data = getData();
  const searchValues = await getSearchValues();
  const res: string[] = [];
  for (const term of searchValues) {
    const node = data.find((x) => x[SEARCH_FIELD] === term);
    res.push(`${term}\t${node ? node[WANTED_FIELD] : "NOT FOUND"}`);
  }

  await fs.writeFile("out/search.txt", res.join("\n"));
};

main();
