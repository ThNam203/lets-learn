import {
  ChoiceQuestion,
  Question,
  QuestionType,
  ShortAnswerQuestion,
  TrueFalseQuestion,
} from "@/models/question";

export const convertChoiceQuestionToRequestData = (
  question: Question,
  courseId?: string
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
    course: {
      id: courseId,
    },
    createdAt,
    updatedAt: null,
    deletedAt: null,
  };
  return reqData;
};

export const convertShortAnswerQuestionToRequestData = (
  question: Question,
  courseId?: string
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
    course: {
      id: courseId,
    },
    createdAt,
    updatedAt: null,
    deletedAt: null,
  };
  return reqData;
};

export const convertTrueFalseQuestionToRequestData = (
  question: Question,
  courseId?: string
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
    course: {
      id: courseId,
    },
    createdAt,
    updatedAt: null,
    deletedAt: null,
  };
  return reqData;
};

export const convertQuestionFromResponseData = (data: any): Question => {
  let {
    id,
    questionName,
    questionText,
    status,
    type,
    defaultMark,
    usage,
    feedbackOfTrue,
    feedbackOfFalse,
    correctAnswer,
    multiple,
    choices,
    createdAt,
    updatedAt,
    deletedAt,
  } = data;

  const choiceQuestion: ChoiceQuestion = {
    choices,
    multiple,
  };
  const shortAnswerQuestion: ShortAnswerQuestion = {
    choices,
  };
  const trueFalseQuestion: TrueFalseQuestion = {
    correctAnswer,
    feedbackOfTrue,
    feedbackOfFalse,
  };

  const question: Question = {
    id,
    questionName,
    questionText,
    status,
    type,
    defaultMark,
    usage,
    data: choiceQuestion,
    createdAt,
    modifiedAt: updatedAt,
    createdBy: "",
    modifiedBy: "",
  };

  if (type === QuestionType.SHORT_ANSWER) {
    question.data = shortAnswerQuestion;
  } else if (type === QuestionType.TRUE_FALSE) {
    question.data = trueFalseQuestion;
  }
  return question;
};
