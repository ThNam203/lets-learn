import { StudentResponse } from "@/models/student-response";
import ResultTable from "../results/table/result-table";

interface Props {
  studentResponses: StudentResponse[];
}
const TabResults = ({ studentResponses }: Props) => {
  console.log("studentResponses", studentResponses);
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="space-y-2">
        <h4 className="text-orange-500">Results</h4>
        <ResultTable data={studentResponses} otherFunctions={{}} />
      </div>
    </div>
  );
};

export default TabResults;
