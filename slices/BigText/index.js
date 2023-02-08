import React from 'react'
import { PrismicRichText } from '@prismicio/react'

/**
 * @typedef {import("@prismicio/client").Content.BigTextSlice} BigTextSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BigTextSlice>} BigTextProps
 * @param { BigTextProps }
 */
const BigText = ({ slice }) => {
  return(
    <section className='big-text special'>
      <PrismicRichText field={slice.primary.big_text}/>
    </section>
  )
}

export default BigText