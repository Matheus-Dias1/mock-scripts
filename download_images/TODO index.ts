// TODO: FIX THIS FILE

// /* eslint-disable no-await-in-loop */
// import { Command, Flags } from '@oclif/core';
// import * as fs from 'node:fs/promises';
// import * as fs2 from 'node:fs';
// import slugify from 'slugify';
// import axios from 'axios';
// import { image_search as imageSearch } from 'duckduckgo-images-api';

// const VALID_EXTENSIONS = ['JPEG', 'jpeg', 'JPG', 'jpg', 'png', 'PNG'];

// const downloadFile = async (fileUrl: string, outputLocationPath: string) => {
//   const writer = fs2.createWriteStream(outputLocationPath);

//   const res = await axios.get(fileUrl, { responseType: 'stream' });
//   await new Promise((resolve, reject) => {
//     res.data.pipe(writer);
//     let error: Error | null = null;
//     writer.on('error', (err) => {
//       error = err;
//       writer.close();
//       reject(err);
//     });
//     writer.on('close', () => {
//       if (!error) {
//         resolve(true);
//       }
//     });
//   });
// };

// export default class Names extends Command {
//   static description =
//     'Gets the first google image search answer from a list of queries';

//   static examples = ['$ images --in queries.txt --out imgFolder'];

//   static flags = {
//     in: Flags.string({
//       char: 'i',
//       description: 'File with the queries, one per line',
//       required: true,
//     }),
//     out: Flags.string({
//       char: 'o',
//       description: 'Location to where the files will be downloaded',
//       required: false,
//     }),
//   };

//   static args = [];

//   async run(): Promise<void> {
//     const { flags } = await this.parse(Names);
//     const { in: inF, out: outF } = flags;

//     // setting base path
//     let out = '.';
//     if (outF) {
//       const len = outF.length;
//       out = outF[len - 1] === '/' ? outF.slice(0, len - 1) : outF;
//     }

//     // parses query file
//     const queryList = (await fs.readFile(inF))
//       .toString()
//       .split('\n')
//       .map((x) => slugify(x).replaceAll('-', ' '));

//     const searches: Promise<any>[] = [];
//     for (const query of queryList) {
//       searches.push(imageSearch({ query: query }));
//     }

//     const imageUrls = (await Promise.all(searches)).map((x) => {
//       const url: string | undefined = x[0]?.image;
//       if (url && VALID_EXTENSIONS.some((ext) => url.includes(ext))) return url;
//       return null;
//     });

//     for (const [i, url] of imageUrls.entries()) {
//       if (url) {
//         const list = url.split('.');
//         let ext = list[list.length - 1];
//         const paramIndex: number = ext.indexOf('?');
//         if (paramIndex > 0) ext = ext.slice(0, paramIndex);
//         const filePath = `${out}/${queryList[i]}.${ext}`;
//         downloadFile(url, filePath);
//       } else {
//         console.log('Failed getting image for:', queryList[i]);
//       }
//     }
//   }
// }
