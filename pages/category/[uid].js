import Head from "next/head";
import React, { useEffect } from 'react';
import * as prismic from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { components } from "../../slices";
import { createClient } from "../../prismicio";
import Layout from "@/components/layout";
import { PrismicNextImage } from "@prismicio/next";
import Link from "next/link";

const Page = ({ settings, page, menu, projects }) => {
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
          <SliceZone slices={page.data.slices} components={components} />
          <div className={`grid ${page.uid}`}>
            {projects.map((item, i) => {
              return (
                <div className="grid-item">
                  <Link href={`/project/${item.uid}`}>
                    <PrismicNextImage field={item.data.images[0].image} />
                    <p>{item.data.title}</p>
                  </Link>
                </div>
              )
            })}
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

  const page = await client.getByUID("category", params.uid);
  const settings = await client.getSingle("settings");
  const menu = await client.getSingle('menu', { lang: locale });
  const projects = await client.getAllByType("project", {
    orderings: {
      field: 'my.project.date',
      direction: 'desc'
    },
    predicates: [
      prismic.predicate.at(
        "my.project.categories.category",
        page.id
      ),
    ],
    lang: locale,
  });
  return {
    props: {
      page,
      settings,
      menu,
      projects
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType("category");

  return {
    paths: pages.map((page) => {
      return {
        params: { uid: page.uid },
      };
    }),
    fallback: false,
  };
}
