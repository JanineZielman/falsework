import '@/styles/globals.scss'
import '@/styles/breakpoints.scss'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "../prismicio";

export default function App({ Component, pageProps }) {
  return (
    <PrismicPreview repositoryName={repositoryName}>
      <Component {...pageProps} />
    </PrismicPreview>
  )
}
