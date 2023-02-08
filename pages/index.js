import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import { createClient } from "../prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "../slices";
import { PrismicRichText } from '@prismicio/react'

const Home = ({ page }) => {
  const colors = ['#ffff80', '#99a6d5', '#ff9800', '#f9d5e1', '#feca00', '#acf16a', '#85c5ed', '#009640']
  useEffect(() => {
    const number = Math.floor(Math.random() * colors.length);
    document.body.style.backgroundColor= colors[number];
    
  },[]);
  return (
    <>
      <Head>
        <title>Falsework</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='container'>
        <h1 className='special big'>{page.data.title}</h1>
        <div className='flex'>
          <div className='content'>
            <SliceZone slices={page.data.slices} components={components} />
            <div className='special page-end'>...........................................................................................................................................</div>
          </div>
          <div className='sidebar'>
            <PrismicRichText field={page.data.right_column_text}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getSingle("home", { lang: locale });

  return {
    props: {
      page,
    },
  };
}