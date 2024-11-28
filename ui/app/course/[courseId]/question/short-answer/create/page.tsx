"use client";
import { Question } from "@/models/question";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ShortAnswerQuestionUI from "../_components/short-answer-question-ui";
import { createQuestion } from "@/services/question";

interface Props {
  params: {
    courseId: string;
  };
}

export default function ShortAnswerQuestionCreatePage({ params }: Props) {
  const { courseId } = params;
  const router = useRouter();
  const handleCreateQuestionSuccess = (data: Question) => {
    toast.success("Create question successfully");
    router.back();
  };
  const handleCreateQuestionFail = (error: any) => {
    toast.error(error);
  };
  const handleSubmitQuestion = (data: Question) => {
    createQuestion(
      data,
      courseId,
      handleCreateQuestionSuccess,
      handleCreateQuestionFail
    );
  };
  if (!courseId) {
    toast.error("Course Id not found");
    return null;
  }
  return (
    <ShortAnswerQuestionUI
      question={undefined}
      onSubmitQuestion={handleSubmitQuestion}
    />
  );
}
