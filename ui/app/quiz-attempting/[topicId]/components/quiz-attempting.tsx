"use client";
import {
  getQuizResultFromMark,
  QuestionResult,
} from "@/app/course/[courseId]/quiz/[topicId]/components/static-data";
import ColorAnnotation from "@/app/course/[courseId]/quiz/[topicId]/components/tab-content/_components/quiz-attempting-tab/color-annotation";
import QuizAttemptResult from "@/app/course/[courseId]/quiz/[topicId]/components/tab-content/_components/quiz-attempting-tab/quiz-attempt-result";
import QuizCountdown from "@/app/course/[courseId]/quiz/[topicId]/components/tab-content/_components/quiz-attempting-tab/quiz-countdown";
import QuizTimer from "@/app/course/[courseId]/quiz/[topicId]/components/tab-content/_components/quiz-attempting-tab/quiz-timer";
import SymbolAnnotation from "@/app/course/[courseId]/quiz/[topicId]/components/tab-content/_components/quiz-attempting-tab/symbol-annotation";
import {
  colorAnnotations,
  symbolAnnotations,
} from "@/app/course/[courseId]/quiz/[topicId]/components/tab-content/_components/static-data";
import CustomDialog from "@/components/ui/custom-dialog";
import useCountdown from "@/hooks/useCountDown";
import useTimer from "@/hooks/useTimer";
import { Button } from "@/lib/shadcn/button";
import { Card } from "@/lib/shadcn/card";
import { cn, scrollTo } from "@/lib/utils";
import { getSecondFromTimeLimitType, TimeLimitType } from "@/models/quiz";
import {
  QuizAnswer,
  QuizResponseData,
  QuizStatus,
  StudentResponse,
} from "@/models/student-response";
import { QuizTopic } from "@/models/topic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import QuestionDisplay from "./question-display/question-display";
import QuestionBlock from "./question-navigation-box/question-block";
import { createQuizResponse } from "@/services/quiz-response";
import { toast } from "react-toastify";

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
  const totalQuestions = questions.length;
  const {
    startTimer,
    stopTimer,
    timerValue: timer,
    status: timerStatus,
  } = useTimer({});
  const {
    status: countdownStatus,
    countdownTimer,
    startCountdown,
    stopCountdown,
  } = useCountdown({
    countdown: getSecondFromTimeLimitType(
      timeLimit || 0,
      timeLimitUnit as TimeLimitType
    ),
  });

  const [showCorrectAnswer, setShowCorrectAnswer] = useState(
    status === QuizStatus.FINISHED
  );
  const [flags, setFlags] = useState<boolean[]>(questions.map(() => false));

  // Track if each question has been answered
  const [hasAnswers, setHasAnswers] = useState<boolean[]>(
    questions.map(() => false)
  );
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>(
    questions.map(() => QuestionResult.NOT_SHOW)
  );

  useEffect(() => {
    if (quizResponseData.status === QuizStatus.NOT_STARTED) startQuiz();
  }, []);

  useEffect(() => {
    if (!showCorrectAnswer) {
      setQuestionResults(questions.map(() => QuestionResult.NOT_SHOW));
    } else handleShowCorrectAnswer();
  }, [showCorrectAnswer, studentAnswers]);

  const handleShowCorrectAnswer = () => {
    let results = studentAnswers.map((ans, index) => {
      const defaultMark = questions[index].defaultMark;
      return getQuizResultFromMark(ans.mark, defaultMark);
    });

    setQuestionResults(results);
  };

  useEffect(() => {
    if (countdownTimer <= 0) stopCountdown(handleCountdownEnd);
  }, [countdownTimer]);

  const handleCountdownEnd = () => {
    setShowCorrectAnswer(true);
    handleFinishQuizResponse();
  };
  const handleFlagChange = (index: number) => {
    const newFlags = [...flags];
    newFlags[index] = !newFlags[index];
    setFlags(newFlags);
  };
  const handleCancelFinishAttempt = () => {};
  const handleConfirmFinishAttempt = () => {
    setShowCorrectAnswer(true);
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
    if (timeLimit) startCountdown();
    else startTimer();
  };

  const handleFinishQuizResponse = () => {
    const completedTime = new Date();
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

    // Stop timer
    if (timeLimit) stopCountdown();
    else stopTimer(completedTime);
  };

  const handleCreateQuizResponseSuccess = (data: any) => {
    console.log("data", data);
    toast.success("Your quiz result has been saved successfully");
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

  const handleFinishReview = () => {
    router.back();
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
      <div className="sticky top-5 h-fit max-w-[320px] w-1/3">
        <Card className="p-4 space-y-4">
          <h5 className="text-orange-600">Annotation table</h5>
          <div className="flex flex-row justify-center">
            <h6 className="text-pink-600">Symbol</h6>
          </div>
          <div className="flex flex-col gap-2">
            {symbolAnnotations.map((annotation, index) => (
              <SymbolAnnotation
                key={index}
                symbol={annotation.symbol}
                description={annotation.description}
              />
            ))}
          </div>
          <div className="flex flex-row justify-center">
            <h6 className="bg-gradient-to-br from-violet-500 via-cyan-500 via-teal-500 to-yellow-500 inline-block text-transparent bg-clip-text">
              Color
            </h6>
          </div>
          <div className="flex flex-col gap-2">
            {colorAnnotations.map((annotation, index) => (
              <ColorAnnotation
                key={index}
                colorClassName={annotation.colorClassName}
                description={annotation.description}
              />
            ))}
          </div>
        </Card>
      </div>
      <div className="fixed top-5 right-[350px] z-10">
        {timeLimit ? (
          <QuizCountdown countdown={countdownTimer} status={countdownStatus} />
        ) : (
          <QuizTimer timer={timer} status={timerStatus} />
        )}
      </div>
      <div className={cn("relative w-full flex flex-col gap-10")}>
        {quizResponse && showCorrectAnswer && (
          <QuizAttemptResult quizResponse={quizResponse} />
        )}
        {questions.map((question, index) => (
          <QuestionDisplay
            key={index}
            editMode={true}
            questionIndex={index}
            totalQuestions={totalQuestions}
            question={question}
            showCorrectAnswer={showCorrectAnswer}
            studentAnswer={studentAnswers[index]}
            isFlagged={flags[index]}
            result={questionResults[index]}
            onFlagChange={() => handleFlagChange(index)}
            onQuizAnswerChange={handleQuizAnswerChange}
          />
        ))}
      </div>

      <div className="sticky top-5 h-fit max-w-[320px] w-1/3 ">
        <Card className="sticky top-24 p-4 space-y-4">
          <h5 className="text-orange-600">Quiz navigation</h5>
          <div className="flex gap-2">
            {questions.map((_, index) => (
              <QuestionBlock
                key={index}
                questionIndex={index}
                isFlagged={flags[index]}
                hasAnswered={hasAnswers[index]}
                questionResult={questionResults[index]}
                onClick={() => handleScrollToQuestion(index)}
              />
            ))}
          </div>

          {quizResponseData.status === QuizStatus.NOT_FINISHED && (
            <CustomDialog
              variant={isMissingAnswer ? "warning" : "success"}
              title={dialogTitle}
              content={
                <span>{"Are you sure you want to submit your quiz?"}</span>
              }
              onYes={handleConfirmFinishAttempt}
              onCancel={handleCancelFinishAttempt}
            >
              <Button variant="default">Finish attempt</Button>
            </CustomDialog>
          )}

          {quizResponseData.status === QuizStatus.FINISHED && (
            <Button variant="default" onClick={handleFinishReview}>
              Finish review
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
};

export default QuizAttempting;
