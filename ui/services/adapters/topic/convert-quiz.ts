import { Question, QuestionType } from "@/models/question";
import { QuizTopic } from "@/models/topic";
import {
  convertChoiceQuestionToRequestData,
  convertShortAnswerQuestionToRequestData,
  convertTrueFalseQuestionToRequestData,
} from "../question";

export const convertQuizToRequestData = (quiz: QuizTopic) => {
  const { id, data } = quiz;
  const { questions } = data;

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

  const newQuestions = removeTempIdInQuestions(questions);
  const convertedData = {
    ...data,
    questions: newQuestions,
  };
  return {
    ...quiz,
    id: id.length === 4 ? null : id,
    data: JSON.stringify(convertedData),
  };
};
