import { ChevronDown, ChevronUp } from "lucide-react";
import { color } from "@/types/color";

interface SortingButtonProps {
  isUpperSorted?: boolean;
  handleSorting?: () => void;
}

const SortingButton = ({
  isUpperSorted,
  handleSorting,
}: SortingButtonProps) => {
  return (
    <div className="flex justify-end w-full">
      <button
        className="flex items-center right-4 text-sm mr-6"
        style={{ color: color["text-secondary"] }}
        onClick={handleSorting}
      >
        생성순
        {isUpperSorted ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
    </div>
  );
};

export default SortingButton;
