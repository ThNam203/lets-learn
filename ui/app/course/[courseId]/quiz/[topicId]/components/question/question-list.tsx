import DraggableContainer from "@/lib/@hello-pangea/draggable-container";
import { Question } from "@/models/question";
import React, { useEffect, useState } from "react";
import CreateQuestionDialog from "../question-bank/dialog/create-question-dialog";
import { QuestionType } from "../static-data";
import QuestionAddButton from "./question-add-button";
import QuestionRow from "./question-row";
import GetQuestionFromBankDialog from "../question-bank/dialog/get-question-from-bank-dialog";
import { notFound, useRouter } from "next/navigation";

interface Props {
  questions: Question[];
  questionsBank: Question[];
  canAddOrRemoveQuestion?: boolean;
  onReorderedQuestion?: (data: Question[]) => void;
  onAddQuestionsFromBank?: (question: Question[]) => void;
  onRemoveQuestion?: (index: number) => void;
}
const QuestionList = ({
  questions,
  questionsBank,
  canAddOrRemoveQuestion = true,
  onAddQuestionsFromBank,
  onRemoveQuestion,
  onReorderedQuestion,
}: Props) => {
  const router = useRouter();
  const [openAddNewQuestionDialog, setOpenAddNewQuestionDialog] =
    useState(false);

  const [openAddQuestionFromBankDialog, setOpenAddQuestionFromBankDialog] =
    useState(false);
  const handleEdit = (question: Question) => {
    const { type, id } = question;
    if (type === QuestionType.CHOICE)
      router.push(`/question/choice/edit/${id}`);
    else if (type === QuestionType.SHORT_ANSWER)
      router.push(`/question/short-answer/edit/${id}`);
    else if (type === QuestionType.TRUE_FALSE)
      router.push(`/question/true-false/edit/${id}`);
  };
  const handleAddNewQuestion = (type: QuestionType) => {
    if (type === QuestionType.CHOICE) router.push("/question/choice/create");
    else if (type === QuestionType.SHORT_ANSWER)
      router.push("/question/short-answer/create");
    else if (type === QuestionType.TRUE_FALSE)
      router.push("/question/true-false/create");
  };

  return (
    <div className="flex flex-col gap-2">
      {questions.length === 0 && <div>No question here</div>}
      {questions.length > 0 && (
        <DraggableContainer
          data={questions}
          onReordered={onReorderedQuestion}
          itemClassName="bg-cyan-100 shadow"
          renderItem={(question, index) => (
            <QuestionRow
              key={index}
              data={question}
              rowIndex={index}
              canRemove={canAddOrRemoveQuestion}
              onEdit={handleEdit}
              onRemove={onRemoveQuestion}
            />
          )}
        />
      )}

      {canAddOrRemoveQuestion && (
        <div className="ml-auto">
          <QuestionAddButton
            onAddNewQuestion={() => setOpenAddNewQuestionDialog(true)}
            onAddQuestionFromBank={() => setOpenAddQuestionFromBankDialog(true)}
          />
          <CreateQuestionDialog
            open={openAddNewQuestionDialog}
            onOpenChange={setOpenAddNewQuestionDialog}
            onAddQuestion={handleAddNewQuestion}
          />
          <GetQuestionFromBankDialog
            questions={questions}
            questionsBank={questionsBank}
            open={openAddQuestionFromBankDialog}
            onOpenChange={setOpenAddQuestionFromBankDialog}
            onAddQuestionsFromBank={onAddQuestionsFromBank}
          />
        </div>
      )}
    </div>
  );
};

export default QuestionList;
