/////////// NOT WORKING ///////////

// Variables (change these as preferred)
const FEATURE_ID = "DNAME2014";
const coords = [33.959, 2.61];

///////////////////////////////

import * as fs from "node:fs/promises";
import { geoContains, geoPath } from "d3-geo";

const main = async () => {
  // opens in/geo.json and parses it
  const geojson = JSON.parse(await fs.readFile("in/geo.json", "utf8"));
  const search = (await fs.readFile("in/search.txt", "utf8"))
    .split("\n")
    .filter((line) => line)
    .map((coords) => coords.split("\t").map((coord) => parseFloat(coord)));

  search.forEach((coord) => {
    console.log(coord);
    // checks if the point is inside the polygon using d3-geo library
    const isInside = geojson.features.find((feature) => {
      const reversedCoords = JSON.parse(JSON.stringify(feature));
      reversedCoords.geometry.coordinates =
        reversedCoords.geometry.coordinates.reverse();
      return geoContains(reversedCoords, coord);
    });

    console.log(isInside ? isInside.properties[FEATURE_ID] : "XXXXXXXXXXXXXX");
  });
};

main();
