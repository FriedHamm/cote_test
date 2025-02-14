import "./globals.css";
import {Noto_Sans_KR} from "next/font/google";
// import localFont from 'next/font/local'
import ProviderWrapper from "@/app/ProviderWrapper";
import Footer from "@/components/main page/Footer";
import Header from "@/components/Header";
import AlertContainer from "@/components/alerts/AlertContainer";

export const dynamic = "force-dynamic";

const mainFont = Noto_Sans_KR({
  weight: ['400', '500', '600'],
  style: 'normal',
  display: 'swap',
  variable: '--font-main',
  subsets: ['latin']
})

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
          <AlertContainer/>
          <Header/>
          {children}
          <Footer/>
        </ProviderWrapper>
      </body>
    </html>
  );
}


