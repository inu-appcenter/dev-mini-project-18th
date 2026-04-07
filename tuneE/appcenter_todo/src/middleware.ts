// 로그인 인증 관련 생성형 ai 답변 결과..

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. 사용자의 브라우저 쿠키에서 로그인 토큰(인증서)을 꺼내옵니다.
  // (실제 프로젝트에서 사용하는 토큰 이름으로 변경하세요. 예: 'jwt', 'accessToken')
  const token = request.cookies.get('accessToken')?.value;

  // 2. 사용자가 지금 접속하려고 하는 URL 경로를 파악합니다.
  const path = request.nextUrl.pathname;

  // 3. 로그인을 안 한 상태(토큰 없음)
  if (!token) {
    // 로그인/회원가입 페이지가 아닌 다른 페이지(메인, add, amend 등)로 가려고 하면
    if (path !== '/login' && path !== '/signup') {
      // 로그인 페이지로 강제 이동시킵니다.
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 4. 이미 로그인을 한 상태(토큰 있음)
  if (token) {
    // 또 굳이 로그인/회원가입 페이지로 들어가려고 하면
    if (path === '/login' || path === '/signup') {
      // 메인 페이지('/')로 쫓아냅니다.
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // 5. 위 조건에 해당하지 않으면 원래 가려던 길을 그대로 통과시킵니다.
  return NextResponse.next();
}

// 💡 보너스: 미들웨어를 거칠 URL 경로만 콕 집어서 지정해 줍니다.
// (이미지 폰트, API 요청 등 불필요한 곳에서는 안 돌게 해서 성능을 높입니다)
export const config = {
  matcher: ['/', '/login', '/signup', '/add/:path*', '/amend/:path*'],
};
