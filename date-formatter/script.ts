// Variables (change these to your needs)
const ORIGINAL_FORMAT = "M/D/Y";
const WANTED_FORMAT = "D/M/Y";

//////////////////
import * as fs from "node:fs/promises";

const main = async () => {
  const dates = (await fs.readFile("in.txt", "utf-8"))
    .split("\n")
    .filter((x) => x)
    .map((x) => x.trim());

  const old_order = ORIGINAL_FORMAT.split("/");
  const new_order = WANTED_FORMAT.split("/");
  const order = new_order.map((x) => old_order.indexOf(x));

  const res = dates.map((date) => {
    const dateArr = date.split("/");
    return `${dateArr[order[0]]}/${dateArr[order[1]]}/${dateArr[order[2]]}`;
  });

  // save to out.txt
  await fs.writeFile("out.txt", res.join("\n"));
};
main();
