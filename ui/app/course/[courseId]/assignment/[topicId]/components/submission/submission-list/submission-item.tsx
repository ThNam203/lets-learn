"use client";
import { getGradeColor } from "@/app/course/[courseId]/quiz/[topicId]/components/static-data";
import Avatar from "@/components/ui/simple/avatar";
import { Input } from "@/lib/shadcn/input";
import { cn } from "@/lib/utils";
import {
  AssignmentResponseData,
  StudentResponse,
} from "@/models/student-response";
import { useEffect, useMemo, useState } from "react";

interface Props {
  assignmentResponse: StudentResponse;
  selected: boolean;
  onClick?: () => void;
  onInputChange?: (value: number) => void;
  onEnter?: () => void;
}
export default function SubmissionItem({
  assignmentResponse,
  selected,
  onClick,
  onInputChange,
  onEnter,
}: Props) {
  const hasMark = useMemo(() => {
    const { mark } = assignmentResponse.data as AssignmentResponseData;
    return !!mark;
  }, [assignmentResponse]);
  const [isEditting, setIsEditting] = useState(!hasMark);
  const { student } = assignmentResponse;
  const { mark } = assignmentResponse.data as AssignmentResponseData;
  const totalMark = 100;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (onInputChange) onInputChange(value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (onEnter) onEnter();
      setIsEditting(false);
    }
  };

  useEffect(() => {
    setIsEditting(selected);
  }, [selected]);

  return (
    <tr
      className={cn(
        "w-full flex flex-row whitespace-nowrap border-collapse cursor-pointer duration-200 ease-linear",
        selected ? "bg-cyan-50" : "hover:bg-gray-100"
      )}
      onClick={onClick}
    >
      <td className="flex-1 p-0 m-0">
        <div className="flex flex-row gap-4 items-center py-3 px-4 border-1">
          <Avatar />
          <span className="text-cyan-500 font-bold">{student.username}</span>
        </div>
      </td>
      <td className="p-0 m-0">
        <div
          className={cn(
            "h-full w-[80px] py-3 px-4 flex justify-center items-center font-bold border-1 text-gray-500 text-sm",
            mark && getGradeColor(mark, totalMark),
            isEditting && "text-gray-500"
          )}
        >
          {!isEditting && <span>{mark}</span>}
          {isEditting && (
            <div className="flex flex-row items-center">
              <Input
                max={totalMark}
                min={0}
                step={1}
                maxLength={totalMark.toString().length}
                defaultValue={mark || ""}
                className="h-fit w-[40px] bg-transparent border-0 border-b-[0.5px] rounded-none py-0 px-1 text-center"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
            </div>
          )}
          <span>{`/${totalMark}`}</span>
        </div>
      </td>
    </tr>
  );
}
