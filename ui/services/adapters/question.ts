import {
  ChoiceQuestion,
  Question,
  QuestionChoice,
  QuestionType,
  ShortAnswerQuestion,
  TrueFalseQuestion,
} from "@/models/question";

export const convertChoicesInQuestionToRequestData = (
  choices: QuestionChoice[]
) => {
  return choices.map((choice) => {
    return {
      id: choice.id.length === 4 ? null : choice.id,
      text: choice.text,
      gradePercent: choice.gradePercent,
      feedback: choice.feedback,
      questionId: choice.questionId.length === 4 ? null : choice.questionId,
    };
  });
};

export const convertChoiceQuestionToRequestData = (
  question: Question,
  courseId?: string
) => {
  const {
    id,
    topicQuizId,
    questionName,
    questionText,
    status,
    type,
    defaultMark,
    usage,
    createdAt,
    createdBy,
    modifiedBy,
  } = question;
  console.log("question", question);
  const { choices, multiple } = question.data as ChoiceQuestion;

  let reqData = {
    id: id.length === 4 ? null : id,
    topicQuizId: topicQuizId ?? null,
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
    choices: convertChoicesInQuestionToRequestData(choices),
    course: {
      id: courseId,
    },
    createdAt,
    createdBy,
    modifiedBy,
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
    id,
    topicQuizId,
    questionName,
    questionText,
    status,
    type,
    defaultMark,
    usage,
    createdAt,
    createdBy,
    modifiedBy,
  } = question;
  const { choices } = question.data as ShortAnswerQuestion;

  let reqData = {
    id: id.length === 4 ? null : id,
    topicQuizId: topicQuizId ?? null,
    questionName,
    questionText,
    status,
    type,
    defaultMark,
    usage,
    feedbackOfTrue: null,
    feedbackOfFalse: null,
    correctAnswer: false,
    multiple: false,
    choices: convertChoicesInQuestionToRequestData(choices),
    course: {
      id: courseId,
    },
    createdAt,
    createdBy,
    modifiedBy,
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
    id,
    topicQuizId,
    questionName,
    questionText,
    status,
    type,
    defaultMark,
    usage,
    createdAt,
    createdBy,
    modifiedBy,
  } = question;
  const { correctAnswer, feedbackOfFalse, feedbackOfTrue } =
    question.data as TrueFalseQuestion;

  let reqData = {
    id: id.length === 4 ? null : id,
    topicQuizId: topicQuizId ?? null,
    questionName,
    questionText,
    status,
    type,
    defaultMark,
    usage,
    feedbackOfTrue,
    feedbackOfFalse,
    correctAnswer,
    multiple: false,
    choices: [],
    course: {
      id: courseId,
    },
    createdAt,
    createdBy,
    modifiedBy,
    updatedAt: null,
    deletedAt: null,
  };
  return reqData;
};

export const convertQuestionFromResponseData = (data: any): Question => {
  let {
    id,
    topicQuizId,
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
    createdBy,
    modifiedBy,
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
    topicQuizId,
    questionName,
    questionText,
    status,
    type,
    defaultMark,
    usage,
    data: choiceQuestion,
    createdAt,
    modifiedAt: updatedAt,
    createdBy,
    modifiedBy,
  };

  if (type === QuestionType.SHORT_ANSWER) {
    question.data = shortAnswerQuestion;
  } else if (type === QuestionType.TRUE_FALSE) {
    question.data = trueFalseQuestion;
  }
  return question;
};
