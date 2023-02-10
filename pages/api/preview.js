// import * as prismicNext from "@prismicio/next";

// import { createClient, linkResolver } from "../../prismicio";

// export default async function handler(req, res) {
//   const client = createClient({ req });

//   prismicNext.setPreviewData({ req, res });

//   await prismicNext.redirectToPreviewURL({ req, res, client, linkResolver });
// }


import { setPreviewData, redirectToPreviewURL } from '@prismicio/next'
import { linkResolver, createClient } from '../../prismicio'

export default async (req, res) => {
  const client = createClient({ req })

  await setPreviewData({ req, res })

  await redirectToPreviewURL({ req, res, client, linkResolver })
}