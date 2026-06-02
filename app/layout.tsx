import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "./components/LenisProvider";
import Loader from "./components/Loader";

export const metadata: Metadata = {
  title: "Jarwix — AI-Powered Growth Agency for Ambitious Businesses",
  description:
    "Jarwix is an AI-powered growth agency helping small-to-mid businesses dominate online — without the complexity. Marketing + automation + web — done right. Elevate with AI.",
  openGraph: {
    title: "Jarwix — AI-Powered Growth Agency",
    description:
      "AI-powered marketing for ambitious businesses. Elevate with AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
