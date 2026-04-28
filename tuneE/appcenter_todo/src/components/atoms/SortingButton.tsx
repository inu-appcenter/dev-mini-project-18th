import { ChevronDown, ChevronUp } from 'lucide-react';

interface SortingButtonProps {
  isUpperSorted?: boolean;
  handleSorting?: () => void;
}

const SortingButton = ({
  isUpperSorted,
  handleSorting,
}: SortingButtonProps) => {
  return (
    <div className="relative flex h-19 w-full justify-end pr-3">
      <div className="border-stroke-primary flex items-center">
        {/* ml-[290px] = ml-72.5 */}
        <button
          className="text-text-secondary font-SemiBold bg-bg-primary right-4 mr-6 ml-72.5 flex items-center text-sm"
          onClick={handleSorting}
        >
          생성순
          {isUpperSorted ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
    </div>
  );
};

export default SortingButton;
