import { color } from "@/types/color";
import { ReactNode } from "react";

interface FormFieldProps {
  title: string;
  children?: ReactNode; // 어떤 리액트 요소든 다 받을 수 있도록
}

export default function FormField({ title, children }: FormFieldProps) {
  return (
    <div className="flex flex-col justify-center items-start gap-1 w-full py-4">
      <label
        className="px-8 text-lg font-bold "
        style={{ color: color["text-primary"] }}
      >
        {title}
      </label>
      {children && <div className="w-full px-8">{children}</div>}
    </div>
  );
}
