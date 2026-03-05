import Head from "next/head";
import { PrismicLink, SliceZone } from "@prismicio/react";
import React, { useState, useEffect } from 'react';
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { components } from "../slices";
import { PrismicRichText } from '@prismicio/react'
import Layout from "@/components/layout";
import { PrismicNextImage } from "@prismicio/next";


const Page = ({ settings, page, menu, news }) => {
  const colors = ['#ffff80', '#99a6d5', '#ff9800', '#f9d5e1', '#feca00', '#acf16a', '#85c5ed']
  useEffect(() => {
    const number = Math.floor(Math.random() * colors.length);
    if (page.uid != "ricordi-di-venetia") {
      document.body.style.backgroundColor = colors[number];
    } else {
      document.body.style.backgroundColor = '#fff';
    }
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
        <Layout navigation={menu}>
          <div className='flex'>
            <div className='content about'>
              <SliceZone slices={page.data.slices} components={components} />
            </div>
            <div className='sidebar'>
              {news.map((item, i) => {
                return (
                  <div className="news-item" key={`news${i}`}>
                    <PrismicNextImage field={item.data.image} />
                    <h2>{item.data.title}</h2>
                    <PrismicRichText field={item.data.text} />
                  </div>
                )
              })}
              {/* <PrismicRichText field={page.data.right_column_text} /> */}
            </div>
          </div>
          <div className='special page-end'></div>
        </Layout>
      </div>
    </>
  );
};

export default Page;

export async function getStaticProps({ params, previewData, locale }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("page", params.uid);
  const settings = await client.getSingle("settings");
  const menu = await client.getSingle('menu', { lang: locale });
  const news = await client.getAllByType('news', {
    lang: locale,
    orderings: {
      field: 'my.news.title',
      direction: 'desc'
    }
  });

  return {
    props: {
      page,
      settings,
      menu,
      news
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
