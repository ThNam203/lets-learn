import {
  GradingMethod,
  TimeLimitType,
} from "@/app/courses/[courseId]/quiz/[topicId]/_components/static-data";
import { QuizTopic, TopicType } from "@/models/topic";
import { fakeQuestions } from "./question";

export const fakeQuiz: QuizTopic = {
  id: "1",
  title: "Review basic Astronomy knowledge",
  sectionId: "1",
  type: TopicType.QUIZ,
  data: {
    open: new Date(2024, 11, 10, 10, 30, 0, 0).toISOString(),
    close: new Date(2024, 11, 10, 14, 30, 0, 0).toISOString(),
    description:
      "This quiz contains a variety of questions to test your basic knowledge of Astronomy. At the end of the quiz you will be given your score with suggestions for improvement.",
    timeLimitValue: 1,
    timeLimitUnit: TimeLimitType.HOURS,
    gradeToPass: 5,
    gradingMethod: GradingMethod.HIGHEST_GRADE,
    attemptAllowed: "Unlimited",
    questions: fakeQuestions.slice(0, 6),
  },
};
