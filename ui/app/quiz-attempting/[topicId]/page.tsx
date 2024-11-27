"use client";
import { fakeQuizTest } from "@/fake-data/test";
import { fakeUser } from "@/fake-data/user";
import { QuizData, Test } from "@/models/quiz";
import {
  QuizAnswer,
  QuizResponseData,
  QuizStatus,
  StudentResponse,
} from "@/models/student-response";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import QuizAttempting from "./components/quiz-attempting";

export default function QuizAttemptingPage() {
  const thisUser = fakeUser;
  const [quiz, setQuiz] = useState<Test>(fakeQuizTest);
  const getNewQuizResponse = () => {
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
    const newQuizResponse: StudentResponse = {
      id: nanoid(),
      student: thisUser,
      test: quiz,
      data: quizResponseData,
    };
    return newQuizResponse;
  };
  const [selectedQuizResponse, setSelectedQuizResponse] =
    useState<StudentResponse>(getNewQuizResponse());

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

  return (
    <div className="p-5 pb-48">
      <QuizAttempting
        quiz={quiz}
        quizResponse={selectedQuizResponse!}
        onQuizResponseChange={handleQuizResponseChange}
        onQuizAnswerChange={handleQuizAnswerChange}
      />
    </div>
  );
}
