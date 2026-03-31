import { color } from "../../types/color";
interface TextBoxProps {
  title: string;
}

const TextBox = (props: TextBoxProps) => {
  return (
    <>
      <p
        className="text-lg font-bold leading-7 py-6"
        style={{ color: color["text-primary"] }}
      >
        {props.title}
      </p>
    </>
  );
};

export default TextBox;
