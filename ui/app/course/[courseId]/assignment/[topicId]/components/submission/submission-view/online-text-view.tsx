import EditorDisplay from "@/lib/tinymce/editor-display";
import { cn } from "@/lib/utils";
import {
  AssignmentOnlineText,
  AssignmentResponseData,
  StudentResponse,
} from "@/models/student-response";
import { Test } from "@/models/quiz";
import React from "react";
import Part from "../part";
interface Props {
  className?: string;
  studentResponse: StudentResponse;
  children?: React.ReactNode;
}
export default function SubmissionOnlineTextView({
  studentResponse,
  className,
  children,
}: Props) {
  const { submitted } = studentResponse.data as AssignmentResponseData;
  const { text } = submitted as AssignmentOnlineText;
  return (
    <Part title="Online text submitted" className={cn("gap-0", className)}>
      <EditorDisplay className="text-gray-500" htmlString={text} />
    </Part>
  );
}
