import Head from "next/head";
import { PrismicLink, SliceZone } from "@prismicio/react";
import React, { useState, useEffect } from 'react';
import * as prismicH from "@prismicio/helpers";
import Link from "next/link";

import { createClient } from "../prismicio";
import { components } from "../slices";
import { PrismicRichText } from '@prismicio/react'
import Layout from "@/components/layout";
import { PrismicNextImage } from "@prismicio/next";


const Page = ({ settings, page, menu, news }) => {
  const colors = {
    yellow: "#ffff80",
    lila: "#99a6d5",
    orange: "#ff9800",
    pink: "#f9d5e1",
    gold: "#feca00",
    lime: "#acf16a",
    blue: "#85c5ed",
  };
  useEffect(() => {
    if (page.uid !== "ricordi-di-venetia") {
      const selectedColor = colors[page.data.color] ?? "#99a6d5";
      document.body.style.backgroundColor = selectedColor || "#fff";
    } else {
      document.body.style.backgroundColor = "#fff";
    }
  }, [page]);

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
              <p className="news-link">
                <Link href="/news">Meer nieuws</Link>
              </p>
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
    pageSize: 3,
    orderings: {
      field: 'my.news.date',
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
