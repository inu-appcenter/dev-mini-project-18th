import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // CORS 정책 임시로 우회하기 위한 proxy 설정
  // 배포 이후 백엔드에서 CORS 설정하면 해결됨
  // 클라이언트 컴포넌트에서 /todos/... 로 요청을 보내면 8080 포트로 바꿔서 서버 간 통신으로 간주할 수 있게 됨
  async rewrites() {
    return [
      {
        source: '/todos/:path*',
        destination: 'http://localhost:8080/todos/:path*',
      },
    ];
  },
  reactCompiler: true,
};

export default nextConfig;
