"use client";
import {
  QuestionResult,
  QuestionType,
} from "@/app/course/[courseId]/quiz/[topicId]/components/static-data";
import { FlagIcon } from "@/components/icons/flag";
import useBubbleAnimation from "@/hooks/useBubbleAnimation/useBubbleAnimation";
import { Button } from "@/lib/shadcn/button";
import EditorDisplay from "@/lib/tinymce/editor-display";
import { cn } from "@/lib/utils";
import { ChoiceQuestion, Question } from "@/models/question";
import { QuizAnswer } from "@/models/student-response";
import { Settings2 } from "lucide-react";
import { useRouter } from "next/navigation";
import ChoicesDisplay from "../choice-answer/choices-display";
import ShortAnswerDisplay from "../short-answer/short-answer-display";
import { questionDescription } from "../static-data";
import TrueFalseChoiceDisplay from "../true-false-answer/true-fale-choice-display";
import QuestionFancyButton from "./question-fancy-button";

interface Props {
  questionIndex: number;
  totalQuestions: number;
  question: Question;
  description?: string;
  isFlagged?: boolean;
  result?: QuestionResult;
  studentAnswer: QuizAnswer;
  showCorrectAnswer?: boolean;
  editMode?: boolean;
  onFlagChange?: () => void;
  onQuizAnswerChange?: (quizAnswer: QuizAnswer) => void;
  onTabInTabQuestionChange?: (question: Question | undefined) => void;
}
const QuestionDisplay = ({
  questionIndex,
  totalQuestions,
  question,
  description,
  isFlagged,
  studentAnswer,
  showCorrectAnswer = false,
  result = QuestionResult.NOT_SHOW,
  editMode = false,
  onFlagChange,
  onQuizAnswerChange,
}: Props) => {
  const { type, defaultMark, data, id } = question;
  const { answer } = studentAnswer;
  const router = useRouter();

  const { bubbleClassName, handleMouseEnter, handleMouseOut } =
    useBubbleAnimation();

  const handleEditQuestion = () => {
    if (type === QuestionType.CHOICE)
      router.push(`/question/choice/edit/${id}`);
    else if (type === QuestionType.SHORT_ANSWER)
      router.push(`/question/short-answer/edit/${id}`);
    else if (type === QuestionType.TRUE_FALSE)
      router.push(`/question/true-false/edit/${id}`);
  };

  let desc;
  if (description) desc = description;
  else if (type === QuestionType.CHOICE) {
    const { multiple } = data as ChoiceQuestion;
    if (multiple) desc = questionDescription.MultipleChoice;
    else desc = questionDescription.SingleChoice;
  } else desc = questionDescription[type];
  const questionId = `question-${questionIndex + 1}`;

  return (
    <div id={questionId} className="flex flex-col gap-2 pt-5">
      {/* Question here */}
      <div
        className={cn(
          "relative flex flex-col gap-4 pt-8 pb-3 pl-6 pr-4 border border-slate-200 text-slate-600 rounded-md bg-white",
          result !== QuestionResult.NOT_SHOW ? "border-transparent" : "",
          result === QuestionResult.FULL_MARK
            ? "bg-green-50 text-green-500"
            : "",
          result === QuestionResult.ZERO_MARK ? "bg-red-50 text-red-500" : "",
          result === QuestionResult.PARTIAL_MARK
            ? "bg-yellow-50 text-yellow-500"
            : ""
        )}
      >
        <div className="absolute left-5 -top-5 flex flex-row items-center gap-2 text-slate-600 font-semibold cursor-pointer">
          <QuestionFancyButton onClick={onFlagChange}>
            <span className="ml-auto cursor-pointer">
              <FlagIcon variant={isFlagged ? "active" : "default"} />
            </span>
            <span>Question</span>
            <div className="flex flex-row items-center gap-1 text-white text-md font-semibold">
              <span>{questionIndex + 1}</span>
              <span>/</span>
              <span>{totalQuestions}</span>
            </div>
          </QuestionFancyButton>
          {/* Button for edit mode */}
          {editMode && (
            <Button
              className={cn(
                "w-10 h-10 p-0 bg-gradient-to-br from-fuchsia-500 to-indigo-500 text-white hover:shadow-sm flex items-center justify-center",
                bubbleClassName
              )}
              onMouseEnter={handleMouseEnter}
              onMouseOut={handleMouseOut}
              onClick={handleEditQuestion}
            >
              <Settings2 size={16} className="pointer-events-none" />
            </Button>
          )}
        </div>
        {/* Question mark here */}
        {showCorrectAnswer && studentAnswer && (
          <div className="absolute right-5 -top-5 flex flex-row items-center gap-1 text-slate-600 font-semibold">
            <QuestionFancyButton
              className={cn(
                result === QuestionResult.FULL_MARK &&
                  "bg-gradient-to-br from-lime-500 to-teal-500",
                result === QuestionResult.ZERO_MARK &&
                  "bg-gradient-to-br from-pink-500 to-red-500",
                result === QuestionResult.PARTIAL_MARK &&
                  "bg-gradient-to-br from-orange-500 to-yellow-500"
              )}
            >
              <span>{`Mark: ${studentAnswer.mark} / ${defaultMark}`}</span>
            </QuestionFancyButton>
          </div>
        )}

        <EditorDisplay
          htmlString={question.questionText}
          className="font-semibold"
        />
      </div>
      {/* Description here */}
      <p className="text-slate-600 text-sm">{desc}</p>
      {/* Answer here */}
      {question.type === QuestionType.CHOICE && (
        <ChoicesDisplay
          question={question}
          studentAnswer={answer}
          showCorrectAnswer={showCorrectAnswer}
          onQuizAnswerChange={onQuizAnswerChange}
        />
      )}
      {question.type === QuestionType.TRUE_FALSE && (
        <TrueFalseChoiceDisplay
          question={question}
          studentAnswer={answer}
          showCorrectAnswer={showCorrectAnswer}
          onQuizAnswerChange={onQuizAnswerChange}
        />
      )}
      {question.type === QuestionType.SHORT_ANSWER && (
        <ShortAnswerDisplay
          question={question}
          studentAnswer={answer}
          showCorrectAnswer={showCorrectAnswer}
          onQuizAnswerChange={onQuizAnswerChange}
        />
      )}
    </div>
  );
};

export default QuestionDisplay;
