import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { ModalContainer } from "@/modals";

export const metadata: Metadata = {
  title: "Jordan Dexter | e Engineering and Web Development Portfolio",
  description: "These projects showcase not only my creativity, but also my experience working across multiple technologies each with a unique stack."
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
      <body className={`flex bg-background flex-col min-w-[375px] antialiased dark`}>
        <ModalContainer />
        <Header />
        {children}
      </body>
    </html>
  );
}
