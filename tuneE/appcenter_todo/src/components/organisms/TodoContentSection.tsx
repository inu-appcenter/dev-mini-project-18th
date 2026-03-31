import { testData } from "@/dummy/testData";
import TodoContent from "../molecules/TodoContent";
const TodoContentSection = () => {
  return (
    <div className="w-full">
      {testData.map((v) => (
        <TodoContent key={v.id} title={v.title} />
      ))}
    </div>
  );
};

export default TodoContentSection;
