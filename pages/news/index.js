import Head from "next/head";
import React, { useEffect } from "react";
import { createClient } from "../../prismicio";
import Layout from "@/components/layout";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

const NewsIndex = ({ settings, menu, news }) => {
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
    document.body.style.backgroundColor = colors.lila;
  }, []);

  return (
    <>
      <Head>
        <title>{settings.data.site_title}</title>
        <meta property="og:title" content={settings.data.site_title} />
        <meta name="description" content={settings.data.description} />
        <meta property="og:description" content={settings.data.description} />
        <meta property="og:image" content={settings.data.image.url} />
      </Head>
      <div className="container">
        <Layout navigation={menu}>
          <div className="grid ontwerp">
            {news.map((item, i) => {
              return (
                <div className="grid-item" key={`news${i}`}>
                  <PrismicNextImage field={item.data.image} />
                  <h2>{item.data.title}</h2>
                  <PrismicRichText field={item.data.text} />
                </div>
              );
            })}
          </div>
          <div className="special page-end"></div>
        </Layout>
      </div>
    </>
  );
};

export default NewsIndex;

export async function getStaticProps({ previewData, locale }) {
  const client = createClient({ previewData });

  const settings = await client.getSingle("settings", { lang: locale });
  const menu = await client.getSingle("menu", { lang: locale });
  const news = await client.getAllByType("news", {
    lang: locale,
    orderings: {
      field: "my.news.date",
      direction: "desc",
    },
  });

  return {
    props: {
      settings,
      menu,
      news,
    },
  };
}