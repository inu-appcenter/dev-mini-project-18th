// 할 일 수정 페이지
// 기존의 데이터가 입력된 상태로 (폼에 채워진 상태로) 와져야 함
'use client';
import { ChevronLeft } from 'lucide-react';
import { TodoContentCategory } from '@/types/color';
import { useState } from 'react';
import FormField from '@/components/atoms/FromField';
import Link from 'next/link';

{
  /* 모든 폼을 다 채워야만 제출가능 및 버튼이 brand-color로 바뀜 */
}
const Page = () => {
  const [clickedCategory, setClickedCategory] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const changeCategoryContent = (content: TodoContentCategory) => {
    setClickedCategory(content);
  };
  // 폼 입력값 체크
  // 양 끝에 있는 공백(스페이스바, 엔터, 탭 등)을 모두 지워주는 trim() 문자열 함수 사용
  // ㄴ> 스페이스바만 누른 공백 입력 방지
  const isFormValid =
    content.trim() !== '' && date !== '' && clickedCategory !== '';
  return (
    <>
      <div className="scrollbar-hide h-dvh w-full overflow-y-auto">
        {/* max-w-103 = max-w-[412px] */}
        <div className="bg-bg-primary border-stroke-primary relative mx-auto flex h-full w-full max-w-103 flex-col border-x break-keep">
          {/* 할 일 추가 */}
          <section className="shadow-custom bg-bg-primary relative z-10 w-full">
            {/* '../' 상대경로에서 '/' 절대 경로로 수정 */}
            <Link href={'/'} prefetch={true}>
              <ChevronLeft className="text-text-primary absolute top-4.5 left-1 cursor-pointer" />
            </Link>

            <FormField title="할 일 수정" />
          </section>
          {/* 할 일 내용, 날짜, 카테고리 */}
          <section className="bg-bg-primary w-full">
            <FormField title="할 일 내용">
              <input
                type="text"
                className="text-text-secondary border-stroke-primary rounded-md border px-2 py-1 placeholder:text-[#8B8B8B] focus:ring-2 focus:outline-none"
                placeholder="할 일을 입력해주세요."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </FormField>
            <FormField title="날짜">
              <input
                type="date"
                className="text-text-secondary border-stroke-primary rounded-md border px-2 py-1 placeholder:text-[#8B8B8B] focus:ring-2 focus:outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </FormField>
            <FormField title="카테고리">
              <div className="flex gap-4">
                <button
                  onClick={() => changeCategoryContent('IMPORTANT')}
                  className={`${clickedCategory === 'IMPORTANT' ? 'bg-importantThing border-transparent text-white' : 'bg-bg-primary'} text-text-primary border-stroke-primary cursor-pointer rounded-xl border px-2 py-1`}
                >
                  중요한 일
                </button>
                <button
                  onClick={() => changeCategoryContent('MEETING')}
                  className={`${clickedCategory === 'MEETING' ? 'bg-meeting border-transparent text-white' : 'bg-bg-primary'} text-text-primary border-stroke-primary py-1text-text-primary cursor-pointer rounded-xl border px-2`}
                >
                  회의
                </button>
                <button
                  onClick={() => changeCategoryContent('STUDY')}
                  className={`${clickedCategory === 'STUDY' ? 'bg-study border-transparent text-white' : 'bg-bg-primary'} text-text-primary border-stroke-primary cursor-pointer rounded-xl border px-2 py-1`}
                >
                  스터디
                </button>
              </div>
            </FormField>
          </section>
          {/* 취소, 추가 */}
          <section className="flex w-full justify-end px-8">
            <div className="flex gap-2">
              <Link href="../" className="text-text-secondary px-4 py-1.5">
                취소
              </Link>
              {/* 클릭 시 서버로 요청을 보내고 메인화면으로 돌아감 */}
              <button
                disabled={!isFormValid}
                className={`${isFormValid ? 'bg-brand-color cursor-pointer border-transparent text-white' : 'bg-stroke-primary text-bg-primary cursor-not-allowed border-transparent'} rounded-md border px-4 py-1.5`}
              >
                추가
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Page;
<></>;
