import { AssignmentTopic } from "@/models/topic";
import SettingList from "../settings/setting-list";
import { updateTopic } from "@/services/topic";
import { toast } from "react-toastify";

interface Props {
  courseId: string;
  assignment: AssignmentTopic;
  onAssignmentChange?: (data: AssignmentTopic) => void;
}
const TabSetting = ({ courseId, assignment, onAssignmentChange }: Props) => {
  const handleUpdateTopicSuccess = (data: AssignmentTopic) => {
    if (onAssignmentChange) onAssignmentChange(data);
    toast.success("Update topic successfully");
  };
  const handleUpdateTopicFail = (error: any) => {
    toast.error(error);
  };
  const handleSubmitAssignmentSetting = (data: AssignmentTopic) => {
    updateTopic(
      courseId,
      data,
      handleUpdateTopicSuccess,
      handleUpdateTopicFail
    );
  };

  return (
    <div>
      <h1 className="font-bold text-2xl text-orange-500">Edit settings</h1>
      <SettingList
        assignment={assignment}
        onSubmitAssignmentSetting={handleSubmitAssignmentSetting}
      />
    </div>
  );
};

export default TabSetting;
