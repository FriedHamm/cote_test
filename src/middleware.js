import { NextResponse } from 'next/server';

export function middleware(request) {
  // 매 요청마다 새로운 nonce를 생성
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  // CSP 헤더 문자열을 생성하는데, 여기서 'nonce-${nonce}'를 삽입함.
  const cspHeader = `
  default-src 'self';
  script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  font-src 'self';
  connect-src 'self' https://nossidev.run.goorm.site;
  object-src 'none';
  media-src 'self';
  frame-src 'self';
  form-action 'self' https://nossidev.run.goorm.site https://*.kakao.com;
  base-uri 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
    .replace(/\s{2,}/g, ' ')
    .trim();

  // 기존 요청 헤더를 복제하여 nonce와 CSP 헤더를 추가
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  // 수정된 요청 헤더를 포함한 NextResponse 객체 생성
  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // 브라우저로 전달되는 응답 헤더에도 동일한 CSP 헤더를 명시적으로 설정
  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
}