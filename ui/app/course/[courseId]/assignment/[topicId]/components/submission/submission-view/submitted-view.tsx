import { cn, getDurationText } from "@/lib/utils";
import {
  AssignmentResponseData,
  StudentResponse,
} from "@/models/student-response";
import { format } from "date-fns";
import React from "react";
import { SubmissionStatus } from "../static-data";
import SubmissionFileUploadView from "./file-upload-view";
import { AssignmentTopic } from "@/models/topic";
interface Props {
  className?: string;
  assignment: AssignmentTopic;
  studentResponse: StudentResponse;
}
export default function SubmissionSubmittedView({
  assignment,
  studentResponse,
  className,
}: Props) {
  const { data } = assignment;
  const { close } = data;
  const { submittedAt } = studentResponse.data as AssignmentResponseData;

  const compareTime = (date1: Date, date2: Date) => {
    if (date1.getTime() > date2.getTime()) return 1;
    if (date1.getTime() < date2.getTime()) return -1;
    return 0;
  };

  let submittedTime = "";
  let submissionStatus = SubmissionStatus.NOT_SUBMITTED;
  let submissionStatusText = "";
  if (submittedAt) {
    submittedTime = format(new Date(submittedAt), "EEEE, dd MMMM yyyy, h:mm a");
    submissionStatusText = close
      ? getDurationText(submittedAt, close)
      : "Submitted";
    if (!close) {
      submissionStatusText += " on time";
      submissionStatus = SubmissionStatus.SUBMITTED_EARLY;
    } else if (compareTime(new Date(submittedAt), new Date(close)) > 0) {
      submissionStatus = SubmissionStatus.SUBMITTED_LATE;
      submissionStatusText += " late";
    } else {
      submissionStatus = SubmissionStatus.SUBMITTED_EARLY;
      submissionStatusText += " early";
    }
  }
  return (
    <div className={cn(className)}>
      <div className="pb-4 space-y-2 border-b-[0.5px] border-gray-400 text-gray-800">
        {submittedAt && (
          <p>
            <span className="font-bold">Last modified: </span>
            <span className="text-gray-500">{submittedTime}</span>
          </p>
        )}
        <p>
          <span className="font-bold">Submission status: </span>
          <span
            className={cn(
              submissionStatus === SubmissionStatus.NOT_SUBMITTED &&
                "text-gray-500",
              submissionStatus === SubmissionStatus.SUBMITTED_EARLY &&
                "text-green-500",
              submissionStatus === SubmissionStatus.SUBMITTED_LATE &&
                "text-red-500"
            )}
          >
            {submissionStatusText}
          </span>
        </p>
      </div>
      <SubmissionFileUploadView studentResponse={studentResponse} />
    </div>
  );
}
