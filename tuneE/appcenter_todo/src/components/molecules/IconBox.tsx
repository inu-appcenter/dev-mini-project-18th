import { color } from "@/types/color";
import { Square, SquarePen, X } from "lucide-react";
import Link from "next/link";
const IconBox = () => {
  return (
    <div className="flex ">
      {/* 클릭 시 완료 상태로 변경되는 아이콘 */}
      {/* props drilling 때문에 고민중.. */}
      <button>
        <Square style={{ color: color["text-secondary"] }} />
      </button>
      <SquarePen style={{ color: color["text-secondary"] }} />
      <Link href={"./delete"}>
        <X style={{ color: color["text-secondary"] }} />
      </Link>
    </div>
  );
};

export default IconBox;
