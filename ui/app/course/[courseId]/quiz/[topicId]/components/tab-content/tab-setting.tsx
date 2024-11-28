import { QuizTopic } from "@/models/topic";
import SettingList from "../settings/setting-list";
import { updateTopic } from "@/services/topic";
import { toast } from "react-toastify";

interface Props {
  quiz: QuizTopic;
  onQuizChange?: (data: QuizTopic) => void;
}
const TabSetting = ({ quiz, onQuizChange }: Props) => {
  const handleUpdateTopicSuccess = (data: QuizTopic) => {
    if (onQuizChange) onQuizChange(data);
    toast.success("Update topic successfully");
  };
  const handleUpdateTopicFail = (error: any) => {
    toast.error(error);
  };
  const handleSubmitQuizSetting = (data: QuizTopic) => {
    updateTopic(data, handleUpdateTopicSuccess, handleUpdateTopicFail);
  };

  return (
    <div>
      <h1 className="font-bold text-2xl text-orange-500">Edit settings</h1>
      <SettingList quiz={quiz} onSubmitQuizSetting={handleSubmitQuizSetting} />
    </div>
  );
};

export default TabSetting;
