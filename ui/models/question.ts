export type Question = {
  id: string;
  questionName: string;
  questionText: string;
  status: QuestionStatus;
  type: QuestionType;
  defaultMark: number;
  createdBy: string;
  createdAt: string;
  modifiedAt: string;
  modifiedBy: string;
  usage: number;
  data: TrueFalseQuestion | ChoiceQuestion | ShortAnswerQuestion;
};

export enum QuestionStatus {
  READY = "Ready",
  DRAFT = "Draft",
}

export enum QuestionType {
  TRUE_FALSE = "True/False",
  SHORT_ANSWER = "Short Answer",
  CHOICE = "Choices Answer",
  ESSAY = "Essay",
}

export type TrueFalseQuestion = {
  correctAnswer: boolean;
  feedbackOfTrue: string;
  feedbackOfFalse: string;
};

export type QuestionChoice = {
  text: string;
  gradePercent: number;
  feedback: string;
};

export type ChoiceQuestion = {
  multiple: boolean;
  choices: QuestionChoice[];
};

export type ShortAnswerQuestion = {
  choices: QuestionChoice[];
};
