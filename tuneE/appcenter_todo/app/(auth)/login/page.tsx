// login 페이지
'use client';

const Page = () => {
  return (
    // h-[100dvh] = h-dvh
    <div className="scrollbar-hide relative h-dvh w-full overflow-y-auto">
      {/* max-w-103 = max-w-[412px] */}
      <div className="bg-bg-primary border-stroke-primary relative mx-auto flex min-h-full w-full max-w-103 flex-col border-x break-keep">
        로그인 페이지
      </div>
    </div>
  );
};
export default Page;
