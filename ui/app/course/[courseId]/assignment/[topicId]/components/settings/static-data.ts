import { FileSizeOption } from "@/models/assignment";
import { AvailabilitySettingForm } from "./setting-items/availability";
import { GeneralSettingForm } from "./setting-items/general";
import { SubmissionSettingForm } from "./setting-items/submission";

export const defaultGeneralSetting: GeneralSettingForm = {
  title: "Assignment",
  description: "This is a assignment description",
};

export const defaultAvailabilitySetting: AvailabilitySettingForm = {
  open: {
    enabled: true,
    value: new Date().toISOString(),
  },
  close: {
    enabled: true,
    value: new Date().toISOString(),
  },
  remindToGrade: {
    enabled: true,
    value: new Date().toISOString(),
  },
};

export const defaultSubmissionSetting: SubmissionSettingForm = {
  maximumFile: {
    enabled: false,
    value: 0,
  },
  maximumFileSize: {
    enabled: false,
    value: FileSizeOption["5MB"],
  },
};
