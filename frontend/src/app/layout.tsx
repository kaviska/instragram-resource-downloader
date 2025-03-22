"use client";
import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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
  let title =
    "Instagram Downloader - Download Instagram Reels, Posts, Videos & Carousels ";
  let description =
    "Download Instagram photos, videos, reels, and stories with SaveFromInsta. Fast, free, and easy-to-use Instagram video downloader with HD quality and no watermarks. No sign-up required.";

  // Modify metadata based on pathname
  if (pathname === "/instagram-video-downloader") {
    title = "Instagram Video Downloader – Download Instagram Videos in HD ";
    description =
      "Easily download Instagram videos in HD using SaveFromInsta’s Instagram video downloader. Fast, secure, and free - download your favorite IG videos in MP4 format with no watermarks.";
  } else if (pathname === "/instagram-photo-downloader") {
    title = "Instagram Photo Downloader – Download Instagram Photos in HD";
    description =
      "Download Instagram photos in high resolution with SaveFromInsta’s Instagram photo downloader. Get HD-quality images with no watermarks, fast and free. Copy IG post the link and download. Fast and easy.";
  } else if (pathname === "/instagram-reel-downloader") {
    title = "Instagram Reel Downloader – Download Instagram Reels in HD";
    description =
      "Download Instagram reels in HD with SaveFromInsta’s Instagram reel downloader. Fast, free, and without watermarks. Save your favorite reels to your device in just a few clicks. No sign-up required.";
  } else if (pathname === "/instagram-carousel-downloader") {
    title =
      "Instagram Carousel Downloader - Download Instagram Carousels in HD";
    description =
      "Save Instagram carousel posts in HD with SaveFromInsta’s carousel downloader. Easily download multiple images or videos from carousel posts without watermarks, fast and free!";
  }

  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex, nofollow" />
        <title>{title}</title>
        <meta name="description" content={description} />
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
