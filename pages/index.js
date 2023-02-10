import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import { createClient } from "../prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "../slices";
import { PrismicRichText } from '@prismicio/react'

const Home = ({ page, settings }) => {
  const colors = ['#ffff80', '#99a6d5', '#ff9800', '#f9d5e1', '#feca00', '#acf16a', '#85c5ed', '#009640']
  useEffect(() => {
    const number = Math.floor(Math.random() * colors.length);
    document.body.style.backgroundColor= colors[number];
  },[]);
  
  console.log(settings)
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
        <h1 className='special big'>{page.data.title}</h1>
        <div className='flex'>
          <div className='content'>
            <SliceZone slices={page.data.slices} components={components} />
          </div>
          <div className='sidebar'>
            <PrismicRichText field={page.data.right_column_text}/>
          </div>
        </div>
        <div className='special page-end'>-_-_-_-_-_-_-_-_-_-_-_</div>
      </div>
    </>
  )
}

export default Home;

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getSingle("home", { lang: locale });
  const settings = await client.getSingle("settings", { lang: locale });

  return {
    props: {
      page,
      settings,
    },
  };
}