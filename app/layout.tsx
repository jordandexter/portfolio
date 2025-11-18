import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Jordan Dexter | Web Development Portfolio",
};


const gtmScript2 = `window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

gtag('config', 'G-VL52QLRR5K');`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-VL52QLRR5K" />
        <script dangerouslySetInnerHTML={{ __html: gtmScript2 }} />
      </head>
      <body className={`flex bg - background flex - col min - w - [375px] antialiased hidden`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
