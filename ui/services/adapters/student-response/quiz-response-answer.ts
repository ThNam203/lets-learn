import { QuizAnswer } from "@/models/student-response";

export const convertQuizResponseAnswerToRequestData = (answers: QuizAnswer) => {
  const { question, answer, mark } = answers;
  return {
    question: JSON.stringify(question),
    answer,
    mark,
  };
};

export const convertQuizResponseAnswerFromResponseData = (data: any) => {
  const { question, answer, mark } = data;
  return {
    question: JSON.parse(question),
    answer,
    mark,
  };
};
