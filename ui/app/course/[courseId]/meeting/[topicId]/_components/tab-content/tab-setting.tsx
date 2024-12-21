import { MeetingTopic } from "@/models/topic";
import { updateTopic } from "@/services/topic";
import { toast } from "react-toastify";
import SettingForm from "../setting/setting-form";

interface Props {
  meeting: MeetingTopic;
  onMeetingChange?: (data: MeetingTopic) => void;
}
const TabSetting = ({ meeting, onMeetingChange }: Props) => {
  const handleUpdateTopicSuccess = (data: MeetingTopic) => {
    if (onMeetingChange) onMeetingChange(data);
    toast.success("Update successfully");
  };
  const handleUpdateTopicFail = (error: any) => {
    toast.error(error);
  };
  const handleSubmitMeetingSetting = (data: MeetingTopic) => {
    updateTopic(data, handleUpdateTopicSuccess, handleUpdateTopicFail);
  };

  return (
    <div className="space-y-4">
      <h1 className="font-bold text-2xl text-orange-500">Edit settings</h1>
      <SettingForm meeting={meeting} onSubmit={handleSubmitMeetingSetting} />
    </div>
  );
};

export default TabSetting;
