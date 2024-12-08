"use client";
import { StudentResponse } from "@/models/student-response";
import { getQuizResponse } from "@/services/quiz-response";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { defaultQuizResponse } from "../../components/static-data";
import QuizReview from "./components/quiz-review";

interface Props {
  params: {
    topicId: string;
    responseId: string;
  };
}
export default function QuizReviewPage({ params }: Props) {
  const { topicId, responseId } = params;
  const [selectedQuizResponse, setSelectedQuizResponse] =
    useState<StudentResponse>(defaultQuizResponse);

  const handleGetQuizResponseSuccess = (quizResponse: StudentResponse) => {
    setSelectedQuizResponse(quizResponse);
  };
  const handleGetQuizResponseFail = (error: any) => {
    toast.error(error);
  };
  useEffect(() => {
    // fetch quiz response
    getQuizResponse(
      topicId,
      responseId,
      handleGetQuizResponseSuccess,
      handleGetQuizResponseFail
    );
  }, [topicId, responseId]);
  return (
    <div className="p-5">
      <QuizReview quizResponse={selectedQuizResponse} />
    </div>
  );
}
