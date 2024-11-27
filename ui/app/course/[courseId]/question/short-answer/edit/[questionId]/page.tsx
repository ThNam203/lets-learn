"use client";
import { QuestionType } from "@/app/course/[courseId]/quiz/[topicId]/components/static-data";
import { fakeQuestions } from "@/fake-data/question";
import { notFound } from "next/navigation";
import React, { useMemo } from "react";
import ShortAnswerQuestionUI from "../../_components/short-answer-question-ui";

interface Props {
  params: {
    questionId: string;
  };
}
export default function ShortAnswerQuestionEditPage({ params }: Props) {
  const { questionId } = params;
  const [questions, setQuestions] = React.useState(fakeQuestions);
  const question = useMemo(() => {
    return questions.find(
      (q) => q.id === questionId && q.type === QuestionType.SHORT_ANSWER
    );
  }, [questions, questionId]);
  if (!question) return notFound();
  return <ShortAnswerQuestionUI question={question} />;
}
