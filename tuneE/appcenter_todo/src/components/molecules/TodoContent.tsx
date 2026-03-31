import { TestData } from "@/dummy/testData";
import TextBox from "../atoms/TextBox";
import IconBox from "./IconBox";

interface TodoContentProps extends Pick<TestData, "title"> {
  title: string;
}

const TodoContent = (props: TodoContentProps) => {
  return (
    <div className="flex justify-between items-center px-8">
      <div className="flex gap-5 justify-center items-center ">
        {/* 할 일 제목 */}
        <TextBox title={props.title} />
      </div>
      {/* 완료 전/후, 수정, 삭제 아이콘 */}
      <div className="flex justify-end">
        <IconBox />
      </div>
    </div>
  );
};

export default TodoContent;
