"use client";
import { CustomDatatable } from "@/components/table/custom_datatable";
import { getFilterAllTableData } from "@/components/table/utils";
import { handleFilterColumn } from "@/lib/utils";
import { StudentResponse } from "@/models/student-response";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  resultColumnTitles,
  resultColumnVisibility,
  resultTableColumns,
} from "./columns";

interface OtherFunctions {
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDeleteMany?: (questions: StudentResponse[]) => Promise<any>;
}

interface Props {
  data: StudentResponse[];
  pagination?: {
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
  error?: string;
  buttons?: ReactNode[];
  otherFunctions: OtherFunctions;
}
const ResultTable = ({
  data,
  error,
  pagination,
  buttons,
  otherFunctions,
}: Props) => {
  const router = useRouter();
  const [filteredData, setFilteredData] = useState<StudentResponse[]>([]);
  const filterOptionKeys = Object.keys(resultColumnTitles).map((key) => key);
  console.log("data", data);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  //   const handlePublishFilter = (filterInput: string, data: Question[]) => {
  //     const filteredData = data.filter((course) => {
  //       const isPublished = course.isPublished ? "Published" : "Draft";
  //       return isPublished.toLowerCase().startsWith(filterInput.toLowerCase());
  //     });
  //     return filteredData;
  //   };

  const handleFilterChange = (filterInput: string, col: string) => {
    let filteredData: StudentResponse[] = [];
    if (col === "")
      filteredData = getFilterAllTableData(
        filterInput,
        resultColumnTitles,
        getDataFilter
      );
    else filteredData = getDataFilter(filterInput, col);
    setFilteredData(filteredData);
  };

  const getDataFilter = (filterInput: string, col: string) => {
    //special col that cannot filter as default here

    //
    return handleFilterColumn(filterInput, col, data);
  };

  return (
    <>
      <CustomDatatable<StudentResponse>
        data={filteredData}
        pagination={pagination}
        columns={resultTableColumns({
          onEdit: otherFunctions?.onEdit,
          onDelete: otherFunctions?.onDelete,
        })}
        columnTitles={resultColumnTitles}
        buttons={buttons}
        config={{
          defaultVisibilityState: resultColumnVisibility,
          showFilterButton: true,
          filterOptionKeys: filterOptionKeys,
          showDataTableViewOptions: true,
          showRowSelectedCounter: true,
          onFilterChange: handleFilterChange,
          onDeleteRowsBtnClick: otherFunctions?.onDeleteMany,
        }}
      />
    </>
  );
};

export default ResultTable;
