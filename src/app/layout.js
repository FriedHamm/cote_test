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
  title: {
    default: 'Nossi.Dev',
    template: '%s - Nossi.Dev',
  },
  description: "Nossi.Dev는 개발자들을 위한 종합 플랫폼으로, 코딩테스트 연습과 커뮤니티를 통해 취업 및 이직 준비를 돕습니다. 최신 문제 풀이, 심도 있는 토론, 그리고 전문가 조언을 통해 여러분의 커리어를 한 단계 업그레이드하세요.",
  openGraph: {
    title: 'Nossi.Dev',
    description: "Nossi.Dev는 개발자들을 위한 종합 플랫폼으로, 코딩테스트 연습과 커뮤니티를 통해 취업 및 이직 준비를 돕습니다. 최신 문제 풀이, 심도 있는 토론, 그리고 전문가 조언을 통해 여러분의 커리어를 한 단계 업그레이드하세요.",
    url: 'https://cote.nossi.dev',
    siteName: 'Nossi.Dev',
    images: [
      {
        url: 'https://cote.nossi.dev/logo.webp',
        width: 1200,
        height: 630,
        alt: 'Nossi.Dev 로고'
      }
    ],
    locale: 'ko_KR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nossi.Dev',
    description: "Nossi.Dev는 개발자들을 위한 종합 플랫폼으로, 코딩테스트 연습과 커뮤니티를 통해 취업 및 이직 준비를 돕습니다. 최신 문제 풀이, 심도 있는 토론, 그리고 전문가 조언을 통해 여러분의 커리어를 한 단계 업그레이드하세요.",
    images: ['https://cote.nossi.dev/logo.webp'],
  },
  applicationName: 'Nossi.Dev',
  authors: [
    { name: 'Fried hamn', url: 'https://cote.nossi.dev' }
  ],

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


