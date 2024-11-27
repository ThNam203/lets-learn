import { ChoiceQuestion, Question } from "@/models/question";
import {
  convertChoiceQuestionToRequestData,
  convertShortAnswerQuestionToRequestData,
  convertTrueFalseQuestionToRequestData,
} from "./adapters/question";
import { POST } from "@/lib/http-handle/http-handle";

export const createChoiceQuestion = async (
  question: Question,
  courseId: string,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  const reqData = convertChoiceQuestionToRequestData(question, courseId);
  POST("/question", reqData, onSuccess, onFail);
};

export const createShortAnswerQuestion = async (
  question: Question,
  courseId: string,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  const reqData = convertShortAnswerQuestionToRequestData(question, courseId);
  POST("/question", reqData, onSuccess, onFail);
};

export const createTrueFalseQuestion = async (
  question: Question,
  courseId: string,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  const reqData = convertTrueFalseQuestionToRequestData(question, courseId);
  POST("/question", reqData, onSuccess, onFail);
};
