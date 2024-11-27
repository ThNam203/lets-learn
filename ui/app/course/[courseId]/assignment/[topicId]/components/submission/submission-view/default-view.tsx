import React from "react";
import Part from "../part";
import { StudentResponse } from "@/models/student-response";
import { Test } from "@/models/quiz";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import EditorDisplay from "@/lib/tinymce/editor-display";
interface Props {
  className?: string;
  assignment: Test;
  studentResponses: StudentResponse[];
}
export default function SubmissionDefaultView({
  assignment,
  studentResponses,
  className,
}: Props) {
  const { data, name, description, open, close } = assignment;

  const openTime = format(new Date(open.value), "EEEE, dd MMMM yyyy, h:mm a");
  const closeTime = format(new Date(close.value), "EEEE, dd MMMM yyyy, h:mm a");
  return (
    <div className={cn(className)}>
      <div className="pb-4 space-y-2 border-b-[0.5px] border-gray-400 text-gray-800">
        <p>
          <span className="font-bold">Open: </span>
          <span className="text-gray-500">{openTime}</span>
        </p>
        <p>
          <span className="font-bold">Close: </span>
          <span className="text-gray-500">{closeTime}</span>
        </p>
      </div>

      <Part title="Status">
        <div className="flex flex-row">
          <div className="flex flex-col pr-3 border-r-1 border-gray-400">
            <span className="font-bold text-xl">36</span>
            <span className="text-gray-500">Submitted</span>
          </div>
          <div className="flex flex-col px-3">
            <span className="font-bold text-xl">40</span>
            <span className="text-gray-500">Assigned</span>
          </div>
        </div>
      </Part>

      <Part title="Assignment" className="gap-0">
        <EditorDisplay className="text-gray-500" htmlString={description} />
      </Part>
    </div>
  );
}
