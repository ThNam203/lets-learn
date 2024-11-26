import { GradingMethod, Test, TestType, TimeLimitType } from "@/models/test";
import { Topic, TopicType } from "@/models/topic";

const current = new Date();
const nextWeek = new Date(current.getTime() + 7 * 24 * 60 * 60 * 1000);
const initQuizTest: Test = {
  type: TestType.QUIZ,
  description: "This is quiz description, change it to your own",
  open: {
    enabled: false,
    value: current.toISOString(),
  },
  close: {
    enabled: false,
    value: nextWeek.toISOString(),
  },
  data: {
    timeLimit: {
      enabled: false,
      value: 1,
      unit: TimeLimitType.HOURS,
    },
    gradeToPass: 5,
    gradingMethod: GradingMethod.HIGHEST_GRADE,
    attemptAllowed: "Unlimited",
    questions: [],
  },
};
export const initQuizTopic: Topic = {
  id: "",
  sectionId: "",
  title: "Quiz",
  type: TopicType.QUIZ,
  data: initQuizTest,
};
