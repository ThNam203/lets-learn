import { ChoiceQuestion, Question, QuestionType } from "@/models/question";
import {
  convertChoiceQuestionToRequestData,
  convertQuestionFromResponseData,
  convertShortAnswerQuestionToRequestData,
  convertTrueFalseQuestionToRequestData,
} from "./adapters/question";
import { GET, POST, PUT } from "@/lib/http-handle/http-handle";

export const createQuestion = (
  question: Question,
  courseId: string,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  const { type } = question;
  let reqData;
  if (type === QuestionType.CHOICE)
    reqData = convertChoiceQuestionToRequestData(question, courseId);
  else if (type === QuestionType.SHORT_ANSWER)
    reqData = convertShortAnswerQuestionToRequestData(question, courseId);
  else if (type === QuestionType.TRUE_FALSE)
    reqData = convertTrueFalseQuestionToRequestData(question, courseId);
  console.log("reqData", reqData);
  POST("/question", reqData, onSuccess, onFail);
};

export const getQuestion = (
  id: string,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  const url = `/question/${id}`;
  const handleSuccess = (data: any) => {
    const question = convertQuestionFromResponseData(data);
    onSuccess(question);
  };
  GET(url, handleSuccess, onFail);
};

export const updateQuestion = (
  question: Question,
  courseId: string,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  const { id, type } = question;
  let reqData;
  if (type === QuestionType.CHOICE)
    reqData = convertChoiceQuestionToRequestData(question, courseId);
  else if (type === QuestionType.SHORT_ANSWER)
    reqData = convertShortAnswerQuestionToRequestData(question, courseId);
  else if (type === QuestionType.TRUE_FALSE)
    reqData = convertTrueFalseQuestionToRequestData(question, courseId);
  PUT(`/question/${id}`, reqData, onSuccess, onFail);
};
export const getQuestionBank = (
  courseId: string,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  const url = `/question?courseId=${courseId}`;
  GET(url, onSuccess, onFail);
};
