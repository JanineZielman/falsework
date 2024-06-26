import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import { createClient } from "../prismicio";
import { PrismicLink, SliceZone } from "@prismicio/react";
import { components } from "../slices";
import { PrismicRichText } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Home = ({ page, settings }) => {
  const colors = ['#ffff80', '#99a6d5', '#ff9800', '#f9d5e1', '#feca00', '#acf16a', '#85c5ed']
  useEffect(() => {
    const number = Math.floor(Math.random() * colors.length);
    document.body.style.backgroundColor= colors[number];
  },[]);

  var settingsSlider = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
      if (document.body.scrollHeight -  window.innerHeight <= window.pageYOffset + 100){
        document.getElementById('arrow').style.transform = 'rotateZ(180deg)';
        document.getElementById('arrow').style.bottom = '100px';
      } 
      else{
        document.getElementById('arrow').style.transform = 'rotateZ(0deg)';
        document.getElementById('arrow').style.bottom = '25px';
      }
  };

  function scrollTo(){
    const position = window.pageYOffset;
    setScrollPosition(position);
    for (let i = 0; i < document.getElementsByClassName('project').length; i++) {
      if(document.getElementsByClassName('project')[i].offsetTop - 200 < scrollPosition + document.getElementsByClassName('project')[0].offsetTop){
        if (document.body.scrollHeight -  window.innerHeight > window.pageYOffset + 124){
          window.scrollTo({
            top: document.getElementsByClassName('project')[i].offsetTop,
            behavior: 'smooth'
          });
        } else {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      
      }
    }
  }

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
      <div className='container' id="top">
        <div className='menu'>
          {page.data.menu.map((item, i) => {
            return(
              <a key={`menu${i}`} className='special' href={item.link.uid}>{item.label}</a>
            )
          })}
        </div>
        <h1 className='special big'>{page.data.title}</h1>
        <section className='big-intro special'>
          <PrismicRichText field={page.data.intro}/>
        </section>
       
          {page.data.projects.map((item, i ) => {
            return(
              <div className='project' id={`project${i}`} key={`project${i}`}>
                <Slider className='slider' {...settingsSlider}>
                  {item.project.data.images.map((img, j) => {
                    return(
                      <div className="slide" key={`slide${j}`}>
                        <PrismicNextImage field={img.image} alt=""></PrismicNextImage>
                      </div> 
                    )
                  })}
                </Slider>
                <div className='info'>
                  <h2 className='special'>
                    {item.project.data.title}
                    <span className='special subtitle'>{item.project.data.subtitle}</span>
                  </h2>
                  
                  <div className='caption'>
                    <PrismicRichText field={item.project.data.images_caption}/>
                  </div>
                </div>
              </div>
            )
          })}
        <div id="arrow" className='arrow-down' onClick={scrollTo}></div>
        <div className='special page-end'>-_-_-_-_-_-_-_-_-_-_-_</div>
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

  return {
    props: {
      page,
      settings,
    },
  };
}