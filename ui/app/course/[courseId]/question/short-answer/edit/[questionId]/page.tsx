"use client";
import { Question } from "@/models/question";
import { getQuestion, updateQuestion } from "@/services/question";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import ShortAnswerQuestionUI from "../../_components/short-answer-question-ui";

interface Props {
  params: {
    courseId: string;
    questionId: string;
  };
}
export default function ShortAnswerQuestionEditPage({ params }: Props) {
  const { questionId, courseId } = params;
  const router = useRouter();
  const [question, setQuestion] = React.useState();
  const handleGetQuestionSuccess = (data: any) => {
    setQuestion(data);
  };
  const handleGetQuestionFail = (error: any) => {
    toast.error(error);
  };
  const handleUpdateQuestionSuccess = (data: any) => {
    toast.success("Update question successfully");
    router.back();
  };
  const handleUpdateQuestionFail = (error: any) => {
    toast.error(error);
  };
  const handleSubmitQuestion = (data: Question) => {
    updateQuestion(
      data,
      courseId,
      handleUpdateQuestionSuccess,
      handleUpdateQuestionFail
    );
  };

  useEffect(() => {
    getQuestion(questionId, handleGetQuestionSuccess, handleGetQuestionFail);
  }, [questionId]);
  if (!question) return null;
  return (
    <ShortAnswerQuestionUI
      question={question}
      onSubmitQuestion={handleSubmitQuestion}
    />
  );
}
