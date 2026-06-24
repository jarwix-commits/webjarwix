import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "./components/LenisProvider";
import Loader from "./components/Loader";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://jarwix-agency.com'),
  title: "Jarwix — AI-Powered Growth Agency for Ambitious Businesses",
  description:
    "Jarwix is an AI-powered growth agency helping small-to-mid businesses dominate online — without the complexity. Marketing + automation + web — done right. Elevate with AI.",
  openGraph: {
    title: "Jarwix — AI-Powered Growth Agency",
    description:
      "AI-powered marketing for ambitious businesses. Elevate with AI.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Loader />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
