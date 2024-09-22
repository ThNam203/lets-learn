import { Question } from "./question";
import { Test } from "./quiz";
import { User } from "./user";

export type StudentResponse = {
  id: string;
  student: User;
  test: Test;
  data: QuizResponseData | AssignmentResponseData | ChoiceResponseData;
};

export enum QuizStatus {
  FINISHED = "Finished",
  NOT_FINISHED = "Not finished",
  NOT_STARTED = "Not started",
}

// { question: "which is correct ?", answer: "1" -> index of answer, mark: 1 }
// { question: "which is correct ?", answer: "1001" -> index of answers, mark: 2 }
// { question: "which is correct ?", answer: "hello" -> answer string, mark: 0 }
export type QuizAnswer = {
  question: Question;
  answer: string;
  mark: number;
};

export type QuizResponseData = {
  status: QuizStatus;
  startedAt: string;
  completedAt: string;
  answers: QuizAnswer[];
};

export type AssignmentResponseData = {};

export type ChoiceResponseData = {
  data: ChoiceResponse[];
};

export type ChoiceResponse = {
  option: string;
  studentResponses: string[];
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