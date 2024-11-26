import { Course } from "@/models/course";
import SettingList from "./settings/setting-list";

interface Props {
  course: Course;
  onCourseChange?: (data: Course) => void;
}
const SettingsTab = ({ course, onCourseChange }: Props) => {
  return (
    <div className="mx-auto max-w-3xl">
      <SettingList course={course} onSubmitCourseSetting={onCourseChange} />
    </div>
  );
};

export default SettingsTab;
