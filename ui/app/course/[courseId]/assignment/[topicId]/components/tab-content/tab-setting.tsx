import { Test } from "@/models/quiz";
import SettingList from "../settings/setting-list";

interface Props {
  assignment: Test;
  onAssignmentChange?: (data: Test) => void;
}
const TabSetting = ({ assignment, onAssignmentChange }: Props) => {
  return (
    <div>
      <h1 className="font-bold text-2xl text-orange-500">Edit settings</h1>
      <SettingList
        assignment={assignment}
        onSubmitAssignmentSetting={onAssignmentChange}
      />
    </div>
  );
};

export default TabSetting;
