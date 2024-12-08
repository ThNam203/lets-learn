"use client";

import QuizAttemptResult from "@/app/course/[courseId]/quiz/[topicId]/components/quiz/quiz-attempt-result";
import {
  getQuizResultFromMark,
  QuestionResult,
} from "@/app/course/[courseId]/quiz/[topicId]/components/static-data";
import CustomDialog from "@/components/ui/custom-dialog";
import { Button } from "@/lib/shadcn/button";
import { cn, scrollTo } from "@/lib/utils";
import {
  QuizAnswer,
  QuizResponseData,
  QuizStatus,
  StudentResponse,
} from "@/models/student-response";
import { QuizTopic } from "@/models/topic";
import { createQuizResponse } from "@/services/quiz-response";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Anotation from "./anotation/anotation";
import QuestionDisplay from "./question-display/question-display";
import QuestionBlock from "./question-navigation-box/question-block";
import StickyCard from "./sticky-card/sticky-card";
import QuizTimer from "./timer/quiz-timer";

interface Props {
  className?: string;
  quizResponse: StudentResponse;
  quiz: QuizTopic;
  onQuizResponseChange?: (quizResponse: StudentResponse) => void;
  onQuizAnswerChange?: (quizAnswer: QuizAnswer) => void;
}
const QuizAttempting = ({
  className,
  quizResponse,
  quiz,
  onQuizResponseChange,
  onQuizAnswerChange,
}: Props) => {
  const router = useRouter();
  const quizResponseData = quizResponse.data as QuizResponseData;
  const { answers: studentAnswers, status } = quizResponseData;
  const { questions, timeLimit, timeLimitUnit } = quiz.data;
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [flags, setFlags] = useState<boolean[]>(questions.map(() => false));
  // Track if each question has been answered
  const [hasAnswers, setHasAnswers] = useState<boolean[]>(
    questions.map(() => false)
  );

  useEffect(() => {
    if (quizResponseData.status === QuizStatus.NOT_STARTED) startQuiz();
  }, []);

  const handleCountdownEnd = () => {
    handleFinishQuizResponse();
  };
  const handleFlagChange = (index: number) => {
    const newFlags = [...flags];
    newFlags[index] = !newFlags[index];
    setFlags(newFlags);
  };
  const handleCancelFinishAttempt = () => {};
  const handleConfirmFinishAttempt = () => {
    handleFinishQuizResponse();
  };

  const startQuiz = () => {
    if (status !== QuizStatus.NOT_STARTED) return;

    const startQuizResponseData: QuizResponseData = {
      ...quizResponseData,
      status: QuizStatus.NOT_FINISHED,
      startedAt: new Date().toISOString(),
    };

    const startQuizResponse: StudentResponse = {
      ...quizResponse,
      data: startQuizResponseData,
    };

    if (onQuizResponseChange) onQuizResponseChange(startQuizResponse);

    // Start timer
    setIsTimerRunning(true);
  };

  const handleFinishQuizResponse = () => {
    const completedTime = new Date();

    // Stop timer
    setIsTimerRunning(false);

    // Update quiz response
    const finishQuizResponseData: QuizResponseData = {
      ...quizResponseData,
      status: QuizStatus.FINISHED,
      completedAt: completedTime.toISOString(),
    };

    const finishedQuizResponse: StudentResponse = {
      ...quizResponse,
      data: finishQuizResponseData,
    };

    if (onQuizResponseChange) onQuizResponseChange(finishedQuizResponse);
    saveQuizResponse(finishedQuizResponse);
  };

  const handleCreateQuizResponseSuccess = (data: any) => {
    toast.success("Your quiz result has been saved successfully");
    router.replace(`/quiz-attempting/${quiz.id}/review/${data.id}`);
  };
  const handleCreateQuizResponseFail = (error: any) => {
    toast.error(error);
  };

  const saveQuizResponse = (quizResponse: StudentResponse) => {
    createQuizResponse(
      quiz.id,
      quizResponse,
      handleCreateQuizResponseSuccess,
      handleCreateQuizResponseFail
    );
  };

  const handleQuizAnswerChange = (answer: QuizAnswer) => {
    //find the question index
    const index = questions.findIndex((q) => q.id === answer.question.id);
    if (index === -1) return;

    // update hasAnswers
    const newHasAnswers = [...hasAnswers];
    newHasAnswers[index] = answer.answer !== "";
    setHasAnswers(newHasAnswers);

    // update studentAnswers
    if (onQuizAnswerChange) onQuizAnswerChange(answer);
  };

  const handleScrollToQuestion = (index: number) => {
    scrollTo(`question-${index + 1}`);
  };

  let dialogTitle = "";
  const isMissingAnswer = hasAnswers.includes(false);
  if (isMissingAnswer) dialogTitle = "Some questions have not been answered";
  else dialogTitle = "All questions have been answered";

  return (
    <div
      className={cn(
        "relative w-full h-full flex flex-row justify-between gap-5",
        className
      )}
    >
      <Anotation />
      <QuizTimer
        isTimerRunning={isTimerRunning}
        timeLimit={timeLimit}
        timeLimitUnit={timeLimitUnit}
        onCountDownEnd={handleCountdownEnd}
        className="fixed top-5 right-[350px] z-10"
      />

      <div className={cn("relative w-full flex flex-col gap-10")}>
        {questions.map((question, index) => (
          <QuestionDisplay
            key={index}
            editMode={true}
            questionIndex={index}
            totalQuestions={questions.length}
            question={question}
            studentAnswer={studentAnswers[index]}
            showCorrectAnswer={false}
            isFlagged={flags[index]}
            onFlagChange={() => handleFlagChange(index)}
            onQuizAnswerChange={handleQuizAnswerChange}
          />
        ))}
      </div>

      <StickyCard>
        <h5 className="text-orange-600">Quiz navigation</h5>
        <div className="flex gap-2">
          {questions.map((_, index) => (
            <QuestionBlock
              key={index}
              questionIndex={index}
              isFlagged={flags[index]}
              hasAnswered={hasAnswers[index]}
              questionResult={QuestionResult.NOT_SHOW}
              onClick={() => handleScrollToQuestion(index)}
            />
          ))}
        </div>

        <CustomDialog
          variant={isMissingAnswer ? "warning" : "success"}
          title={dialogTitle}
          content={<span>{"Are you sure you want to submit your quiz?"}</span>}
          onYes={handleConfirmFinishAttempt}
          onCancel={handleCancelFinishAttempt}
        >
          <Button variant="default">Finish attempt</Button>
        </CustomDialog>
      </StickyCard>
    </div>
  );
};

export default QuizAttempting;
