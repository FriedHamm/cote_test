import { NextResponse } from 'next/server'

export function middleware() {
  console.log('[middleware] >>> RUNNING');
  // 나중에 필요하면 적용할 것
  // 보통 외부 script나 이미지에 nonce를 적용해서 보안을 강화하기 위함
  // const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  // default-src, img-src, form-action은 백엔드도 허용해야 함
  // strict-dynamic은 고민해봐야할듯
  // 나중에 blob을 사용해야 할 일이 생길 수도 있음. blob을 사용하면, 미리보기 기능같은 거?.. 그런게 가능함. 혹은... 브라우저에서의 작업물을 파일로 만들어줄때나?..
  const cspHeader = `
    default-src 'self';
    script-src 'self';
    style-src 'self';
    img-src 'self';
    connect-src 'self' https://nossidev.run.goorm.site;
    font-src 'self';
    object-src 'self';
    media-src 'self';
    frame-src 'self';
    worker-src 'self';
    manifest-src 'self';
    base-uri 'self';
    form-action 'self' https://nossidev.run.goorm.site;
    frame-ancestors 'self';
    upgrade-insecure-requests;
  `

  // Clean up the CSP header
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()

  const response = NextResponse.next()

  // Set the CSP header on the response
  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )

  return response
}

// config는 나중에 필요하면 적용할 것
// 지금은 모든 요청에 대해서 미들웨어 실행