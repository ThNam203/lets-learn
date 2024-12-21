import React from "react";
import MiniTableRow from "../util/mini-table-row";
import {
  AssignmentResponseData,
  StudentResponse,
} from "@/models/student-response";
import { cn, getDurationText } from "@/lib/utils";
import { AssignmentTopic } from "@/models/topic";
import { format } from "date-fns";
import { CloudinaryFile } from "@/models/cloudinary-file";
import { SubmissionStatus } from "../../submission/static-data";
import { BackgroundColor, GradingStatus, TextColor } from "./static-data";
import { getGradeColor } from "@/app/course/[courseId]/quiz/[topicId]/components/utils";

interface Props {
  assignment: AssignmentTopic;
  assignmentResponse: StudentResponse | undefined;
  maxGrade?: number;
}
const SubmissionStatusTable = ({
  assignment,
  assignmentResponse,
  maxGrade = 100,
}: Props) => {
  const { data } = assignment;
  const { close } = data;
  let submissionStatus = SubmissionStatus.NOT_SUBMITTED;
  let gradingStatus = GradingStatus.NOT_GRADED;
  let timeRemaining = "No due date";
  let lastModified = "Not modified";
  let fileSubmitted: any = "No file submitted";
  let submissionStatusTextColor = "";
  let submissionStatusBackgroundColor = "";
  let markNumber = 0;
  let timeRemainingTextColor = "";
  let timeRemainingBackgroundColor = "";

  const handleGetSubmissionStatus = (
    close: string | null,
    submittedAt: string | null
  ) => {
    if (!close) {
      return !!submittedAt
        ? SubmissionStatus.SUBMITTED_EARLY
        : SubmissionStatus.NOT_SUBMITTED;
    }

    if (!submittedAt && new Date() < new Date(close))
      return SubmissionStatus.NOT_SUBMITTED;
    else if (!submittedAt && new Date() > new Date(close)) {
      submissionStatusTextColor = TextColor.RED;
      submissionStatusBackgroundColor = BackgroundColor.RED;
      return SubmissionStatus.SUBMITTED_LATE;
    } else {
      submissionStatusTextColor = TextColor.GREEN;
      submissionStatusBackgroundColor = BackgroundColor.GREEN;
      return SubmissionStatus.SUBMITTED_EARLY;
    }
  };

  const handleGetTimeRemaining = (
    close: string | null,
    submittedAt: string | null
  ) => {
    if (!close) return "No due date";

    if (!submittedAt && new Date() < new Date(close)) {
      const durationText = getDurationText(new Date(), new Date(close), 1);
      return `${durationText} left`;
    } else if (!submittedAt && new Date() > new Date(close)) {
      timeRemainingTextColor = TextColor.RED;
      timeRemainingBackgroundColor = BackgroundColor.RED;
      return "Overdue by " + getDurationText(new Date(close), new Date(), 1);
    }
    timeRemainingTextColor = TextColor.GREEN;
    timeRemainingBackgroundColor = BackgroundColor.GREEN;
    return "Submitted early by " + getDurationText(close, submittedAt, 1);
  };

  const getUIFileSubmitted = (files: CloudinaryFile[]) => {
    return (
      <div className="flex flex-col gap-2">
        {files.map((file, index) => (
          <span key={file.id}>
            <a
              href={file.downloadUrl}
              className="font-semibold text-cyan-500 hover:underline underline-offset-2 decoration-cyan-500"
            >
              {file.name}
            </a>
            {index !== files.length - 1 && ","}
          </span>
        ))}
      </div>
    );
  };

  if (assignmentResponse) {
    const { mark, submittedAt, files } =
      assignmentResponse.data as AssignmentResponseData;

    // submission status
    submissionStatus = handleGetSubmissionStatus(close, submittedAt);

    // grading status
    if (mark) {
      gradingStatus = GradingStatus.GRADED;
      markNumber = mark;
    }

    // time remaining
    timeRemaining = handleGetTimeRemaining(close, submittedAt);

    // last modified
    lastModified = format(new Date(submittedAt), "EEEE, d MMMM yyyy, h:mm a");

    // file submitted
    fileSubmitted = getUIFileSubmitted(files);
  } else {
    // submission status
    submissionStatus = handleGetSubmissionStatus(close, null);

    // time remaining
    timeRemaining = handleGetTimeRemaining(close, null);
  }

  return (
    <div className="flex flex-col border rounded-lg">
      <MiniTableRow
        title="Submisison status"
        color={submissionStatusBackgroundColor}
      >
        <span className={submissionStatusTextColor}>{submissionStatus}</span>
      </MiniTableRow>
      <MiniTableRow title="Grading status">
        {gradingStatus === GradingStatus.NOT_GRADED && (
          <span>{gradingStatus}</span>
        )}
        {gradingStatus === GradingStatus.GRADED && (
          <span
            className={cn("font-semibold", getGradeColor(markNumber, maxGrade))}
          >
            {`${markNumber}/${maxGrade}`}
          </span>
        )}
      </MiniTableRow>
      <MiniTableRow title="Time remaining" color={timeRemainingBackgroundColor}>
        <span className={timeRemainingTextColor}>{timeRemaining}</span>
      </MiniTableRow>
      <MiniTableRow title="Last modified">{lastModified}</MiniTableRow>
      <MiniTableRow title="File(s) submitted">{fileSubmitted}</MiniTableRow>
    </div>
  );
};
export default SubmissionStatusTable;
