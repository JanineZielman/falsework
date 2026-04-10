import Head from "next/head";
import { SliceZone, PrismicRichText } from "@prismicio/react";
import React, { useEffect } from 'react';
import * as prismic from "@prismicio/client";
import { createClient } from "../../prismicio";
import { components } from "../../slices";
import Layout from "@/components/layout";
import { PrismicNextImage } from "@prismicio/next";

import Slider from "react-slick";

const Page = ({ settings, page, menu, projectsInCategory }) => {
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
      document.body.style.backgroundColor = selectedColor || "#99a6d5";
    } else {
      document.body.style.backgroundColor = "#fff";
    }
  }, [page]);

  const sliderSettings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Prev / Next logic within same category
  const currentIndex = projectsInCategory.findIndex(p => p.uid === page.uid);
  const prevProject = currentIndex > 0 ? projectsInCategory[currentIndex - 1] : projectsInCategory[projectsInCategory.length - 1];
  const nextProject = currentIndex < projectsInCategory.length - 1 ? projectsInCategory[currentIndex + 1] : projectsInCategory[0];

  // Other projects in same category (exclude current)
  const otherProjects = projectsInCategory.filter(p => p.uid !== page.uid);

  return (
    <>
      <Head>
        <title>{settings.data.site_title}</title>
        <meta property="og:title" content={settings.data.site_title} />
        <meta name="description" content={settings.data.description} />
        <meta property="og:description" content={settings.data.description} />
        <meta property="og:image" content={settings.data.image.url} />
      </Head>

      <div className='container'>
        <Layout navigation={menu}>
          <div className='projects-slider'>
            <Slider className='slider' {...sliderSettings}>
              {page.data.images.map((item, i) => (
                <div className="slide" key={`slide${i}`}>
                  <PrismicNextImage field={item.image} alt="" />
                </div>
              ))}
            </Slider>
          </div>

          <div className="project">
            <h1 className='special'>{page.data.title}</h1>
            <h2>{page.data.subtitle}</h2>
            <div className='flex'>
              <div className='content about'>
                <SliceZone slices={page.data.slices} components={components} />
              </div>
              <div className='sidebar'>
                <PrismicRichText field={page.data.right_column_text} />
              </div>
            </div>

            {projectsInCategory.length > 1 && (
              <div className="project-navigation">
                <a href={`/project/${prevProject.uid}`}><img src="/arrow-left.svg" /></a>
                <a href={`/project/${nextProject.uid}`}><img src="/arrow-right.svg" /></a>
              </div>
            )}
          </div>

          {otherProjects.length > 0 && (
            <>
              <div className='special page-end'></div>
              <div className="grid all-projects">
                {otherProjects.map(p => (
                  <div key={p.id} className="grid-item">
                    <a href={`/project/${p.uid}`}>
                      <PrismicNextImage field={p.data.images[0].image} />
                      <p>{p.data.title}</p>
                    </a>
                  </div>
                ))}
              </div>
            </>
          )}
          <div className='special page-end page-end2'></div>
        </Layout>
      </div>
    </>
  );
};

export default Page;

export async function getStaticProps({ params, previewData, locale }) {
  const client = createClient({ previewData });

  // Current project
  const page = await client.getByUID("project", params.uid);

  // Settings and menu
  const settings = await client.getSingle("settings");
  const menu = await client.getSingle('menu', { lang: locale });

  // Projects in same category (only)
  const categoryId = page.data.categories[0].category.id;
  const projectsInCategory = await client.getAllByType("project", {
    predicates: [prismic.predicate.at("my.project.categories.category", categoryId)],
    lang: locale,
  });

  return {
    props: {
      page,
      settings,
      menu,
      projectsInCategory,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();
  const pages = await client.getAllByType("project");

  return {
    paths: pages.map(page => ({ params: { uid: page.uid } })),
    fallback: false,
  };
}