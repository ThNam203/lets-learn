import { FileSizeOption } from "@/models/assignment";
import { GradingMethod, TimeLimitType } from "@/models/quiz";
import { AssignmentTopic, QuizTopic, TopicType } from "@/models/topic";

export const initQuiz: QuizTopic = {
  id: "",
  sectionId: "",
  title: "Quiz",
  type: TopicType.QUIZ,
  data: {
    open: new Date(2024, 11, 10, 10, 30, 0, 0).toISOString(),
    close: new Date(2024, 11, 10, 14, 30, 0, 0).toISOString(),
    description:
      "This quiz contains a variety of questions to test your knowledge. At the end of the quiz you will be given your score with suggestions for improvement.",
    timeLimit: 1,
    timeLimitUnit: TimeLimitType.HOURS,
    gradeToPass: 5,
    gradingMethod: GradingMethod.HIGHEST_GRADE,
    attemptAllowed: "Unlimited",
    questions: [],
  },
};

export const initAssignment: AssignmentTopic = {
  id: "",
  sectionId: "",
  title: "Assignment",
  type: TopicType.ASSIGNMENT,
  data: {
    open: new Date(2024, 11, 10, 10, 30, 0, 0).toISOString(),
    close: new Date(2024, 11, 10, 14, 30, 0, 0).toISOString(),
    description:
      "This quiz contains a variety of questions to test your knowledge. At the end of the quiz you will be given your score with suggestions for improvement.",
    remindToGrade: new Date(2024, 11, 10, 14, 30, 0, 0).toISOString(),
    maximumFile: 5,
    maximumFileSize: FileSizeOption["5MB"],
  },
};
