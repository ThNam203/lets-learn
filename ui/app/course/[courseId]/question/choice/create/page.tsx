"use client";
import { Question } from "@/models/question";
import { createChoiceQuestion } from "@/services/question";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ChoiceQuestionUI from "../_components/choice-question-ui";

interface Props {
  params: {
    courseId: string;
  };
}

export default function ChoiceQuestionCreatePage({ params }: Props) {
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
    createChoiceQuestion(
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
    <ChoiceQuestionUI
      question={undefined}
      onSubmitQuestion={handleSubmitQuestion}
    />
  );
}
