import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import { createClient } from "../prismicio";
import { PrismicLink, SliceZone } from "@prismicio/react";
import { components } from "../slices";
import { PrismicRichText } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next';
import Layout from '@/components/layout';
import Slider from "react-slick";



const Home = ({ page, settings, menu }) => {
  const colors = ['#ffff80', '#99a6d5', '#ff9800', '#f9d5e1', '#feca00', '#acf16a', '#85c5ed']
  useEffect(() => {
    const number = Math.floor(Math.random() * colors.length);
    document.body.style.backgroundColor = colors[number];
  }, []);

  const startSlide = Math.floor(Math.random() * page.data.projects.length);

  var settingsSlider = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: startSlide,
  };

  return (
    <>
      <Head>
        <title>{settings.data.site_title}</title>
        <meta property="og:title" content={settings.data.site_title} />
        <meta name="description" content={settings.data.description} />
        <meta property="og:description" content={settings.data.description}></meta>
        <meta property="og:image" content={settings.data.image.url} />
      </Head>
      <div className='container' id="top">
        <Layout navigation={menu}>
          <div className='projects-slider'>
            <Slider className='slider' {...settingsSlider}>
              {page.data.projects.map((item, i) => {
                return (
                  <a href={`/project/${item.project.uid}`} className="slide" key={`slide${i}`}>
                    <PrismicNextImage field={item.project.data.images[0].image} alt=""></PrismicNextImage>
                    <h2 className='special'>
                      {item.project.data.title}
                    </h2>
                  </a>
                )
              })}

            </Slider>
          </div>
          <div className='special page-end'></div>
          <section className='big-intro special'>
            <PrismicRichText field={page.data.intro} />
          </section>
          <div className='special page-end page-end3'></div>
        </Layout>
      </div>
    </>
  )
}

export default Home;

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getSingle("home", {
    lang: locale,
    fetchLinks: `project.title, project.subtitle, project.images, project.images_caption`

  });
  const settings = await client.getSingle("settings", { lang: locale });
  const menu = await client.getSingle('menu', { lang: locale });

  return {
    props: {
      page,
      settings,
      menu
    },
  };
}