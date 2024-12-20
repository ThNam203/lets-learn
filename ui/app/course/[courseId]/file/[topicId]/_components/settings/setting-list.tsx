"use client";
import CollapsibleList from "@/app/course/[courseId]/components/collapsible/collapsible-list";
import { useDebounceFunction } from "@/hooks/useDebounce";
import { Button } from "@/lib/shadcn/button";
import { FileTopic } from "@/models/topic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z, ZodType } from "zod";
import GeneralSetting, { GeneralSettingForm } from "./setting-items/general";
import { defaultCloudinaryFile, defaultGeneralSetting } from "./static-data";

const generalSettingSchema: ZodType<GeneralSettingForm> = z
  .object({
    title: z.string().min(1, "File name must be at least 1 character"),
    // file type CloudinaryFile
    file: z
      .object({
        id: z.string(),
        name: z.string(),
        downloadUrl: z.string(),
        displayUrl: z.string(),
      })
      .nullable(),
    description: z.string(),
  })
  .refine(
    (data) => {
      if (!data.file) return true;
      return data.file.id !== "" && data.file.name !== "";
    },
    { message: "Please upload a file" }
  );

export type FileSettingForm = {
  generalSettingForm: GeneralSettingForm;
};

// Combine child schemas into one
const schema: ZodType<FileSettingForm> = z.object({
  generalSettingForm: generalSettingSchema,
});

interface Props {
  topic: FileTopic;
  onSubmitFileSetting?: (data: FileTopic) => void;
}
const SettingList = ({ topic, onSubmitFileSetting }: Props) => {
  const handleGetGeneralSetting = (topic: FileTopic) => {
    const { title, data } = topic;
    const { description, file } = data;

    const generalSetting: GeneralSettingForm = {
      title,
      description,
      file,
    };
    return generalSetting;
  };

  const initGeneralSetting = useMemo(() => {
    return topic ? handleGetGeneralSetting(topic) : defaultGeneralSetting;
  }, [topic]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      generalSettingForm: initGeneralSetting,
    },
  });
  const { setValue, watch } = form;
  const { errors } = form.formState;

  //use for auto save setting and update the state when the show content is closed
  const handleGeneralSettingChange = useDebounceFunction(
    (data: GeneralSettingForm) => setValue("generalSettingForm", data)
  );

  const handleGetFileToUpdate = (form: FileSettingForm) => {
    const { generalSettingForm } = form;
    const { title, description, file } = generalSettingForm;
    const topicToUpdate: FileTopic = {
      ...topic,
      title,
      data: {
        ...topic.data,
        description,
        file,
      },
    };

    return topicToUpdate;
  };

  const compareTopicFile = (topic1: FileTopic, topic2: FileTopic) => {
    const topic1JSON = JSON.stringify(topic1);
    const topic2JSON = JSON.stringify(topic2);
    return topic1JSON === topic2JSON;
  };

  const onSubmit = (data: FileSettingForm) => {
    const toSubmit = handleGetFileToUpdate(data);
    if (!isSettingChange) {
      toast.info("No changes to submit");
      return;
    }
    if (onSubmitFileSetting) onSubmitFileSetting(toSubmit);
  };

  const titles = ["General", "Availability", "Submission"];
  const isSettingChange = useMemo(() => {
    return !compareTopicFile(topic, handleGetFileToUpdate(form.getValues()));
  }, [topic, form.getValues()]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CollapsibleList titles={titles}>
          <GeneralSetting
            formData={watch("generalSettingForm")}
            onChange={handleGeneralSettingChange}
          />
        </CollapsibleList>
        <div className="w-full flex flex-row justify-center">
          <Button
            type="submit"
            disabled={!isSettingChange}
            onClick={() => {
              console.log("error", errors);
            }}
            variant="default"
          >
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default SettingList;
