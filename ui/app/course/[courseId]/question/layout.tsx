import React from "react";

interface Props {
  children?: React.ReactNode | React.ReactNode[];
}
export default function QuestionLayout({ children }: Props) {
  return <div className="w-full h-full p-5 default-scrollbar">{children}</div>;
}
