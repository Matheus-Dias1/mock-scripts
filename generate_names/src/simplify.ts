import * as fs from "node:fs/promises";

const main = async () => {
  let html = await fs.readFile("files/PARSE_ME.html", "utf8");
  // replace all matches to /<div class="m".*"\>/g with "m"
  html = html.replace(/<div class=\"m.*\"\>/g, "m");
  // replace all matches to /<div class="f".*"\>/g with "f"
  html = html.replace(/<div class=\"f.*\"\>/g, "f");
  // replace all matches to /<//div>/g with ""
  html = html.replace(/<\/div>/g, "");
  // replace &nbsp; with spaces
  html = html.replace(/&nbsp;/g, "0");

  // remove all <span.*\"> and </span>
  html = html.replace(/<span.*\">/g, "");
  html = html.replace(/<\/span>/g, "");

  // remove all commas
  html = html.replace(/,/g, "");

  // save the result to OUT_HTML.html
  await fs.writeFile("files/SIMPLIFIED.html", html);
};

main();
