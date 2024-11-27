import { QuestionStatus } from "@/app/course/[courseId]/quiz/[topicId]/components/static-data";
import { ChoiceQuestionGeneralForm } from "./general";
import { ChoiceQuestionAnswerForm } from "./answers";

export const defaultGeneralSetting: ChoiceQuestionGeneralForm = {
  questionName: "",
  questionText: "",
  questionStatus: QuestionStatus.READY,
  defaultMark: 1,
  multipleChoice: false,
};

export const defaultAnswerSetting: ChoiceQuestionAnswerForm = {
  choices: [
    {
      text: "Choice 1",
      gradePercent: 100,
      feedback: "",
    },
    {
      text: "Choice 2",
      gradePercent: 100,
      feedback: "",
    },
    {
      text: "Choice 3",
      gradePercent: 100,
      feedback: "",
    },
  ],
};
