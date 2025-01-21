import "./globals.css";
import {Noto_Sans_KR} from "next/font/google";
import localFont from 'next/font/local'
import Header from "@/components/Header";
import {cookies} from "next/headers";

const mainFont = Noto_Sans_KR({
  weight: ['400', '500', '600'],
  style: 'normal',
  display: 'swap',
  variable: '--font-main',
  subsets: ['latin']
})

const heroMain = localFont(
  {
    src: [
      {
        path: '../../public/fonts/SpoqaHanSansNeo-Bold.woff2',
        weight: '700',
        style: 'normal'
      }
    ],
    display: 'swap',
    variable: '--font-spoqa-bold'
  }
)

const heroSub = localFont(
  {
    src: [
      {
        path: '../../public/fonts/SpoqaHanSansNeo-Regular.woff2',
        weight: '400',
        style: 'normal'
      }
    ],
    display: 'swap',
    variable: '--font-spoqa-regular'
  }
)

export const metadata = {
  title: "Nossi.Dev",
  description: "Nossi.Dev coding test & developer community"
};

export default function RootLayout({children}) {
  const cookie = cookies();
  console.log(cookie);
  return (
    <html lang="en" className="">
      <link rel="icon" href="/logo.webp" sizes="any"/>
      <body className={`
          ${mainFont.variable} 
          ${heroMain.variable} 
          ${heroSub.variable}
          font-mainFont
          font-normal
        `}>
        <Header/>
        {children}
      </body>
    </html>
  );
}
