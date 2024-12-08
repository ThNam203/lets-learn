"use client";
import QuizAttemptResult from "@/app/course/[courseId]/quiz/[topicId]/components/quiz/quiz-attempt-result";
import {
  getQuizResultFromMark,
  QuestionResult,
} from "@/app/course/[courseId]/quiz/[topicId]/components/static-data";
import { Button } from "@/lib/shadcn/button";
import { cn, scrollTo } from "@/lib/utils";
import { QuizResponseData, StudentResponse } from "@/models/student-response";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Anotation from "../../../components/anotation/anotation";
import QuestionDisplay from "../../../components/question-display/question-display";
import QuestionBlock from "../../../components/question-navigation-box/question-block";
import StickyCard from "../../../components/sticky-card/sticky-card";

interface Props {
  className?: string;
  quizResponse: StudentResponse;
}
const QuizReview = ({ className, quizResponse }: Props) => {
  const router = useRouter();
  const quizResponseData = quizResponse.data as QuizResponseData;
  const { answers: studentAnswers } = quizResponseData;
  const totalQuestions = studentAnswers.length;

  const [questionResults, setQuestionResults] = useState<QuestionResult[]>(
    studentAnswers.map(() => QuestionResult.NOT_SHOW)
  );

  useEffect(() => {
    handleShowCorrectAnswer();
  }, []);

  const handleShowCorrectAnswer = () => {
    let results = studentAnswers.map((ans) => {
      return getQuizResultFromMark(ans.mark, ans.question.defaultMark);
    });

    setQuestionResults(results);
  };

  const handleFinishReview = () => {
    router.back();
  };

  const handleScrollToQuestion = (index: number) => {
    scrollTo(`question-${index + 1}`);
  };

  return (
    <div
      className={cn(
        "relative w-full h-full flex flex-row justify-between gap-5",
        className
      )}
    >
      <Anotation />

      <div className={cn("relative w-full flex flex-col gap-10")}>
        {quizResponse && <QuizAttemptResult quizResponse={quizResponse} />}
        {studentAnswers.map((answer, index) => (
          <QuestionDisplay
            key={index}
            editMode={true}
            questionIndex={index}
            totalQuestions={totalQuestions}
            question={answer.question}
            studentAnswer={answer}
            showCorrectAnswer={true}
            result={questionResults[index]}
          />
        ))}
      </div>

      <StickyCard>
        <h5 className="text-orange-600">Quiz navigation</h5>
        <div className="flex gap-2">
          {studentAnswers.map((_, index) => (
            <QuestionBlock
              key={index}
              questionIndex={index}
              hasAnswered={true}
              questionResult={questionResults[index]}
              onClick={() => handleScrollToQuestion(index)}
            />
          ))}
        </div>

        <Button variant="default" onClick={handleFinishReview}>
          Finish review
        </Button>
      </StickyCard>
    </div>
  );
};

export default QuizReview;
