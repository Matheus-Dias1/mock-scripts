import * as fs from "node:fs/promises";
import { distance } from "./utils/coords-distance";

// Coordinates to compare against the ones in the file
const CMP_COORDS = {
  lat: -0.4398971440641001,
  lng: 33.17939134133899,
};

const main = async () => {
  // read the contents of the "in.txt" file using fs
  const data = await fs.readFile("in.txt", "utf8");
  const coords = data
    .split("\n")
    .map((line) => line.split("\t").map((n) => parseFloat(n)));
  coords.forEach((c) => {
    console.log(distance(CMP_COORDS, { lat: c[0], lng: c[1] }).toFixed(2));
  });
};

main();
