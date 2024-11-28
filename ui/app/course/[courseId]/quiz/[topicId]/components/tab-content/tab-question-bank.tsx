import CustomDialog from "@/components/ui/custom-dialog";
import { Button } from "@/lib/shadcn/button";
import { Question } from "@/models/question";
import { CirclePlus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import CreateQuestionDialog from "../question-bank/dialog/create-question-dialog";
import QuestionTable from "../question-bank/table/question-table";
import { QuestionStatus, QuestionType } from "../static-data";

interface Props {
  questions: Question[];
  onQuestionsChange?: (questions: Question[]) => void;
}
const TabQuestionBank = ({ questions, onQuestionsChange }: Props) => {
  const router = useRouter();
  const { courseId } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState<{
    title: string;
    content: string;
    variant: string;
  }>({
    title: "Delete question",
    content:
      "Once you delete this quesstion, you won’t be able to undo your action. Are you sure you want to delete this question?",
    variant: "warning",
  });
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);

  const handleAddQuestion = (type: QuestionType) => {
    const prefix = courseId ? `/course/${courseId}` : "";
    if (type === QuestionType.CHOICE)
      router.push(`${prefix}/question/choice/create`);
    else if (type === QuestionType.SHORT_ANSWER)
      router.push(`${prefix}/question/short-answer/create`);
    else if (type === QuestionType.TRUE_FALSE)
      router.push(`${prefix}/question/true-false/create`);
  };

  const handleEditQuestion = (id: string) => {
    const question = questions.find((q) => q.id === id);
    if (!question) {
      toast.error("Question not found");
      return;
    }
    const prefix = courseId ? `/course/${courseId}` : "";
    const { type } = question;
    if (type === QuestionType.CHOICE)
      router.push(`${prefix}/question/choice/edit/${question.id}`);
    else if (type === QuestionType.SHORT_ANSWER)
      router.push(`${prefix}/question/short-answer/edit/${question.id}`);
    else if (type === QuestionType.TRUE_FALSE)
      router.push(`${prefix}/question/true-false/edit/${question.id}`);
  };

  const handleConfirmDeleteQuestions = async (questions: Question[]) => {
    if (questions.length === 0) {
      toast.error("No question found");
      return;
    }
    setSelectedQuestions(questions);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDeleteQuestion = (id: string) => {
    const questionToDelete = questions.find((q) => q.id === id);
    if (!questionToDelete) {
      toast.error("Question not found");
      return;
    }
    setSelectedQuestions([questionToDelete]);
    setOpenConfirmDialog(true);
  };

  const handleDeleteQuestions = async (questions: Question[]) => {
    handleDeleteQuestionByIds(questions.map((q) => q.id));
  };
  const handleDeleteQuestionByIds = async (ids: string[]) => {
    const newQuestions = questions.filter((q) => !ids.includes(q.id));
    console.log("new question after delete", newQuestions);
    if (onQuestionsChange) onQuestionsChange(newQuestions);
  };

  const handleYes = () => {
    handleDeleteQuestionByIds(selectedQuestions.map((q) => q.id));
    setSelectedQuestions([]);
    setOpenConfirmDialog(false);
  };

  const handleCancel = () => {
    setOpenConfirmDialog(false);
  };

  const handleStatusChange = (id: string, status: string) => {
    const questionToChange = questions.find((q) => q.id === id);
    if (!questionToChange) {
      toast.error("Question not found");
      return;
    }
    questionToChange.status = status as QuestionStatus;
    const newQuestions = questions.map((q) =>
      q.id === id ? questionToChange : q
    );
    if (onQuestionsChange) onQuestionsChange(newQuestions);
  };

  const handleQuestionNameChange = (id: string, name: string) => {
    const questionToChange = questions.find((q) => q.id === id);
    if (!questionToChange) {
      toast.error("Question not found");
      return;
    }
    questionToChange.questionName = name;
    const newQuestions = questions.map((q) =>
      q.id === id ? questionToChange : q
    );
    if (onQuestionsChange) onQuestionsChange(newQuestions);
  };

  const buttons = [
    <CreateQuestionDialog
      key={0}
      open={openDialog}
      onOpenChange={setOpenDialog}
      onAddQuestion={handleAddQuestion}
    >
      <Button variant="default">
        <CirclePlus size={16} />
        Create a new question
      </Button>
    </CreateQuestionDialog>,
  ];

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="space-y-2">
        <h4 className="text-orange-500">Question bank</h4>
        <QuestionTable
          data={questions}
          buttons={buttons}
          otherFunctions={{
            onEdit: handleEditQuestion,
            onDelete: handleConfirmDeleteQuestion,
            onDeleteMany: handleDeleteQuestions,
            onStatusChange: handleStatusChange,
            onQuestionNameChange: handleQuestionNameChange,
          }}
        />
        <CustomDialog
          control={{ open: openConfirmDialog, setOpen: setOpenConfirmDialog }}
          variant="warning"
          title={dialogInfo.title}
          content={<span>{dialogInfo.content}</span>}
          onYes={handleYes}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default TabQuestionBank;
