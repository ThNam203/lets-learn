import {
  GradingMethod,
  TimeLimitType,
} from "@/app/courses/[courseId]/quiz/[topicId]/_components/static-data";
import { fakeQuestions } from "./question";
import { SubmissionType, Test, TestType } from "@/models/quiz";

export const fakeQuizTest: Test = {
  id: "1",
  name: "Review basic Astronomy knowledge",
  description:
    "This quiz contains a variety of questions to test your basic knowledge of Astronomy. At the end of the quiz you will be given your score with suggestions for improvement.",
  open: {
    enabled: true,
    value: new Date(2024, 11, 10, 10, 30, 0, 0).toISOString(),
  },
  close: {
    enabled: true,
    value: new Date(2024, 11, 10, 14, 30, 0, 0).toISOString(),
  },
  type: TestType.QUIZ,
  data: {
    timeLimit: {
      enabled: false,
      value: 1,
      unit: TimeLimitType.HOURS,
    },
    gradeToPass: 5,
    gradingMethod: GradingMethod.HIGHEST_GRADE,
    attemptAllowed: "Unlimited",
    questions: fakeQuestions.slice(0, 6),
  },
};

export const fakeAssignment: Test = {
  id: "2",
  name: "Final project",
  description:
    "Write a minimum of 500 words on what you would need to take into consideration if you were to spend a night in the Alps. Justify your choices.",
  open: {
    enabled: true,
    value: new Date(2024, 11, 10, 10, 30, 0, 0).toISOString(),
  },
  close: {
    enabled: true,
    value: new Date(2024, 11, 10, 14, 30, 0, 0).toISOString(),
  },
  type: TestType.ASSIGNMENT,
  data: {
    submissionType: [SubmissionType.ONLINE_TEXT],
    remindToGrade: {
      enabled: true,
      value: new Date(2024, 11, 10, 10, 30, 0, 0).toISOString(),
    },
    maximumFile: {
      enabled: true,
      value: 1,
    },
    maximumFileSize: {
      enabled: true,
      value: "1 MB",
    },
    wordLimit: {
      enabled: true,
      value: 500,
    },
  },
};
