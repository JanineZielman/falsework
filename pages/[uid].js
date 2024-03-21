import Head from "next/head";
import { PrismicLink, SliceZone } from "@prismicio/react";
import React, { useState, useEffect } from 'react';
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { components } from "../slices";
import { PrismicRichText } from '@prismicio/react'


const Page = ({ settings, page }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
      const position = window.pageYOffset;

      setScrollPosition(position);
      if (document.body.scrollHeight -  window.innerHeight <= window.pageYOffset + 100){
        document.getElementById('back').style.bottom = '100px';
      } else{
        document.getElementById('back').style.bottom = '25px';
      }
  };

  useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

  return (
    <>
      <Head>
        <title>{settings.data.site_title}</title>
        <meta property="og:title" content={settings.data.site_title} />
        <meta name="description" content={settings.data.description} />
        <meta property="og:description" content={settings.data.description}></meta>
        <meta property="og:image" content={settings.data.image.url} />
      </Head>
      <div className='container'>
        <div className="space">
          <h1 className='special'>{page.data.title}</h1>
          <a className="back" id="back" href="/"></a>
        </div>
        <div className='flex'>
          <div className='content about'>
            <SliceZone slices={page.data.slices} components={components} />
          </div>
          <div className='sidebar'>
            <PrismicRichText field={page.data.right_column_text}/>
          </div>
        </div>
        <div className='special page-end'>-_-_-_-_-_-_-_-_-_-_-_</div>
      </div>
    </>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("page", params.uid);
  const settings = await client.getSingle("settings");

  return {
    props: {
      page,
      settings,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType("page");

  return {
    paths: pages.map((page) => {
      return {
        params: { uid: page.uid },
      };
    }),
    fallback: false,
  };
}
