'use client';

import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { usePathname } from "next/navigation";

export default function Layout({ children, navigation }) {
  const pathname = usePathname();

  return (
    <>
      <div className='header'>
        <h1 className='special big'>
          <a href="/">{navigation.data.title}</a>
        </h1>

        <div className="menu">
          {navigation.data.link.map((item, i) => {
            const isActive =
              pathname === item.url ||
              pathname.startsWith(item.url + "/");

            return (
              <PrismicNextLink
                key={`menu${i}`}
                field={item}
                className={`menu-item ${isActive ? "active" : ""}`}
              >
                {item.text}
              </PrismicNextLink>
            );
          })}
        </div>
      </div>

      {children}

      <footer>
        <PrismicRichText field={navigation.data.footer} />
      </footer>
    </>
  );
}