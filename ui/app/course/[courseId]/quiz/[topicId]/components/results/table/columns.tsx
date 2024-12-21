"use client";
import { DataTableColumnHeader } from "@/components/table/my_table_column_header";
import {
  defaultIndexColumn,
  defaultSelectColumn,
} from "@/components/table/my_table_default_column";
import { Button } from "@/lib/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/shadcn/dropdown-menu";
import { cn, getDurationText } from "@/lib/utils";
import {
  getQuizResponseMark,
  getQuizResponseTotalMark,
  QuizResponseData,
  StudentResponse,
} from "@/models/student-response";
import { User } from "@/models/user";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pen, Trash2 } from "lucide-react";
import Image from "next/image";
import { getGradeColor } from "../../utils";

const resultColumnTitles = {
  id: "ID",
  image: "Image",
  name: "Student name",
  email: "Email",
  status: "Status",
  duration: "Duration",
  grade: "Grade",
  startedAt: "Started at",
  completedAt: "Completed at",
};

const resultColumnVisibility = {
  id: false,
  image: true,
  name: true,
  email: true,
  status: true,
  duration: true,
  grade: true,
  startedAt: false,
  completedAt: false,
};

const imageColumn = (title: string): ColumnDef<StudentResponse> => {
  const col: ColumnDef<StudentResponse> = {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={title} />
    ),
    cell: ({ row }) => {
      const student: User = row.getValue("student");
      let imageUrl = "/default-user.png";
      if (student && student.image) imageUrl = student.image;

      return (
        <div className="px-2">
          <Image
            className="w-[30px] h-[30px] object-cover rounded-full"
            src={imageUrl}
            width={100}
            height={100}
            alt="User avatar"
          />
        </div>
      );
    },
    enableSorting: false,
  };
  return col;
};

const studentNameColumn = (title: string): ColumnDef<StudentResponse> => {
  const col: ColumnDef<StudentResponse> = {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={title} />
    ),
    cell: ({ row }) => {
      const student: User = row.getValue("student");
      let name = "Anonymous";
      if (student && student.username) name = student.username;

      return <p className="px-2 w-[150px]">{name}</p>;
    },
    enableSorting: true,
  };
  return col;
};
const emailColumn = (title: string): ColumnDef<StudentResponse> => {
  const col: ColumnDef<StudentResponse> = {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={title} />
    ),
    cell: ({ row }) => {
      const student: User = row.getValue("student");
      let email = "anonymous@gmail.com";
      if (student && student.email) email = student.email;

      return <p className="px-2">{email}</p>;
    },
    enableSorting: true,
  };
  return col;
};

const statusColumn = (title: string): ColumnDef<StudentResponse> => {
  const col: ColumnDef<StudentResponse> = {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={title} />
    ),
    cell: ({ row }) => {
      const quizResponseData = row.getValue("data") as QuizResponseData;
      let status = "Error";
      if (quizResponseData && quizResponseData.status)
        status = quizResponseData.status;

      return <p className="px-2">{status}</p>;
    },
    enableSorting: true,
  };
  return col;
};
const durationColumn = (title: string): ColumnDef<StudentResponse> => {
  const col: ColumnDef<StudentResponse> = {
    accessorKey: "duration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={title} />
    ),
    cell: ({ row }) => {
      const quizResponseData = row.getValue("data") as QuizResponseData;
      let duration = "Error";
      if (quizResponseData) {
        const startedAt: string = quizResponseData.startedAt;
        const completedAt: string = quizResponseData.completedAt;
        duration = getDurationText(startedAt, completedAt);
      }

      return <p className="px-2">{duration}</p>;
    },
    enableSorting: true,
  };
  return col;
};

const gradeColumn = (title: string): ColumnDef<StudentResponse> => {
  const col: ColumnDef<StudentResponse> = {
    accessorKey: "grade",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={title} />
    ),
    cell: ({ row }) => {
      const quizResponseData = row.getValue("data") as QuizResponseData;
      const grade = getQuizResponseMark(quizResponseData);
      const maxGrade = getQuizResponseTotalMark(quizResponseData);
      const color = getGradeColor(grade, maxGrade);

      return <p className={cn("px-2", color)}>{grade}</p>;
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
}: ActionColumnProps): ColumnDef<StudentResponse> => {
  const col: ColumnDef<StudentResponse> = {
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

interface ResultTableProps {
  onEdit?: (questionId: string) => void;
  onDelete?: (questionId: string) => void;
}
const resultTableColumns = ({
  onEdit,
  onDelete,
}: ResultTableProps): ColumnDef<StudentResponse>[] => {
  const columns: ColumnDef<StudentResponse>[] = [
    defaultSelectColumn<StudentResponse>(),
    defaultIndexColumn<StudentResponse>(),
    imageColumn(resultColumnTitles.image),
    studentNameColumn(resultColumnTitles.name),
    emailColumn(resultColumnTitles.email),
    statusColumn(resultColumnTitles.status),
    durationColumn(resultColumnTitles.duration),
    gradeColumn(resultColumnTitles.grade),
    actionColumn({ onEdit, onDelete }),
  ];

  return columns;
};

export { resultColumnTitles, resultColumnVisibility, resultTableColumns };
