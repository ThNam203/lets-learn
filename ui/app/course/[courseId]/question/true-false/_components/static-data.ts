import { QuestionStatus } from "@/app/course/[courseId]/quiz/[topicId]/components/static-data";
import { TrueFalseQuestionGeneralForm } from "./general";

export const defaultGeneralSetting: TrueFalseQuestionGeneralForm = {
  questionName: "",
  questionText: "",
  questionStatus: QuestionStatus.READY,
  defaultMark: 1,
};

export const defaultAnswerSetting = {
  correctAnswer: true,
  feedbackOfTrue: "",
  feedbackOfFalse: "",
};
