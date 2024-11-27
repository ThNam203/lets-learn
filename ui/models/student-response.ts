import { CloudinaryFile } from "./cloudinary-file";
import { Question } from "./question";
import { User } from "./user";

export type StudentResponse = {
  id: string;
  student: User;
  topicId: string;
  data: QuizResponseData | AssignmentResponseData;
};

export type QuizResponseData = {
  status: QuizStatus;
  startedAt: string;
  completedAt: string;
  answers: QuizAnswer[];
};

// { question: "which is correct ?", answer: "1" -> index of answer, mark: 1 }
// { question: "which is correct ?", answer: "1001" -> index of answers, mark: 2 }
// { question: "which is correct ?", answer: "hello" -> answer string, mark: 0 }
export type QuizAnswer = {
  question: Question;
  answer: string;
  mark: number;
};

export enum QuizStatus {
  FINISHED = "Finished",
  NOT_FINISHED = "Not finished",
  NOT_STARTED = "Not started",
}

export type AssignmentResponseData = {
  submittedAt: string | null;
  submitted: AssignmentOnlineText | AssignmentFileUpload;
};

export type AssignmentOnlineText = {
  text: string;
};
export type AssignmentFileUpload = {
  files: CloudinaryFile[];
};

export const getQuizResponseMark = (quizResponse: QuizResponseData) => {
  let mark = 0;
  quizResponse.answers.forEach((answer) => {
    mark += answer.mark;
  });
  return mark;
};

export const getQuizResponseTotalMark = (quizResponse: QuizResponseData) => {
  let totalMark = 0;
  quizResponse.answers.forEach((answer) => {
    totalMark += answer.question.defaultMark;
  });
  return totalMark;
};

export const sortQuizResponsesByCompletedDate = (
  quizResponses: StudentResponse[],
  ascending = true
) => {
  return quizResponses.sort((a, b) => {
    const aData = a.data as QuizResponseData;
    const bData = b.data as QuizResponseData;
    if (ascending)
      return (
        new Date(aData.completedAt).getTime() -
        new Date(bData.completedAt).getTime()
      );
    return (
      new Date(bData.completedAt).getTime() -
      new Date(aData.completedAt).getTime()
    );
  });
};
