import DraggableContainer from "@/lib/@hello-pangea/draggable-container";
import { Question } from "@/models/question";
import React, { useEffect, useState } from "react";
import CreateQuestionDialog from "../question-bank/dialog/create-question-dialog";
import { QuestionType } from "../static-data";
import QuestionAddButton from "./question-add-button";
import QuestionRow from "./question-row";
import GetQuestionFromBankDialog from "../question-bank/dialog/get-question-from-bank-dialog";
import { notFound, useRouter } from "next/navigation";
import { Button } from "@/lib/shadcn/button";

interface Props {
  questions: Question[];
  questionsBank: Question[];
  canEdit?: boolean;
  onReorderedQuestion?: (data: Question[]) => void;
  onAddQuestionsFromBank?: (question: Question[]) => void;
  onRemoveQuestion?: (index: number) => void;
  onSave?: () => void;
  onCancel?: () => void;
}
const QuestionList = ({
  questions,
  questionsBank,
  canEdit = true,
  onAddQuestionsFromBank,
  onRemoveQuestion,
  onReorderedQuestion,
  onSave,
  onCancel,
}: Props) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
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
  const toggleEdit = () => setIsEditing(!isEditing);
  const handleAddNewQuestion = (type: QuestionType) => {
    if (type === QuestionType.CHOICE) router.push("/question/choice/create");
    else if (type === QuestionType.SHORT_ANSWER)
      router.push("/question/short-answer/create");
    else if (type === QuestionType.TRUE_FALSE)
      router.push("/question/true-false/create");
  };

  const handleSave = () => {
    toggleEdit();
    if (onSave) onSave();
  };

  const handleCancel = () => {
    toggleEdit();
    if (onCancel) onCancel();
  };

  return (
    <div className="flex flex-col gap-2">
      {questions.length === 0 && <div>No question here</div>}
      {questions.length > 0 && (
        <DraggableContainer
          data={questions}
          onReordered={onReorderedQuestion}
          itemClassName="bg-cyan-100 shadow"
          draggable={isEditing}
          renderItem={(question, index) => (
            <QuestionRow
              key={index}
              data={question}
              rowIndex={index}
              isEditting={isEditing}
              onEdit={handleEdit}
              onRemove={onRemoveQuestion}
            />
          )}
        />
      )}
      {canEdit && (
        <div className="ml-auto space-x-2">
          {!isEditing && (
            <Button
              variant="link"
              className="h-fit text-cyan-700 p-0 space-x-1"
              onClick={toggleEdit}
            >
              Edit
            </Button>
          )}
          {isEditing && (
            <Button
              variant="link"
              className="h-fit text-green-500 p-0 space-x-1"
              onClick={handleSave}
            >
              Save
            </Button>
          )}
          {isEditing && (
            <Button
              variant="link"
              className="h-fit text-red-500 p-0 space-x-1"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          )}
          {isEditing && (
            <QuestionAddButton
              onAddNewQuestion={() => setOpenAddNewQuestionDialog(true)}
              onAddQuestionFromBank={() =>
                setOpenAddQuestionFromBankDialog(true)
              }
            />
          )}
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
