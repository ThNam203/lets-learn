"use client";
import { Button } from "@/lib/shadcn/button";
import { Question } from "@/models/question";
import { Trash2 } from "lucide-react";
import { questionIconMap } from "../static-data";
import { cn } from "@/lib/utils";

interface Props {
  rowIndex: number;
  data: Question;
  isEditting?: boolean;
  onEdit?: (question: Question) => void;
  onRemove?: (index: number) => void;
  className?: string;
}
const QuestionRow = ({
  data,
  rowIndex,
  isEditting,
  onRemove,
  onEdit,
  className,
}: Props) => {
  const { type, questionName } = data;
  const handleEdit = () => {
    if (onEdit) onEdit(data);
  };
  const handleRemove = () => {
    if (onRemove) onRemove(rowIndex);
  };
  return (
    <div className={cn("flex-1", className)}>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          <p className="text-sm">{rowIndex + 1}</p>
          <p>{questionIconMap[type]}</p>
          <Button
            variant="link"
            className="h-fit text-cyan-700 px-2 py-0"
            onClick={handleEdit}
          >
            {questionName}
          </Button>
        </div>
        {isEditting && (
          <div className="flex flex-row items-center">
            <Trash2
              size={20}
              className="cursor-pointer hover:text-red-500 text-gray-500 transition-all duration-200 delay-100 group-hover:delay-0 opacity-0 group-hover:opacity-100"
              onClick={handleRemove}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionRow;
