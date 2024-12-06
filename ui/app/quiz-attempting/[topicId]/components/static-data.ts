import { QuestionType } from "@/app/course/[courseId]/quiz/[topicId]/components/static-data";
import { fakeUser } from "@/fake-data/user";
import { QuizData } from "@/models/quiz";
import {
  QuizResponseData,
  QuizStatus,
  StudentResponse,
} from "@/models/student-response";
import { nanoid } from "@reduxjs/toolkit";

export const questionDescription = {
  MultipleChoice: "Select multiple answers: ",
  SingleChoice: "Select the correct answer: ",
  [QuestionType.TRUE_FALSE]: "Select the correct answer: ",
  [QuestionType.SHORT_ANSWER]: "Enter your answer: ",
  [QuestionType.ESSAY]: "Enter your answer: ",
};
export const defaultQuizResponseData: QuizResponseData = {
  status: QuizStatus.NOT_STARTED,
  startedAt: new Date().toISOString(),
  completedAt: new Date().toISOString(),
  answers: [],
};
export const defaultQuizResponse: StudentResponse = {
  id: nanoid(4),
  student: fakeUser,
  topicId: nanoid(4),
  data: defaultQuizResponseData,
};
