// Variables (change these to your liking)
const NUM_OF_LINES = 1000;
const WANTED_FIELD = "id";

//////////////////////////////

import * as fs from "node:fs/promises";
import { getData } from "./in/data";

const main = async () => {
  const res: string[] = [];
  const data = getData();
  for (let i = 0; i < NUM_OF_LINES; i++) {
    const randomIndex = Math.floor(Math.random() * data.length);
    res.push(data[randomIndex][WANTED_FIELD]);
  }

  await fs.writeFile("out/random.txt", res.join("\n"));
};

main();
