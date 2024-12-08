"use client";
import { fakeUser } from "@/fake-data/user";
import { QuizData } from "@/models/quiz";
import {
  QuizAnswer,
  QuizResponseData,
  QuizStatus,
  StudentResponse,
} from "@/models/student-response";
import { QuizTopic } from "@/models/topic";
import { getTopic } from "@/services/topic";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import QuizAttempting from "./components/quiz-attempting";
import { defaultQuizResponse } from "./components/static-data";

interface Props {
  params: {
    topicId: string;
  };
}
export default function QuizAttemptingPage({ params }: Props) {
  const { topicId } = params;
  const thisUser = fakeUser;
  const [quiz, setQuiz] = useState<QuizTopic>();
  const [selectedQuizResponse, setSelectedQuizResponse] =
    useState<StudentResponse>(defaultQuizResponse);

  const getQuizResponse = (quiz: QuizTopic) => {
    const startTime = new Date().toISOString();
    const { questions } = quiz.data as QuizData;

    let quizResponseData: QuizResponseData = {
      status: QuizStatus.NOT_STARTED,
      startedAt: startTime,
      completedAt: startTime,
      answers: questions.map((question) => ({
        question: question,
        answer: "",
        mark: 0,
      })),
    };
    const quizResponse: StudentResponse = {
      id: nanoid(4),
      student: thisUser,
      topicId: quiz.id,
      data: quizResponseData,
    };
    return quizResponse;
  };

  const handleQuizResponseChange = (quizResponse: StudentResponse) => {
    setSelectedQuizResponse(quizResponse);
  };

  const handleQuizAnswerChange = (quizAnswer: QuizAnswer) => {
    if (!selectedQuizResponse) return;
    const newQuizResponse = { ...selectedQuizResponse };
    const quizResponseData = newQuizResponse.data as QuizResponseData;
    const { answers } = quizResponseData;

    //find the index of the answer
    const index = answers.findIndex(
      (answer) => answer.question.id === quizAnswer.question.id
    );
    if (index === -1) return;
    answers[index] = quizAnswer;

    //update quiz responses
    handleQuizResponseChange(newQuizResponse);
  };

  const handleGetTopicSuccess = (data: QuizTopic) => {
    setQuiz(data);
    const quizResponse = getQuizResponse(data);
    setSelectedQuizResponse(quizResponse);
  };
  const handleGetTopicFail = (error: any) => {
    toast.error(error);
  };
  useEffect(() => {
    getTopic(topicId, handleGetTopicSuccess, handleGetTopicFail);
  }, [topicId]);

  if (!quiz) return null;

  return (
    <div className="p-5">
      <QuizAttempting
        quiz={quiz}
        quizResponse={selectedQuizResponse}
        onQuizResponseChange={handleQuizResponseChange}
        onQuizAnswerChange={handleQuizAnswerChange}
      />
    </div>
  );
}
