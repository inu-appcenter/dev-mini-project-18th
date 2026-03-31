import DateSection from "@/components/organisms/DateSection";
import DateContentSection from "../organisms/DateContentSection";

interface HeaderLayoutProps {
  isScrolled: boolean;
}
const HeaderLayout = ({ isScrolled }: HeaderLayoutProps) => {
  return (
    <div className="w-full flex flex-col items-center gap-2 py-10">
      <DateContentSection isScrolled={isScrolled} />
      {/*할 일 데이터를 서버로부터 가져오고 선택한 날짜의 일정표시 */}
      <DateSection />
    </div>
  );
};

export default HeaderLayout;
