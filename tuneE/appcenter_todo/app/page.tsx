// 인증 성공 시 이 곳으로 리다이렉팅 (미들웨어 사용하여 인증여부 확인)
// 서버 컴포넌트
import HomeClient from '@/components/client/HomeClient';

export default async function Home() {
  // 서버 컴포넌트에서 데이터를 fetch하여 마운트 이전에도 데이터 로딩 가능(SSR)
  // 서버 컴포넌트에서 보내는 서버로 보내는 fetch 요청은 CORS 정책에서 자유롭다
  // 서버 URL 수정예정
  const response = await fetch('http://localhost:8080/todos');
  const Todos = await response.json();
  console.log('Todos:', Todos);

  return <HomeClient Todos={Todos}></HomeClient>;
}
