import { DangerZoneSettingForm } from "./setting-items/danger-zone";
import { GeneralSettingForm } from "./setting-items/general";

export const defaultGeneralSetting: GeneralSettingForm = {
  name: "Introduction to Astronomy",
  category: "Academic",
  level: "Beginner",
  price: 0,
};
export const defaultDangerZoneSetting: DangerZoneSettingForm = {
  isPublished: false,
};
