# How to run

## Parse from forebears.io

copy the `<tboby>` from forebears.io in the `files/PARSE_ME.html` file.
wrap it in a table tag `<table> [CONTENT HERE] </table>

in the root directory run
```sh
$ npm run simplify
```

copy the contents of the `files/SIMPLIFIED.html` file and (convert it)[https://www.convertcsv.com/html-table-to-csv.htm] to csv
and paste it the into `files/IN_CSV.csv` file

in the root directory run
```sh
$ npm run parse
```

the parsed result will appear in PARSED.txt

## Generate names
place parsed distribution data in the `FIRST_NAMES` and `LAST_NAMES` files.
Check the variables in parse.ts

in the root directory run
```sh
$ npm run generate
```