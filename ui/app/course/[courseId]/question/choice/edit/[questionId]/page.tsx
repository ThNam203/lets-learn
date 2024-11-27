"use client";
import { QuestionType } from "@/app/course/[courseId]/quiz/[topicId]/components/static-data";
import { fakeQuestions } from "@/fake-data/question";
import { notFound } from "next/navigation";
import React, { useMemo } from "react";
import ChoiceQuestionUI from "../../_components/choice-question-ui";

interface Props {
  params: {
    questionId: string;
  };
}
export default function ChoiceQuestionEditPage({ params }: Props) {
  const { questionId } = params;
  const [questions, setQuestions] = React.useState(fakeQuestions);
  const question = useMemo(() => {
    return questions.find(
      (q) => q.id === questionId && q.type === QuestionType.CHOICE
    );
  }, [questions, questionId]);
  if (!question) return notFound();
  return <ChoiceQuestionUI question={question} />;
}
