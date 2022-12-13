// Set surname to null to disable surname generation
const VARIABLES = {
  names: "files/FIRST_NAMES.txt",
  surnames: "files/LAST_NAMES.txt",
  // surnames: null,
  out: "files/OUT.txt",
  amount: 1000,
};

import * as fs from "node:fs/promises";

type DistributionI = {
  name: string;
  prob: number;
}[];

const getNameFromRandomNumber = (rand: number, dist: DistributionI) => {
  let count = 0;
  for (const name of dist) {
    count += name.prob;
    if (rand <= count) return name.name;
  }

  return dist[dist.length - 1].name;
};

const getNames = async () => {
  const flags = VARIABLES;
  const { names: namesF, surnames: surnameF, out: outF, amount } = flags;

  const out =
    outF ||
    `names-${(Math.random() + 1).toString(36).slice(7).toUpperCase()}.txt`;

  const nameDist: DistributionI = [];
  const surnameDist: DistributionI = [];

  // parses name file
  const namesList = (await fs.readFile(namesF)).toString().split("\n");
  for (const dist of namesList) {
    const [name, prob] = dist.split("\t").map((x: string) => x.trim());
    nameDist.push({
      name,
      prob: Number.parseFloat(prob),
    });
  }

  // parser surname file
  if (surnameF) {
    const namesList = (await fs.readFile(surnameF)).toString().split("\n");
    for (const dist of namesList) {
      const [name, prob] = dist.split("\t").map((x: string) => x.trim());
      surnameDist.push({
        name,
        prob: Number.parseFloat(prob),
      });
    }
  }

  // generating names
  const res: string[] = [];
  for (let i = 0; i < amount; i++) {
    const rand = Math.random();
    const gName = getNameFromRandomNumber(rand, nameDist);
    const gSurname = surnameF
      ? getNameFromRandomNumber(rand, surnameDist)
      : undefined;
    res.push(gSurname ? `${gName}\t${gSurname}` : gName);
  }

  fs.writeFile(out, res.join("\n"));
};

getNames();
