import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Jordan Dexter | Web Development Portfolio",
};

export const gtmScriptHead = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-VL52QLRR5K"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-VL52QLRR5K');
</script>`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: gtmScriptHead }} />
      </head>
      <body
        className={`flex bg-background flex-col min-w-[375px] antialiased hidden`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
