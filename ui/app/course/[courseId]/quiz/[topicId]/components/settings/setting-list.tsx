"use client";
import { Button } from "@/lib/shadcn/button";
import { GradingMethod, QuizData, Test, TimeLimitType } from "@/models/quiz";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z, ZodType } from "zod";
import GeneralSetting, { GeneralSettingForm } from "./setting-items/general";
import GradeSetting, { GradeSettingForm } from "./setting-items/grade";
import TimingSetting, { TimingSettingForm } from "./setting-items/timing";
import {
  defaultGeneralSetting,
  defaultGradeSetting,
  defaultTimingSetting,
} from "./static-data";
import CollapsibleList from "@/app/course/[courseId]/components/collapsible/collapsible-list";
import { useDebounceFunction } from "@/hooks/useDebounce";

const generalSettingSchema: ZodType<GeneralSettingForm> = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
});

const timingSettingSchema: ZodType<TimingSettingForm> = z.object({
  open: z.object({
    enabled: z.boolean(),
    value: z.string(),
  }),
  close: z.object({
    enabled: z.boolean(),
    value: z.string(),
  }),
  timeLimit: z.object({
    enabled: z.boolean(),
    value: z.number(),
    unit: z.nativeEnum(TimeLimitType),
  }),
});

const gradeSettingSchema: ZodType<GradeSettingForm> = z.object({
  gradeToPass: z
    .number()
    .gte(0, "Grade to pass must be greater than or equal 0"),
  attemptAllowed: z.string(),
  gradingMethod: z.nativeEnum(GradingMethod),
});

export type QuizSettingForm = {
  generalSettingForm: GeneralSettingForm;
  timingSettingForm: TimingSettingForm;
  gradeSettingForm: GradeSettingForm;
};

// Combine child schemas into one
const schema: ZodType<QuizSettingForm> = z.object({
  generalSettingForm: generalSettingSchema,
  timingSettingForm: timingSettingSchema,
  gradeSettingForm: gradeSettingSchema,
});

interface Props {
  quiz: Test;
  onSubmitQuizSetting?: (data: Test) => void;
}
const SettingList = ({ quiz, onSubmitQuizSetting }: Props) => {
  const handleGetGeneralSetting = (quiz: Test) => {
    const generalSetting: GeneralSettingForm = {
      name: quiz.name,
      description: quiz.description,
    };
    return generalSetting;
  };

  const handleGetTimingSetting = (quiz: Test) => {
    const { timeLimit } = quiz.data as QuizData;
    const timingSetting: TimingSettingForm = {
      open: {
        enabled: quiz.open.enabled,
        value: quiz.open.value,
      },
      close: {
        enabled: quiz.close.enabled,
        value: quiz.close.value,
      },
      timeLimit: {
        enabled: timeLimit.enabled,
        value: timeLimit.value,
        unit: timeLimit.unit as TimeLimitType,
      },
    };
    return timingSetting;
  };

  const handleGetGradeSetting = (quiz: Test) => {
    const { data } = quiz;
    const { gradeToPass, gradingMethod, attemptAllowed } = data as QuizData;
    const gradeSetting: GradeSettingForm = {
      gradeToPass: gradeToPass,
      gradingMethod: gradingMethod as GradingMethod,
      attemptAllowed: attemptAllowed,
    };
    return gradeSetting;
  };

  const initGeneralSetting = useMemo(() => {
    return quiz ? handleGetGeneralSetting(quiz) : defaultGeneralSetting;
  }, [quiz]);
  const initTimingSetting = useMemo(() => {
    return quiz ? handleGetTimingSetting(quiz) : defaultTimingSetting;
  }, [quiz]);
  const initGradeSetting = useMemo(() => {
    return quiz ? handleGetGradeSetting(quiz) : defaultGradeSetting;
  }, [quiz]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      generalSettingForm: initGeneralSetting,
      timingSettingForm: initTimingSetting,
      gradeSettingForm: initGradeSetting,
    },
  });
  const { setValue, watch } = form;

  //use for auto save setting and update the state when the show content is closed
  const handleGeneralSettingChange = useDebounceFunction(
    (data: GeneralSettingForm) => setValue("generalSettingForm", data)
  );

  const handleTimingSettingChange = useDebounceFunction(
    (data: TimingSettingForm) => setValue("timingSettingForm", data)
  );

  const handleGradeSettingChange = useDebounceFunction(
    (data: GradeSettingForm) => setValue("gradeSettingForm", data)
  );

  const handleGetQuizToUpdate = (data: QuizSettingForm) => {
    const quizToUpdate: Test = {
      ...quiz,
      name: data.generalSettingForm.name,
      description: data.generalSettingForm.description,
      open: data.timingSettingForm.open,
      close: data.timingSettingForm.close,
      data: {
        ...quiz.data,
        timeLimit: data.timingSettingForm.timeLimit,
        gradeToPass: data.gradeSettingForm.gradeToPass,
        gradingMethod: data.gradeSettingForm.gradingMethod,
        attemptAllowed: data.gradeSettingForm.attemptAllowed,
      },
    };

    return quizToUpdate;
  };

  const compareQuiz = (quiz1: Test, quiz2: Test) => {
    const quiz1JSON = JSON.stringify(quiz1);
    const quiz2JSON = JSON.stringify(quiz2);
    return quiz1JSON === quiz2JSON;
  };

  const onSubmit = (data: QuizSettingForm) => {
    const quizToSubmit = handleGetQuizToUpdate(data);
    if (compareQuiz(quiz, quizToSubmit)) {
      toast.info("No changes to submit");
      return;
    }
    if (onSubmitQuizSetting) onSubmitQuizSetting(quizToSubmit);
  };

  const titles = ["General", "Timing", "Grade"];
  const isQuizSettingChange = useMemo(() => {
    return !compareQuiz(quiz, handleGetQuizToUpdate(form.getValues()));
  }, [quiz, form.getValues()]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CollapsibleList titles={titles}>
          <GeneralSetting
            formData={watch("generalSettingForm")}
            onChange={handleGeneralSettingChange}
          />
          <TimingSetting
            formData={watch("timingSettingForm")}
            onChange={handleTimingSettingChange}
          />
          <GradeSetting
            formData={watch("gradeSettingForm")}
            onChange={handleGradeSettingChange}
          />
        </CollapsibleList>
        <div className="w-full flex flex-row justify-center">
          <Button
            type="submit"
            disabled={!isQuizSettingChange}
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
