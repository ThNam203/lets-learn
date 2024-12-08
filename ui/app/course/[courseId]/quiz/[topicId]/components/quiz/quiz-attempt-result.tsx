import CustomDialog from "@/components/ui/custom-dialog";
import { Button } from "@/lib/shadcn/button";
import { cn, getDurationText } from "@/lib/utils";
import {
  getQuizResponseMark,
  getQuizResponseTotalMark,
  QuizResponseData,
  StudentResponse,
} from "@/models/student-response";
import { format } from "date-fns";
import React, { useMemo } from "react";

interface Props {
  responseIndex?: number;
  quizResponse: StudentResponse;
  onReview?: () => void;
  onRemove?: () => void;
}
const QuizAttemptResult = ({
  quizResponse,
  responseIndex,
  onReview,
  onRemove,
}: Props) => {
  const data = quizResponse.data as QuizResponseData;
  const { startedAt, completedAt, status } = data;
  const mark = useMemo(() => getQuizResponseMark(data), [data]);
  const totalMark = useMemo(() => getQuizResponseTotalMark(data), [data]);

  const duration = getDurationText(startedAt, completedAt) || 0;
  const formatDetailDate = (date: string) => {
    return format(new Date(date), "EEEE, dd MMMM yyyy, h:mm:ss a");
  };
  const isExcellentMark = mark >= totalMark * 0.8;
  const isGoodMark = mark >= totalMark * 0.4 && mark < totalMark * 0.8;
  const isBadMark = mark < totalMark * 0.4;

  const handleCancel = () => {};

  return (
    <div className="flex flex-col border rounded-lg">
      <div className="flex flex-row items-center justify-between px-4">
        {responseIndex !== undefined && (
          <h5 className="text-orange-500 py-2">{`Attempt ${
            responseIndex + 1
          }`}</h5>
        )}
        <div className="flex flex-row items-center gap-4">
          {onRemove && (
            <CustomDialog
              variant="warning"
              title={`Remove Attempt ${
                responseIndex !== undefined && responseIndex + 1
              }`}
              content={
                <span>{`Are you sure you want to remove this attempt ${
                  responseIndex !== undefined && responseIndex + 1
                }?`}</span>
              }
              onYes={onRemove}
              onCancel={handleCancel}
            >
              <Button
                variant="link"
                className="p-0 h-fit text-red-500 hover:text-red-600"
              >
                Remove
              </Button>
            </CustomDialog>
          )}
          {onReview && (
            <Button variant="link" className="p-0 h-fit" onClick={onReview}>
              Review
            </Button>
          )}
        </div>
      </div>
      <ResultRow title="Status">{status}</ResultRow>
      <ResultRow title="Started">{formatDetailDate(startedAt)}</ResultRow>
      <ResultRow title="Completed">{formatDetailDate(completedAt)}</ResultRow>
      <ResultRow title="Duration">{`${duration}`}</ResultRow>
      <ResultRow title="Mark">
        <span
          className={cn(
            "font-bold",
            isExcellentMark && "text-green-500",
            isGoodMark && "text-yellow-500",
            isBadMark && "text-red-500"
          )}
        >{`${mark} / ${totalMark}`}</span>
      </ResultRow>
    </div>
  );
};
interface ResultRowProps {
  title: string;
  children: React.ReactNode;
}
const ResultRow = ({ title, children }: ResultRowProps) => {
  return (
    <div className="flex flex-row items-center gap-3 py-2 px-4 odd:bg-gray-100 hover:bg-gray-50">
      <span className="font-semibold max-w-[150px] w-1/2">{title}</span>
      <p className="text-slate-600 text-sm">{children}</p>
    </div>
  );
};

export default QuizAttemptResult;
