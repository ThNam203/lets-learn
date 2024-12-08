import { Question, QuestionType } from "@/models/question";
import { QuizTopic } from "@/models/topic";
import {
  convertChoiceQuestionToRequestData,
  convertShortAnswerQuestionToRequestData,
  convertTrueFalseQuestionToRequestData,
} from "../question";

const removeTempIdInQuestions = (questions: Question[]) => {
  return questions.map((question) => {
    if (question.type === QuestionType.CHOICE)
      return convertChoiceQuestionToRequestData(question);
    else if (question.type === QuestionType.SHORT_ANSWER)
      return convertShortAnswerQuestionToRequestData(question);
    else if (question.type === QuestionType.TRUE_FALSE)
      return convertTrueFalseQuestionToRequestData(question);
    return question;
  });
};

export const convertQuizToRequestData = (quiz: QuizTopic) => {
  const { id, data } = quiz;
  let reqData = {
    ...quiz,
    id: id.length === 4 ? null : id,
  };
  if (!data) return reqData;

  const { questions } = data;
  const convertedData = {
    ...data,
    questions: removeTempIdInQuestions(questions),
  };

  return {
    ...reqData,
    data: JSON.stringify(convertedData),
  };
};
