import { TwoDot } from "@/components/icons/two-dot";
import { QuestionType } from "@/models/question";
import { List, RectangleHorizontal } from "lucide-react";

export enum Tab {
  QUIZ = "Quiz",
  SETTINGS = "Settings",
  QUESTION = "Question",
  QUESTION_BANK = "Question Bank",
  RESULTS = "Results",
  DASHBOARD = "Dashboard",
}

export type QuestionTypeOption = {
  type: QuestionType;
  description: string;
};

export const questionIconMap = {
  [QuestionType.TRUE_FALSE]: <TwoDot />,
  [QuestionType.SHORT_ANSWER]: <RectangleHorizontal size={16} />,
  [QuestionType.CHOICE]: <List size={16} />,
};

export const questionTypeOptions: QuestionTypeOption[] = [
  {
    type: QuestionType.TRUE_FALSE,
    description:
      "A simple form of multiple choice question with just the two choices 'True' and 'False'.",
  },
  {
    type: QuestionType.SHORT_ANSWER,
    description:
      "A question that requires a short text answer, typically a single word or a few words.",
  },
  {
    type: QuestionType.CHOICE,
    description:
      "A question that provides a list of options for the user to choose from.",
  },
];

export enum TabInTab {
  MAIN_TAB = "Main Tab",
  TRUE_FALSE_QUESTION_TAB = "New True/False Question",
  SHORT_ANSWER_QUESTION_TAB = "New Short Answer Question",
  CHOICE_QUESTION_TAB = "New Choice Question",
  QUIZ_ATTEMPTING_TAB = "Quiz Attempting",
}

export const answerKeys = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export enum QuestionResult {
  NOT_SHOW = "Not Show",
  FULL_MARK = "Full mark",
  PARTIAL_MARK = "Partial mark",
  ZERO_MARK = "Zero mark",
}
