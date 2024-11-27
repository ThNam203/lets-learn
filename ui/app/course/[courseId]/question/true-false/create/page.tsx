"use client";
import { Question } from "@/models/question";
import { createTrueFalseQuestion } from "@/services/question";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import TrueFalseQuestionUI from "../_components/true-false-question-ui";

interface Props {
  params: {
    courseId: string;
  };
}

export default function TrueFalseQuestionCreatePage({ params }: Props) {
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
    createTrueFalseQuestion(
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
    <TrueFalseQuestionUI
      question={undefined}
      onSubmitQuestion={handleSubmitQuestion}
    />
  );
}
