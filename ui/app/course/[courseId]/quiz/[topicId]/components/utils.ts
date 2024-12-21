import { BreadcrumbItem } from "@/components/ui/simple/breadcrumb";
import { QuestionResult } from "./static-data";
import { Course } from "@/models/course";
import { QuizTopic } from "@/models/topic";

export const getQuizResultFromMark = (
  mark: number,
  defaultMark: number
): QuestionResult => {
  if (mark === defaultMark) return QuestionResult.FULL_MARK;
  if (mark === 0) return QuestionResult.ZERO_MARK;
  return QuestionResult.PARTIAL_MARK;
};

export const getGradeColor = (grade: number, maxGrade: number) => {
  if (grade >= maxGrade * 0.8) return "text-green-500";
  if (grade >= maxGrade * 0.5) return "text-orange-500";
  return "text-red-500";
};

export const getQuizBreadcrumb = (course: Course, quiz: QuizTopic) => {
  const quizBreadCrumb: BreadcrumbItem[] = [
    {
      label: "Home",
      href: `/home`,
    },
    {
      label: course.title,
      href: `/course/${course.id}`,
    },
    {
      label: quiz.title,
      href: `/course/${course.id}/quiz/${quiz.id}`,
    },
  ];
  return quizBreadCrumb;
};
