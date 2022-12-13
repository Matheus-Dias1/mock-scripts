// VARIABLES TO CHANGE
const COUNTRIES = ["UG"];
const NUM_OF_POINTS = 1000;

////////////////////////

import fetch from "node-fetch";
import * as fs from "node:fs/promises";

const coords = [];

const main = async () => {
  for (const c of COUNTRIES) {
    for (let i = 0; i < NUM_OF_POINTS; i += 1) {
      console.log(`Fetching ${i + 1} of ${NUM_OF_POINTS} for ${c}...`);
      try {
        const res1 = await fetch(
          `https://api.3geonames.org/randomland.${c}.json`
        );
        const data = await res1.json();
        coords.push(`${data.nearest.inlatt}\t${data.nearest.inlongt}`);
      } catch (error) {
        console.log(error);
      }
    }
  }

  fs.writeFile("coords.txt", coords.join("\n"));
};

main();
