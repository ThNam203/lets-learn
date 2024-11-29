"use client";
import { DataTableColumnHeader } from "@/components/table/my_table_column_header";
import {
  defaultColumn,
  defaultIndexColumn,
  defaultSelectColumn,
} from "@/components/table/my_table_default_column";
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/lib/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/shadcn/dropdown-menu";
import { Question } from "@/models/question";
import { ColumnDef } from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronsUpDown,
  MoreHorizontal,
  Pen,
  Trash2,
} from "lucide-react";
import { questionIconMap, QuestionStatus } from "../../static-data";
import QuestionNameColumn from "./question-name-column";

const questionColumnTitles = {
  id: "ID",
  type: "Type",
  questionName: "Question name",
  defaultMark: "Default mark",
  status: "Status",
  usage: "Usage",
  createdAt: "Created at",
  createdBy: "Created by",
  modifiedBy: "Modified by",
  modifiedAt: "Modified at",
};

const questionColumnVisibility = {
  id: false,
  type: true,
  questionName: true,
  status: true,
  defaultMark: true,
  createdAt: false,
  createdBy: false,
  modifiedBy: false,
  modifiedAt: true,
  usage: true,
};

const questionTypeColumn = (
  accessorKey: string,
  title: string
): ColumnDef<Question> => {
  const col: ColumnDef<Question> = {
    accessorKey: accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={title} />
    ),
    cell: ({ row }) => {
      let questionType: string = row.getValue(accessorKey);

      return (
        <div className="w-[50px] px-2">
          {questionIconMap[questionType as keyof typeof questionIconMap]}
        </div>
      );
    },
    enableSorting: true,
  };
  return col;
};

const questionNameColumn = (
  accessorKey: string,
  title: string,
  onQuestionNameChange?: (questionId: string, questionName: string) => void
): ColumnDef<Question> => {
  const col: ColumnDef<Question> = {
    accessorKey: accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={title} />
    ),
    cell: ({ row }) => {
      let questionName: string = row.getValue(accessorKey);

      const handleQuestionNameChange = (questionName: string) => {
        if (onQuestionNameChange) {
          onQuestionNameChange(row.getValue("id"), questionName);
        }
      };
      return (
        <QuestionNameColumn
          questionName={questionName}
          onChange={handleQuestionNameChange}
        />
      );
    },
    enableSorting: true,
  };
  return col;
};

const questionStatusColumn = (
  accessorKey: string,
  title: string,
  onStatusChange?: (questionId: string, status: string) => void
): ColumnDef<Question> => {
  const col: ColumnDef<Question> = {
    accessorKey: accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={title} />
    ),
    cell: ({ row }) => {
      let questionStatus: string = row.getValue(accessorKey);

      const handleComboboxChange = (value: string) => {
        if (onStatusChange) onStatusChange(row.getValue("id"), value);
      };

      const questionStatusOptions = Object.values(QuestionStatus);
      return (
        <Combobox
          showSearch={false}
          initialValue={questionStatus}
          options={questionStatusOptions}
          onChange={handleComboboxChange}
          className="w-40 px-2"
          popoverClassName="w-40"
        >
          <Button variant="outline" className="w-full justify-between">
            {questionStatus}
            <ChevronDown size={20} className="ml-2 shrink-0 text-indigo-700" />
          </Button>
        </Combobox>
      );
    },
    enableSorting: true,
  };
  return col;
};

const questionCreateByColumn = (
  accessorKey: string,
  title: string
): ColumnDef<Question> => {
  const col: ColumnDef<Question> = {
    accessorKey: accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={title} />
    ),
    cell: ({ row }) => {
      let createBy: any = row.getValue(accessorKey);

      return (
        <div className="w-[50px] px-2">{createBy.username || "not found"}</div>
      );
    },
    enableSorting: true,
  };
  return col;
};

interface ActionColumnProps {
  onEdit?: (questionId: string) => void;
  onDelete?: (questionId: string) => void;
}
const actionColumn = ({
  onEdit,
  onDelete,
}: ActionColumnProps): ColumnDef<Question> => {
  const col: ColumnDef<Question> = {
    id: "Action",
    cell: ({ row }) => {
      let id: string = row.getValue("id");
      const handleEdit = () => {
        if (onEdit) onEdit(id);
      };
      const handleDelete = () => {
        if (onDelete) onDelete(id);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-6 h-6 p-0 bg-transparent hover:bg-gray-200 dark:hover:bg-white/10 hover:opacity-100 text-black">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white font-sans z-50">
            <DropdownMenuItem
              className="flex gap-1 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer ease-linear duration-100"
              onClick={handleEdit}
            >
              <Pen size={14} />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex gap-1 text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer ease-linear duration-100"
              onClick={handleDelete}
            >
              <Trash2 size={14} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: true,
  };
  return col;
};

interface QuestionTableProps {
  onEdit?: (questionId: string) => void;
  onDelete?: (questionId: string) => void;
  onStatusChange?: (questionId: string, status: string) => void;
  onQuestionNameChange?: (questionId: string, questionName: string) => void;
}
const questionTableColumns = ({
  onEdit,
  onDelete,
  onStatusChange,
  onQuestionNameChange,
}: QuestionTableProps): ColumnDef<Question>[] => {
  const columns: ColumnDef<Question>[] = [
    defaultSelectColumn<Question>(),
    defaultIndexColumn<Question>(),
  ];

  for (let key in questionColumnTitles) {
    let col: ColumnDef<Question>;
    if (key === "type")
      col = questionTypeColumn(key, questionColumnTitles[key]);
    else if (key === "questionName")
      col = questionNameColumn(
        key,
        questionColumnTitles[key],
        onQuestionNameChange
      );
    else if (key === "status")
      col = questionStatusColumn(
        key,
        questionColumnTitles[key],
        onStatusChange
      );
    else if (key === "createdBy" || key === "modifiedBy")
      col = questionCreateByColumn(key, questionColumnTitles[key]);
    else col = defaultColumn<Question>(key, questionColumnTitles);
    columns.push(col);
  }
  columns.push(actionColumn({ onEdit, onDelete }));

  return columns;
};

export { questionColumnTitles, questionColumnVisibility, questionTableColumns };
