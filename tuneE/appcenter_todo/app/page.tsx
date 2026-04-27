// 인증 성공 시 이 곳으로 리다이렉팅 (미들웨어 사용하여 인증여부 확인)
// 서버 컴포넌트
import SplashScreen from '@/components/interaction/SplashScreen';
import HomeClient from '@/components/client/HomeClient';
import { format } from 'date-fns';

export default async function Home() {
  const today = format(new Date(), 'yyyy-MM-dd');
  console.log(today);
  // 서버 컴포넌트에서 데이터를 fetch하여 마운트 이전에도 데이터 로딩 가능(SSR)
  // 서버 컴포넌트에서 서버로 보내는 fetch 요청은 CORS 정책에서 자유롭다
  // 생성순으로 정렬된 데이터를 백엔드로부터 받아온다.
  const response = await fetch(
    `https://todo-server.inuappcenter.kr/todos?sort=createdAt&date=${today}`,
    { cache: 'no-store' }
  );
  const Todos = await response.json();
  console.log('Todos:', Todos);

  return (
    // 웹 페이지 로딩 시 스플래시 화면을 보여주고, 1.2초 후에 실제 콘텐츠로 전환
    <SplashScreen>
      <HomeClient Todos={Todos}></HomeClient>
    </SplashScreen>
  );
}
