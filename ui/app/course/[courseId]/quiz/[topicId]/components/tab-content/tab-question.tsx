"use client";
import Banner from "@/components/ui/banner";
import { cn } from "@/lib/utils";
import { Question } from "@/models/question";
import { StudentResponse } from "@/models/student-response";
import { QuizTopic } from "@/models/topic";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import QuestionList from "../question/question-list";
import { QuizOpenCloseState } from "./_components/static-data";

interface Props {
  quiz: QuizTopic;
  questionsBank: Question[];
  quizResponses: StudentResponse[];
  onQuizChange?: (quiz: QuizTopic) => void;
  onReorderedQuestion?: (data: Question[]) => void;
  onRemoveQuestion?: (index: number) => void;
  onAddQuestionsFromBank?: (question: Question[]) => void;
  onSave?: () => void;
}
const TabQuestion = ({
  quiz,
  questionsBank,
  quizResponses,
  onQuizChange,
  onRemoveQuestion,
  onReorderedQuestion,
  onAddQuestionsFromBank,
  onSave,
}: Props) => {
  const { questions, close, open } = quiz.data;
  const [quizQuestionToRefresh, setQuizQuestionToRefresh] = useState<
    Question[]
  >([]);

  useEffect(() => {
    setQuizQuestionToRefresh(questions);
  }, []);

  const handleCancelQuestionChange = () => {
    if (onQuizChange) {
      onQuizChange({
        ...quiz,
        data: {
          ...quiz.data,
          questions: quizQuestionToRefresh,
        },
      });
    }
  };

  const quizOpenCloseState: QuizOpenCloseState = useMemo(() => {
    const timeOpen = open ? Math.floor(new Date(open).getTime() / 1000) : null;
    const timeClose = close
      ? Math.floor(new Date(close).getTime() / 1000)
      : null;
    const currentTime = Math.floor(new Date().getTime() / 1000);

    if (timeOpen && timeClose) {
      if (timeOpen > currentTime) return QuizOpenCloseState.NOT_OPEN;
      if (timeClose < currentTime) return QuizOpenCloseState.ENDED;
      return QuizOpenCloseState.OPEN;
    } else if (!timeOpen && timeClose) {
      if (timeClose < currentTime) return QuizOpenCloseState.ENDED;
      return QuizOpenCloseState.OPEN;
    } else if (!timeClose && timeOpen) {
      if (timeOpen > currentTime) return QuizOpenCloseState.NOT_OPEN;
      return QuizOpenCloseState.OPEN;
    } else return QuizOpenCloseState.OPEN;
  }, [open, close]);
  const formatTime = (time: string) => {
    const date = new Date(time);
    return (
      format(date, "EEEE, MMMM dd, yyyy") + " at " + format(date, "HH:mm a")
    );
  };
  const quizOpenCloseStateString = useMemo(() => {
    switch (quizOpenCloseState) {
      case QuizOpenCloseState.OPEN:
        return "This quiz is opening now";
      case QuizOpenCloseState.ENDED:
        return "This quiz ended" + (close ? ` at ${formatTime(close)}` : "");
      case QuizOpenCloseState.NOT_OPEN:
        return "This quiz will open at " + (open ? formatTime(open) : "");
    }
  }, [quizOpenCloseState, open, close]);

  const attempts = useMemo(() => {
    return quizResponses.length;
  }, [quizResponses]);
  const totalMarks = useMemo(() => {
    return questions.reduce((acc, question) => acc + question.defaultMark, 0);
  }, [questions]);

  return (
    <div className="w-full space-y-4">
      <h4 className="text-orange-500">Questions</h4>

      {attempts > 0 && (
        <Banner variant="warning">
          <div>
            <span>{`You cannot add or remove question because this quiz has been attempted (`}</span>
            <span className="text-indigo-700">{`Attempts: ` + attempts}</span>
            <span>{`)`}</span>
          </div>
        </Banner>
      )}
      <div className="flex flex-row items-center justify-between text-slate-600 font-medium">
        <p>{`Number of questions: ${questions.length}`}</p>
        <div
          className={cn(
            "px-4 py-2 rounded-md",
            quizOpenCloseState === QuizOpenCloseState.OPEN &&
              "bg-green-50 text-green-500",
            quizOpenCloseState === QuizOpenCloseState.ENDED &&
              "bg-red-50 text-red-500",
            quizOpenCloseState === QuizOpenCloseState.NOT_OPEN &&
              "bg-yellow-50 text-yellow-500"
          )}
        >
          {quizOpenCloseStateString}
        </div>
        <p>{`Total marks: ${totalMarks}`}</p>
      </div>
      <QuestionList
        questions={questions}
        questionsBank={questionsBank}
        canEdit={attempts === 0}
        onRemoveQuestion={onRemoveQuestion}
        onReorderedQuestion={onReorderedQuestion}
        onAddQuestionsFromBank={onAddQuestionsFromBank}
        onSave={onSave}
        onCancel={handleCancelQuestionChange}
      />
    </div>
  );
};

export default TabQuestion;
