import React from 'react'
import { PrismicRichText } from '@prismicio/react'

/**
 * @typedef {import("@prismicio/client").Content.TitleTextSlice} TitleTextSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TitleTextSlice>} TitleTextProps
 * @param { TitleTextProps }
 */
const TitleText = ({ slice }) => {
  return(
    <>
      <section className='title-text flex'>
        {slice.items.map((item, i) => {
          return(
            <div className='item' key={`item${i}`}>
              <h2 className='special'>{item.title}</h2>
              <PrismicRichText field={item.text}/>
            </div>
          )
        })}
      </section>
    </>
  );
}

export default TitleText