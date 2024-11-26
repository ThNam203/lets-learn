"use client";
import CollapsibleList from "@/app/course/[courseId]/components/collapsible/collapsible-list";
import { useDebounceFunction } from "@/hooks/useDebounce";
import { Button } from "@/lib/shadcn/button";
import { Course } from "@/models/course";
import { Test } from "@/models/test";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z, ZodType } from "zod";
import GradeSetting, {
  DangerZoneSettingForm,
} from "./setting-items/danger-zone";
import GeneralSetting, { GeneralSettingForm } from "./setting-items/general";
import TimingSetting, { TimingSettingForm } from "./setting-items/timing";
import { defaultDangerZoneSetting, defaultGeneralSetting } from "./static-data";
import DangerZoneSetting from "./setting-items/danger-zone";

const generalSettingSchema: ZodType<GeneralSettingForm> = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string(),
  level: z.string(),
  price: z.number().min(0, "Price must be greater than or equal 0"),
});

const dangerZoneSettingSchema: ZodType<DangerZoneSettingForm> = z.object({
  isPublished: z.boolean(),
});

export type CourseSettingForm = {
  generalSettingForm: GeneralSettingForm;
  dangerZoneSettingForm: DangerZoneSettingForm;
};

// Combine child schemas into one
const schema: ZodType<CourseSettingForm> = z.object({
  generalSettingForm: generalSettingSchema,
  dangerZoneSettingForm: dangerZoneSettingSchema,
});

interface Props {
  course: Course;
  onSubmitCourseSetting?: (data: Course) => void;
}
const SettingList = ({ course, onSubmitCourseSetting }: Props) => {
  const handleGetGeneralSetting = (course: Course) => {
    const { title, category, level, price } = course;
    const generalSetting: GeneralSettingForm = {
      name: title,
      category,
      level,
      price,
    };
    return generalSetting;
  };

  const handleGetDangerZoneSetting = (course: Course) => {
    const { isPublished } = course;
    const dangerZoneSetting: DangerZoneSettingForm = {
      isPublished,
    };
    return dangerZoneSetting;
  };

  const initGeneralSetting = useMemo(() => {
    return course ? handleGetGeneralSetting(course) : defaultGeneralSetting;
  }, [course]);
  const initDangerZoneSetting = useMemo(() => {
    return course
      ? handleGetDangerZoneSetting(course)
      : defaultDangerZoneSetting;
  }, [course]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      generalSettingForm: initGeneralSetting,
      dangerZoneSettingForm: initDangerZoneSetting,
    },
  });
  const { setValue, watch } = form;

  //use for auto save setting and update the state when the show content is closed
  const handleGeneralSettingChange = useDebounceFunction(
    (data: GeneralSettingForm) => setValue("generalSettingForm", data)
  );

  const handleDangerZoneSettingChange = useDebounceFunction(
    (data: DangerZoneSettingForm) => setValue("dangerZoneSettingForm", data)
  );

  const handleGetCourseToUpdate = (data: CourseSettingForm) => {
    const { generalSettingForm, dangerZoneSettingForm } = data;
    const { name: title, category, level, price } = generalSettingForm;
    const { isPublished } = dangerZoneSettingForm;
    const courseToUpdate: Course = {
      ...course,
      title,
      category,
      level,
      price,
      isPublished,
    };
    return courseToUpdate;
  };

  const compareCourse = (c1: Course, c2: Course) => {
    const JSON1 = JSON.stringify(c1);
    const JSON2 = JSON.stringify(c2);
    return JSON1 === JSON2;
  };

  const onSubmit = (data: CourseSettingForm) => {
    const toSubmit = handleGetCourseToUpdate(data);
    if (compareCourse(course, toSubmit)) {
      toast.info("No changes to update");
      return;
    }
    if (onSubmitCourseSetting) onSubmitCourseSetting(toSubmit);
  };

  const titles = ["General", "Danger Zone"];
  const isSettingChange = useMemo(() => {
    return !compareCourse(course, handleGetCourseToUpdate(form.getValues()));
  }, [course, form.getValues()]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CollapsibleList titles={titles}>
          <GeneralSetting
            formData={watch("generalSettingForm")}
            onChange={handleGeneralSettingChange}
          />
          <DangerZoneSetting
            formData={watch("dangerZoneSettingForm")}
            onChange={handleDangerZoneSettingChange}
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
