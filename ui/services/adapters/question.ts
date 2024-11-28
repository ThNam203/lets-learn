import {
  ChoiceQuestion,
  Question,
  QuestionType,
  ShortAnswerQuestion,
  TrueFalseQuestion,
} from "@/models/question";

export const convertChoiceQuestionToRequestData = (
  question: Question,
  courseId: string
) => {
  const {
    questionName,
    questionText,
    status,
    type,
    defaultMark,
    usage,
    createdAt,
  } = question;
  const { choices, multiple } = question.data as ChoiceQuestion;

  let reqData = {
    questionName,
    questionText,
    status,
    type,
    defaultMark,
    usage,
    feedbackOfTrue: null,
    feedbackOfFalse: null,
    correctAnswer: false,
    multiple,
    choices,
    courseId,
    createdAt,
    updatedAt: null,
    deletedAt: null,
  };
  return reqData;
};

export const convertShortAnswerQuestionToRequestData = (
  question: Question,
  courseId: string
) => {
  const {
    questionName,
    questionText,
    status,
    type,
    defaultMark,
    usage,
    createdAt,
  } = question;
  const { choices } = question.data as ShortAnswerQuestion;

  let reqData = {
    questionName,
    questionText,
    status,
    type,
    defaultMark,
    usage,
    feedbackOfTrue: null,
    feedbackOfFalse: null,
    correctAnswer: false,
    multiple: null,
    choices,
    courseId,
    createdAt,
    updatedAt: null,
    deletedAt: null,
  };
  return reqData;
};

export const convertTrueFalseQuestionToRequestData = (
  question: Question,
  courseId: string
) => {
  const {
    questionName,
    questionText,
    status,
    type,
    defaultMark,
    usage,
    createdAt,
  } = question;
  const { correctAnswer, feedbackOfFalse, feedbackOfTrue } =
    question.data as TrueFalseQuestion;

  let reqData = {
    questionName,
    questionText,
    status,
    type,
    defaultMark,
    usage,
    feedbackOfTrue,
    feedbackOfFalse,
    correctAnswer,
    multiple: null,
    choices: null,
    courseId,
    createdAt,
    updatedAt: null,
    deletedAt: null,
  };
  return reqData;
};
