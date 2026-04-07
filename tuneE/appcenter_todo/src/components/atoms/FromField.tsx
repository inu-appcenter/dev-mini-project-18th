import { ReactNode } from 'react';

interface FormFieldProps {
  title: string;
  children?: ReactNode; // 어떤 리액트 요소든 다 받을 수 있도록
}

export default function FormField({ title, children }: FormFieldProps) {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-1 py-4">
      <label className="text-text-primary px-8 text-lg font-bold">
        {title}
      </label>
      {children && <div className="w-full px-8">{children}</div>}
    </div>
  );
}
