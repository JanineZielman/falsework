import React from 'react'
import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.ImageSlice} ImageSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ImageSlice>} ImageProps
 * @param { ImageProps }
 */
const Image = ({ slice }) => {
  return(
    <section className='image'>
      <PrismicNextImage field={slice?.primary?.image} layout="intrinsic" />
      <div className='credits'>{slice?.primary?.image?.copyright}</div>
    </section>
  )
}

export default Image