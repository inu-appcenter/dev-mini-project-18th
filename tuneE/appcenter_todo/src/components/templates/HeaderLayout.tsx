import DateSection from '@/components/organisms/DateSection';
import DateContentSection from '../organisms/DateContentSection';

interface HeaderLayoutProps {
  isScrolled: boolean;
}
const HeaderLayout = ({ isScrolled }: HeaderLayoutProps) => {
  return (
    <div className="flex w-full flex-col items-center gap-2 pt-10">
      <DateContentSection isScrolled={isScrolled} />
      <DateSection />
    </div>
  );
};

export default HeaderLayout;
