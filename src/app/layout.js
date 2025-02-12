import "./globals.css";
import {Noto_Sans_KR} from "next/font/google";
// import localFont from 'next/font/local'
import ProviderWrapper from "@/app/ProviderWrapper";
import Footer from "@/components/main page/Footer";
import Header from "@/components/Header";

const mainFont = Noto_Sans_KR({
  weight: ['400', '500', '600'],
  style: 'normal',
  display: 'swap',
  variable: '--font-main',
  subsets: ['latin']
})

// const heroMain = localFont(
//   {
//     src: [
//       {
//         path: '../../public/fonts/SpoqaHanSansNeo-Bold.woff2',
//         weight: '700',
//         style: 'normal'
//       }
//     ],
//     display: 'swap',
//     variable: '--font-spoqa-bold'
//   }
// )
//
// const heroSub = localFont(
//   {
//     src: [
//       {
//         path: '../../public/fonts/SpoqaHanSansNeo-Regular.woff2',
//         weight: '400',
//         style: 'normal'
//       }
//     ],
//     display: 'swap',
//     variable: '--font-spoqa-regular'
//   }
// )

export const metadata = {
  title: "Nossi.Dev",
  description: "Nossi.Dev coding test & developer community"
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({children}) {

  return (
    <html lang="ko" className="h-full">
      <link rel="icon" href="/logo.webp" sizes="any"/>
      <body className={`
          ${mainFont.variable} 
          
          font-mainFont
          font-normal
          h-full
        `}>
        <ProviderWrapper>
          <Header/>
          {children}
          <Footer/>
        </ProviderWrapper>
      </body>
    </html>
  );
}


