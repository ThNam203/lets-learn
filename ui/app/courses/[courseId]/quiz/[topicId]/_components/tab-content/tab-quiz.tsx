import { fakeUser } from "@/fake-data/user";
import { Button } from "@/lib/shadcn/button";
import { Separator } from "@/lib/shadcn/separator";
import { cn, getTextFromHtml, getTimeStringByDuration } from "@/lib/utils";
import { QuizData, Test } from "@/models/quiz";
import {
  getQuizResponseMark,
  QuizResponseData,
  QuizStatus,
  sortQuizResponsesByCompletedDate,
  StudentResponse,
} from "@/models/student-response";
import { nanoid } from "@reduxjs/toolkit";
import { SearchCheck } from "lucide-react";
import { useMemo } from "react";
import { toast } from "react-toastify";
import {
  attemptsAllowedOptions,
  getSecondFromTimeLimitType,
  GradingMethod,
  TabInTab,
} from "../static-data";
import QuizAttemptResult from "./_components/quiz-attempting-tab/quiz-attempt-result";

interface Props {
  quiz: Test;
  quizResponses: StudentResponse[];
  onSelectQuizResponse?: (quizResponse: StudentResponse) => void;
  onQuizResponsesChange?: (quizResponses: StudentResponse[]) => void;
  onTabInTabChange: (tab: TabInTab) => void;
  className?: string;
}
const TabQuiz = ({
  className,
  quiz,
  quizResponses,
  onTabInTabChange,
  onQuizResponsesChange,
  onSelectQuizResponse,
}: Props) => {
  const thisUser = fakeUser;
  const { data, name, description, timeLimit } = quiz;
  const { questions, attemptAllowed, gradingMethod } = data as QuizData;

  const handlePreviewQuiz = () => {
    initQuizResponse();
    onTabInTabChange(TabInTab.QUIZ_ATTEMPTING_TAB);
  };

  const handleFinishLastPreview = () => {
    //get last quiz response
    const lastIndex = quizResponses.length - 1;
    const lastQuizResponse = quizResponses[lastIndex];
    if (onSelectQuizResponse) onSelectQuizResponse(lastQuizResponse);
    onTabInTabChange(TabInTab.QUIZ_ATTEMPTING_TAB);
  };

  const handleReviewQuiz = (index: number) => {
    const quizToReview = quizResponses[index];
    if (onSelectQuizResponse) onSelectQuizResponse(quizToReview);
    onTabInTabChange(TabInTab.QUIZ_ATTEMPTING_TAB);
  };

  const handleRemoveQuizResponse = (index: number) => {
    const newQuizResponses = quizResponses.filter((_, i) => i !== index);
    if (onQuizResponsesChange) onQuizResponsesChange(newQuizResponses);
  };

  const initQuizResponse = () => {
    if (!thisUser) {
      toast.error("You must login to start the quiz");
      return;
    }
    const startTime = new Date().toISOString();

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
    if (onQuizResponsesChange)
      onQuizResponsesChange([...quizResponses, newQuizResponse]);
    if (onSelectQuizResponse) onSelectQuizResponse(newQuizResponse);
  };

  const handleGetHighestGrade = (quizResponses: StudentResponse[]) => {
    return quizResponses.reduce((cur, quizResponse) => {
      const { data } = quizResponse;
      return Math.max(cur, getQuizResponseMark(data as QuizResponseData));
    }, 0);
  };

  const handleGetAverageGrade = (quizResponses: StudentResponse[]) => {
    const grade =
      quizResponses.reduce((cur, quizResponse) => {
        const { data } = quizResponse;
        return cur + getQuizResponseMark(data as QuizResponseData);
      }, 0) / quizResponses.length;
    return grade;
  };

  const handleGetFirstAttemptGrade = (quizResponses: StudentResponse[]) => {
    const sortedByCompletedDate =
      sortQuizResponsesByCompletedDate(quizResponses);
    if (sortedByCompletedDate.length === 0) return 0;
    const firstAttempt = sortedByCompletedDate[0];
    const { data } = firstAttempt;
    return getQuizResponseMark(data as QuizResponseData);
  };

  const handleGetLastAttemptGrade = (quizResponses: StudentResponse[]) => {
    const sortedByCompletedDate = sortQuizResponsesByCompletedDate(
      quizResponses,
      false
    );
    if (sortedByCompletedDate.length === 0) return 0;
    const lastAttempt = sortedByCompletedDate[0];
    const { data } = lastAttempt;
    return getQuizResponseMark(data as QuizResponseData);
  };

  const fullMarkOfQuiz = useMemo(() => {
    return questions.reduce((cur, question) => cur + question.defaultMark, 0);
  }, [questions]);

  const gradeToShow = useMemo(() => {
    if (gradingMethod === GradingMethod.HIGHEST_GRADE)
      return handleGetHighestGrade(quizResponses);
    if (gradingMethod === GradingMethod.AVERAGE_GRADE)
      return handleGetAverageGrade(quizResponses);
    if (gradingMethod === GradingMethod.FIRST_GRADE)
      return handleGetFirstAttemptGrade(quizResponses);
    if (gradingMethod === GradingMethod.LAST_GRADE)
      return handleGetLastAttemptGrade(quizResponses);
    return 0;
  }, [quizResponses, gradingMethod]);
  const gradeTitle = useMemo(() => {
    if (gradingMethod === GradingMethod.HIGHEST_GRADE) return "Highest grade:";
    if (gradingMethod === GradingMethod.AVERAGE_GRADE) return "Average grade:";
    if (gradingMethod === GradingMethod.FIRST_GRADE) return "First grade:";
    if (gradingMethod === GradingMethod.LAST_GRADE) return "Last grade:";
    return "Grade";
  }, [gradingMethod]);
  const isExellent = gradeToShow >= fullMarkOfQuiz * 0.8;
  const isGood =
    gradeToShow >= fullMarkOfQuiz * 0.4 && gradeToShow < fullMarkOfQuiz * 0.8;
  const isBad = gradeToShow < fullMarkOfQuiz * 0.4;
  const hasFinishedQuiz = useMemo(() => {
    const quizResponseDatas = quizResponses.map(
      (quizResponse) => quizResponse.data as QuizResponseData
    );
    return quizResponseDatas.some(
      (quizResponseData) => quizResponseData.status === QuizStatus.FINISHED
    );
  }, [quizResponses]);

  //has the last quiz response not finished
  const hasLastReviewQuiz = useMemo(() => {
    if (quizResponses.length === 0) return false;
    const lastIndex = quizResponses.length - 1;
    const quizResponseData = quizResponses[lastIndex].data as QuizResponseData;
    return quizResponseData.status === QuizStatus.NOT_FINISHED;
  }, [quizResponses]);

  const quizResponsesToShow = useMemo(() => {
    const filteredQuizResponses = quizResponses.filter(
      (quizResponse) =>
        (quizResponse.data as QuizResponseData).status === QuizStatus.FINISHED
    );
    return sortQuizResponsesByCompletedDate(filteredQuizResponses);
  }, [quizResponses]);

  const timeLimitString = useMemo(() => {
    if (!timeLimit.enabled) return "No time limit";
    const duration = getSecondFromTimeLimitType(
      timeLimit.value,
      timeLimit.unit
    );
    return getTimeStringByDuration(duration);
  }, [timeLimit]);

  return (
    <div className={cn("space-y-6", className)}>
      <div className="bg-slate-50 rounded-md p-6 space-y-2">
        <h5 className="font-medium">{name}</h5>
        {getTextFromHtml(description) && <Separator />}
        {getTextFromHtml(description) && (
          <p className="text-sm text-slate-600">{description}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {!hasLastReviewQuiz && (
          <Button
            variant="default"
            className="w-fit"
            onClick={handlePreviewQuiz}
          >
            <SearchCheck size={16} />
            Preview quiz
          </Button>
        )}
        {hasLastReviewQuiz && (
          <Button
            variant="default"
            className="w-fit"
            onClick={handleFinishLastPreview}
          >
            <SearchCheck size={16} />
            Continue last review
          </Button>
        )}

        {timeLimit.enabled && (
          <p className="text-sm text-slate-600">
            {`Time limit: ${timeLimitString}`}
          </p>
        )}
        {attemptAllowed !== attemptsAllowedOptions[0] && (
          <p className="text-sm text-slate-600">
            {`Attempts allowed: ${attemptAllowed}`}
          </p>
        )}
        <p className="text-sm text-slate-600">
          {`Grading method: ${gradingMethod}`}
        </p>
      </div>
      {hasFinishedQuiz && (
        <div className="flex flex-col gap-4 mt-8">
          <h5
            className={cn(
              isExellent && "text-green-500",
              isGood && "text-yellow-500",
              isBad && "text-red-500"
            )}
          >{`${gradeTitle} ${gradeToShow} / ${fullMarkOfQuiz}`}</h5>
          <h5 className="text-orange-500">Your attempt</h5>

          <div className="flex flex-col gap-4">
            {quizResponsesToShow.map((quizResponse, index) => (
              <QuizAttemptResult
                key={index}
                responseIndex={quizResponses.length - index - 1}
                quizResponse={quizResponse}
                onReview={() => handleReviewQuiz(index)}
                onRemove={() => handleRemoveQuizResponse(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TabQuiz;
