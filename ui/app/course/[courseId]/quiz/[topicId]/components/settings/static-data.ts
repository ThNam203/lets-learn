import { GradingMethod, TimeLimitType } from "@/models/quiz";
import { GeneralSettingForm } from "./setting-items/general";
import { GradeSettingForm } from "./setting-items/grade";
import { TimingSettingForm } from "./setting-items/timing";

export const defaultGeneralSetting: GeneralSettingForm = {
  name: "Quiz 1",
  description: "This is a quiz",
};

export const defaultTimingSetting: TimingSettingForm = {
  open: {
    enabled: true,
    value: new Date().toISOString(),
  },
  close: {
    enabled: true,
    value: new Date().toISOString(),
  },
  timeLimit: {
    enabled: false,
    value: 0,
    unit: TimeLimitType.MINUTES,
  },
};

export const defaultGradeSetting: GradeSettingForm = {
  gradeToPass: 5,
  gradingMethod: GradingMethod.HIGHEST_GRADE,
  attemptAllowed: "Unlimited",
};
