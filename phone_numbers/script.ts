// Variables (CHANGE THESE)
const PHONE_TEMPLATE = "+256 7XX XXX XXX";
const NUMBER_OF_PHONES = 1000;
const BLANK_RATE = 0.05;

const main = () => {
  const generateRandomNumber = () => {
    const chars = PHONE_TEMPLATE.split("");
    return chars
      .map((c) => (c === "X" ? Math.floor(Math.random() * 10) : c))
      .join("");
  };

  for (let i = 0; i < NUMBER_OF_PHONES; i++) {
    console.log(Math.random() > BLANK_RATE ? `'${generateRandomNumber()}` : "");
  }
};

main();
