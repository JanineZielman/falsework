// import * as prismicNext from "@prismicio/next";

// export default async function handler(req, res) {
//   prismicNext.exitPreview({ res, req });
// }


import { exitPreview } from '@prismicio/next'

export default async function exit(req, res) {
  await exitPreview({ res, req });
}