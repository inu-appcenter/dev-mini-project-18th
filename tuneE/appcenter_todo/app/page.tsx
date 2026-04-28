// 인증 성공 시 이 곳으로 리다이렉팅 (미들웨어 사용하여 인증여부 확인)
// 서버 컴포넌트
import SplashScreen from '@/components/interaction/SplashScreen';
import HomeClient from '@/components/client/HomeClient';
import { format } from 'date-fns';

export default async function Home() {
  const today = format(new Date(), 'yyyy-MM-dd');

  return (
    // 웹 페이지 로딩 시 스플래시 화면을 보여주고, 0.8초 후에 실제 콘텐츠로 전환
    <SplashScreen>
      <HomeClient />
    </SplashScreen>
  );
}
