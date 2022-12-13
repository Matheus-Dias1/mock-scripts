# How to use

Setup a grid in the backoffice, and copy the result of the custom query into the `data.ts` file. If there's more than 100, you can just add them all into the array, no need to extract the nodes.

## Random IDs

If you wish to generate random IDs from the input data, change the variables in `random.ts` file as preferred and run

```sh
$ npm run random
```

The output will appear in `out/random.txt`

## Search IDs

If you wish to search IDs from the input data and a lookup document, put the search keys in `in/search.txt` file, change the variables in `search.ts` file as preferred and run

```sh
$ npm run search
```

The output will appear in `out/search.txt`
