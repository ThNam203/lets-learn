import { fakeUser } from "@/fake-data/user";
import { Button } from "@/lib/shadcn/button";
import EditorDisplay from "@/lib/tinymce/editor-display";
import { cn, getTimeStringByDuration } from "@/lib/utils";
import {
  attemptsAllowedOptions,
  getSecondFromTimeLimitType,
  GradingMethod,
  QuizData,
} from "@/models/quiz";
import {
  getQuizResponseMark,
  QuizResponseData,
  QuizStatus,
  sortQuizResponsesByCompletedDate,
  StudentResponse,
} from "@/models/student-response";
import { nanoid } from "@reduxjs/toolkit";
import { format } from "date-fns";
import { SearchCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { TabInTab } from "../static-data";
import QuizAttemptResult from "./_components/quiz-attempting-tab/quiz-attempt-result";
import { QuizTopic } from "@/models/topic";

interface Props {
  quiz: QuizTopic;
  quizResponses: StudentResponse[];
  onSelectQuizResponse?: (quizResponse: StudentResponse) => void;
  onQuizResponsesChange?: (quizResponses: StudentResponse[]) => void;
  onTabInTabChange?: (tab: TabInTab) => void;
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
  const router = useRouter();
  const thisUser = fakeUser;
  const { data, id } = quiz;
  const {
    open,
    close,
    description,
    questions,
    attemptAllowed,
    gradingMethod,
    timeLimit,
    timeLimitUnit,
  } = data;
  data as QuizData;
  console.log("quiz", quiz);

  const handlePreviewQuiz = () => {
    router.push(`/quiz-attempting/${quiz.id}`);
  };

  const handleFinishLastPreview = () => {
    //get last quiz response
    const lastIndex = quizResponses.length - 1;
    const lastQuizResponse = quizResponses[lastIndex];
    if (onSelectQuizResponse) onSelectQuizResponse(lastQuizResponse);
    if (onTabInTabChange) onTabInTabChange(TabInTab.QUIZ_ATTEMPTING_TAB);
  };

  const handleReviewQuiz = (index: number) => {
    const quizToReview = quizResponses[index];
    if (onSelectQuizResponse) onSelectQuizResponse(quizToReview);
    if (onTabInTabChange) onTabInTabChange(TabInTab.QUIZ_ATTEMPTING_TAB);
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
      topicId: id,
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
    gradeToShow >= fullMarkOfQuiz * 0.5 && gradeToShow < fullMarkOfQuiz * 0.8;
  const isBad = gradeToShow < fullMarkOfQuiz * 0.5;
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
    if (!timeLimit) return "No time limit";
    const duration = getSecondFromTimeLimitType(timeLimit, timeLimitUnit);
    return getTimeStringByDuration(duration);
  }, [timeLimit, timeLimitUnit]);

  const openTime = open
    ? format(new Date(open), "EEEE, dd MMMM yyyy, h:mm a")
    : null;
  const closeTime = close
    ? format(new Date(close), "EEEE, dd MMMM yyyy, h:mm a")
    : null;

  return (
    <div className={cn(className)}>
      <div className="pb-4 space-y-2 border-b-[0.5px] border-gray-300 text-gray-700">
        {openTime && (
          <p>
            <span className="font-bold">Open: </span>
            <span className="text-gray-500">{openTime}</span>
          </p>
        )}
        {closeTime && (
          <p>
            <span className="font-bold">Close: </span>
            <span className="text-gray-500">{closeTime}</span>
          </p>
        )}
      </div>
      <EditorDisplay className="text-gray-500" htmlString={description} />
      <div className="space-y-4">
        {!hasLastReviewQuiz && (
          <Button variant="cyan" className="w-fit" onClick={handlePreviewQuiz}>
            <SearchCheck size={16} />
            Preview quiz
          </Button>
        )}
        {hasLastReviewQuiz && (
          <Button
            variant="cyan"
            className="w-fit"
            onClick={handleFinishLastPreview}
          >
            <SearchCheck size={16} />
            Continue last review
          </Button>
        )}

        {timeLimit && (
          <p className="text-sm text-slate-600">
            {`Time limit: ${timeLimitString}`}
          </p>
        )}
        {attemptAllowed !== attemptsAllowedOptions[0] && (
          <p className="text-sm text-gray-500">
            {`Attempts allowed: ${attemptAllowed}`}
          </p>
        )}
        <p className="text-sm text-gray-500">
          {`Grading method: ${gradingMethod}`}
        </p>
        {hasFinishedQuiz && (
          <div className="flex flex-col gap-4 mt-8">
            <h5
              className={cn(
                "font-semibold",
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
    </div>
  );
};

export default TabQuiz;
