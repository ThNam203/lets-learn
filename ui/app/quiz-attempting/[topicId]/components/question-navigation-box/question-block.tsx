import { QuestionResult } from "@/app/course/[courseId]/quiz/[topicId]/components/static-data";
import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  questionIndex: number;
  isFlagged?: boolean;
  hasAnswered?: boolean;
  questionResult?: QuestionResult;
  onClick?: () => void;
}
const QuestionBlock = ({
  questionIndex,
  isFlagged,
  hasAnswered,
  questionResult,
  onClick,
}: Props) => {
  return (
    <div
      className={cn(
        "relative w-8 h-8 rounded-md overflow-hidden flex items-center justify-center bg-slate-100 text-slate-400 hover:bg-slate-200 transition-all duration-200 cursor-pointer",
        questionResult !== QuestionResult.NOT_SHOW && "bg-white",
        questionResult === QuestionResult.NOT_SHOW &&
          hasAnswered &&
          "bg-cyan-500 text-white hover:bg-cyan-600",
        questionResult === QuestionResult.FULL_MARK &&
          "border-1 border-green-500 text-green-500 hover:bg-green-50",
        (questionResult === QuestionResult.ZERO_MARK ||
          questionResult === QuestionResult.PARTIAL_MARK) &&
          "border-1 border-red-500 text-red-500 hover:bg-red-50",
        questionResult !== QuestionResult.NOT_SHOW &&
          !hasAnswered &&
          "border-1 border-yellow-500 text-yellow-500 hover:bg-yellow-50"
      )}
      onClick={onClick}
    >
      {questionIndex + 1}
      <div
        className={cn(
          "absolute -top-1/4 -right-1/4 w-4 h-4 rotate-45 bg-red-600 transition-all duration-200 opacity-0 pointer-events-none",
          isFlagged && "opacity-100"
        )}
      />
    </div>
  );
};

export default QuestionBlock;
