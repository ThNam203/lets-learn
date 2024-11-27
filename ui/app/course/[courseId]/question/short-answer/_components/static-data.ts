import { QuestionStatus } from "@/app/course/[courseId]/quiz/[topicId]/components/static-data";
import { ShortAnswerQuestionGeneralForm } from "./general";
import { ShortAnswerQuestionAnswerForm } from "./answers";

export const dafaultGeneralSetting: ShortAnswerQuestionGeneralForm = {
  questionName: "",
  questionText: "",
  questionStatus: QuestionStatus.READY,
  defaultMark: 1,
};

export const defaultAnswerSetting: ShortAnswerQuestionAnswerForm = {
  answers: [
    {
      text: "Answer",
      gradePercent: 100,
      feedback: "",
    },
    {
      text: "answer",
      gradePercent: 100,
      feedback: "",
    },
    {
      text: "ANSWER",
      gradePercent: 100,
      feedback: "",
    },
  ],
};
