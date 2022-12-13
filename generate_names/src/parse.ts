const FILTER_SEX: "M" | "F" | false = false;

////////////////////////////////

import * as fs from "node:fs/promises";

interface Name {
  name?: string;
  sex?: "M" | "F" | null;
  frequency?: number;
}

const main = async () => {
  const csv = await fs.readFile("files/IN_CSV.csv", "utf-8");
  const lines = csv.split("\n").filter((line) => line.length > 0);

  const names: Name[] = [];

  lines.forEach((l) => {
    if (l.match(/^\".*\"$/)) return;
    const cols = l.split(",").map((s) => s.trim());
    const isForename = cols[1].includes("%");

    const name = isForename ? cols[2] : cols[1];
    const freqStr = isForename ? cols[4] : cols[3];
    const sexStr = isForename ? cols[1] : null;

    const sex = isForename
      ? sexStr.match(/[a-z]\d+%/g)[0][0] === "m"
        ? "M"
        : "F"
      : null;
    const [n, d] = freqStr.split(":").map((s) => parseInt(s));
    const frequency = n / d;

    if (!FILTER_SEX || FILTER_SEX === sex)
      names.push({
        name,
        frequency,
        sex,
      });
  });

  // if filtering sex, recalculate the frequencies
  const total = names.reduce((acc, n) => acc + n.frequency, 0);
  names.forEach((n) => (n.frequency = n.frequency / total));

  // write names to PARSED.txt
  await fs.writeFile(
    "files/PARSED.txt",
    names.map((n) => `${n.name}\t${n.frequency}`).join("\n")
  );
};

main();
