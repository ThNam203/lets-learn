import { Test } from "@/models/quiz";
import SettingList from "../settings/setting-list";

interface Props {
  quiz: Test;
  onQuizChange?: (data: Test) => void;
}
const TabSetting = ({ quiz, onQuizChange }: Props) => {
  return (
    <div>
      <h1 className="font-bold text-2xl text-orange-500">Edit settings</h1>
      <SettingList quiz={quiz} onSubmitQuizSetting={onQuizChange} />
    </div>
  );
};

export default TabSetting;
