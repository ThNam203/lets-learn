"use client";
import CollapsibleList from "@/app/course/[courseId]/components/collapsible/collapsible-list";
import { Button } from "@/lib/shadcn/button";
import { AssignmentData, SubmissionType, Test } from "@/models/quiz";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z, ZodType } from "zod";
import AvailabilitySetting, {
  AvailabilitySettingForm,
} from "./setting-items/availability";
import GeneralSetting, { GeneralSettingForm } from "./setting-items/general";
import SubmissionSetting, {
  SubmissionSettingForm,
} from "./setting-items/submission";
import {
  defaultAvailabilitySetting,
  defaultGeneralSetting,
  defaultSubmissionSetting,
} from "./static-data";
import { useDebouce, useDebounceFunction } from "@/hooks/useDebounce";

const generalSettingSchema: ZodType<GeneralSettingForm> = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
});

const availabilitySettingSchema: ZodType<AvailabilitySettingForm> = z.object({
  open: z.object({
    enabled: z.boolean(),
    value: z.string(),
  }),
  close: z.object({
    enabled: z.boolean(),
    value: z.string(),
  }),
  remindToGrade: z.object({
    enabled: z.boolean(),
    value: z.string(),
  }),
});

const submissionSettingSchema: ZodType<SubmissionSettingForm> = z.object({
  submissionType: z.array(z.nativeEnum(SubmissionType)),
  wordLimit: z.object({
    enabled: z.boolean(),
    value: z.number(),
  }),
  maximumFile: z.object({
    enabled: z.boolean(),
    value: z.number(),
  }),
  maximumFileSize: z.object({
    enabled: z.boolean(),
    value: z.string(),
  }),
});

export type AssignmentSettingForm = {
  generalSettingForm: GeneralSettingForm;
  availabilitySettingForm: AvailabilitySettingForm;
  submissionSettingForm: SubmissionSettingForm;
};

// Combine child schemas into one
const schema: ZodType<AssignmentSettingForm> = z.object({
  generalSettingForm: generalSettingSchema,
  availabilitySettingForm: availabilitySettingSchema,
  submissionSettingForm: submissionSettingSchema,
});

interface Props {
  assignment: Test;
  onSubmitAssignmentSetting?: (data: Test) => void;
}
const SettingList = ({ assignment, onSubmitAssignmentSetting }: Props) => {
  const handleGetGeneralSetting = (assignment: Test) => {
    const { name, description } = assignment;
    const generalSetting: GeneralSettingForm = {
      name,
      description,
    };
    return generalSetting;
  };

  const handleGetAvailabilitySetting = (assignment: Test) => {
    const { open, close } = assignment;
    const { remindToGrade } = assignment.data as AssignmentData;
    const availabilitySetting: AvailabilitySettingForm = {
      open: {
        enabled: open.enabled,
        value: open.value,
      },
      close: {
        enabled: close.enabled,
        value: close.value,
      },
      remindToGrade: {
        enabled: remindToGrade.enabled,
        value: remindToGrade.value,
      },
    };
    return availabilitySetting;
  };

  const handleGetSubmisisonSetting = (assignment: Test) => {
    const { wordLimit, maximumFile, maximumFileSize } =
      assignment.data as AssignmentData;
    const submissionSetting: SubmissionSettingForm = {
      submissionType: [],
      wordLimit: {
        enabled: wordLimit.enabled,
        value: wordLimit.value,
      },
      maximumFile: {
        enabled: maximumFile.enabled,
        value: maximumFile.value,
      },
      maximumFileSize: {
        enabled: maximumFileSize.enabled,
        value: maximumFileSize.value,
      },
    };
    return submissionSetting;
  };

  const initGeneralSetting = useMemo(() => {
    return assignment
      ? handleGetGeneralSetting(assignment)
      : defaultGeneralSetting;
  }, [assignment]);
  const initAvailabilitySetting = useMemo(() => {
    return assignment
      ? handleGetAvailabilitySetting(assignment)
      : defaultAvailabilitySetting;
  }, [assignment]);
  const initSubmissionSetting = useMemo(() => {
    return assignment
      ? handleGetSubmisisonSetting(assignment)
      : defaultSubmissionSetting;
  }, [assignment]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      generalSettingForm: initGeneralSetting,
      availabilitySettingForm: initAvailabilitySetting,
      submissionSettingForm: initSubmissionSetting,
    },
  });
  const { setValue, watch } = form;

  //use for auto save setting and update the state when the show content is closed
  const handleGeneralSettingChange = useDebounceFunction(
    (data: GeneralSettingForm) => setValue("generalSettingForm", data)
  );

  const handleAvailabilitySettingChange = useDebounceFunction(
    (data: AvailabilitySettingForm) => setValue("availabilitySettingForm", data)
  );

  const handleSubmissionSettingChange = useDebounceFunction(
    (data: SubmissionSettingForm) => setValue("submissionSettingForm", data)
  );

  const handleGetAssignmentToUpdate = (form: AssignmentSettingForm) => {
    const {
      generalSettingForm,
      availabilitySettingForm,
      submissionSettingForm,
    } = form;
    const { name, description } = generalSettingForm;
    const { open, close, remindToGrade } = availabilitySettingForm;
    const { wordLimit, maximumFile, maximumFileSize, submissionType } =
      submissionSettingForm;
    const assignmentToUpdate: Test = {
      ...assignment,
      name,
      description,
      open,
      close,
      data: {
        ...assignment.data,
        submissionType,
        remindToGrade,
        wordLimit,
        maximumFile,
        maximumFileSize,
      },
    };

    return assignmentToUpdate;
  };

  const compareAssignment = (assignment1: Test, assignment2: Test) => {
    const assignment1JSON = JSON.stringify(assignment1);
    const assignment2JSON = JSON.stringify(assignment2);
    return assignment1JSON === assignment2JSON;
  };

  const onSubmit = (data: AssignmentSettingForm) => {
    const assignmentToSubmit = handleGetAssignmentToUpdate(data);
    if (!isSettingChange) {
      toast.info("No changes to submit");
      return;
    }
    if (onSubmitAssignmentSetting)
      onSubmitAssignmentSetting(assignmentToSubmit);
  };

  const titles = ["General", "Availability", "Submission"];
  const isSettingChange = useMemo(() => {
    return !compareAssignment(
      assignment,
      handleGetAssignmentToUpdate(form.getValues())
    );
  }, [assignment, form.getValues()]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CollapsibleList titles={titles}>
          <GeneralSetting
            formData={watch("generalSettingForm")}
            onChange={handleGeneralSettingChange}
          />
          <AvailabilitySetting
            formData={watch("availabilitySettingForm")}
            onChange={handleAvailabilitySettingChange}
          />
          <SubmissionSetting
            formData={watch("submissionSettingForm")}
            onChange={handleSubmissionSettingChange}
          />
        </CollapsibleList>
        <div className="w-full flex flex-row justify-center">
          <Button type="submit" disabled={!isSettingChange} variant="default">
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default SettingList;
