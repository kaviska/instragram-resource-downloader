"use client";
import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Script from "next/script";
import { useEffect, useState } from "react";
import { client } from "@/app/lib/sanity"; // Import the Sanity client

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [metaData, setMetaData] = useState({
    title: "Instagram Downloader - Download Instagram Reels, Posts, Videos & Carousels",
    description:
      "Download Instagram photos, videos, reels, and stories with SaveFromInsta. Fast, free, and easy-to-use Instagram video downloader with HD quality and no watermarks. No sign-up required.",
  });

  useEffect(() => {
    async function fetchMetaData() {
      let query = "";
      let queryParams = {};
      if (pathname === "/") {
        query = `*[_type == "containSection"][0]{metaTitle, metaDescription}`;
      }

      if (pathname === "/instagram-video-downloader") {
        query = `*[_type == "containSectionVideo"][0]{metaTitle, metaDescription}`;
      } else if (pathname === "/instagram-photo-downloader") {
        query = `*[_type == "containSectionPhoto"][0]{metaTitle, metaDescription}`;
      } else if (pathname === "/instagram-reel-downloader") {
        query = `*[_type == "containSectionReel"][0]{metaTitle, metaDescription}`;
      } else if (pathname === "/instagram-carousel-downloader") {
        query = `*[_type == "containSectionCarousel"][0]{metaTitle, metaDescription}`;
      } else if (pathname.startsWith("/blog/")) {
        const slug = pathname.split("/blog/")[1];
        query = `*[_type == "blog" && slug.current == $slug][0]{metaTitle, metaDescription}`;
        queryParams = { slug };
      }

      if (query) {
        const result = await client.fetch(query, queryParams);
        if (result) {
          setMetaData({
            title: result.metaTitle || metaData.title,
            description: result.metaDescription || metaData.description,
          });
        }
      }
    }

    fetchMetaData();
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        <link rel="apple-touch-icon" href="/apple-touch-icon-iphone-60x60.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-ipad-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-iphone-retina-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-ipad-retina-152x152.png" />

        {/* <!-- Google tag (gtag.js) --> */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Y7SQ80LMCJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-Y7SQ80LMCJ');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Nav />
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        <Footer />
      </body>
    </html>
  );
}