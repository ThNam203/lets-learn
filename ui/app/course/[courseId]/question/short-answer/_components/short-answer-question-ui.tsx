import CollapsibleList from "@/app/courses/[courseId]/_components/collapsible/collapsible-list";
import { fakeUser } from "@/fake-data/user";
import { Button } from "@/lib/shadcn/button";
import { Question, ShortAnswerQuestion } from "@/models/question";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "@reduxjs/toolkit";
import { FormProvider, useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import ShortAnswerQuestionAnswerSetting, {
  ShortAnswerQuestionAnswerForm,
} from "./answers";
import ShortAnswerQuestionGeneralSetting, {
  ShortAnswerQuestionGeneralForm,
} from "./general";
import { dafaultGeneralSetting, defaultAnswerSetting } from "./static-data";
import { getTextFromHtml } from "@/lib/utils";
import {
  QuestionStatus,
  QuestionType,
} from "@/app/course/[courseId]/quiz/[topicId]/components/static-data";

const generalSettingSchema: ZodType<ShortAnswerQuestionGeneralForm> = z.object({
  questionName: z.string().min(1, "Required"),
  questionText: z.string().min(1, "Required"),
  questionStatus: z.nativeEnum(QuestionStatus),
  defaultMark: z.number().int().positive(),
});

const answerSettingSchema: ZodType<ShortAnswerQuestionAnswerForm> = z.object({
  answers: z.array(
    z.object({
      text: z.string().refine((data) => getTextFromHtml(data).length > 0, {
        message: "Required",
      }),
      gradePercent: z.number(),
      feedback: z.string(),
    })
  ),
});

export type ShortAnswerQuestionForm = {
  generalSettingForm: ShortAnswerQuestionGeneralForm;
  answerSettingForm: ShortAnswerQuestionAnswerForm;
};

// Combine child schemas into one
const schema: ZodType<ShortAnswerQuestionForm> = z.object({
  generalSettingForm: generalSettingSchema,
  answerSettingForm: answerSettingSchema,
});

interface Props {
  question: Question | undefined;
  onSubmitQuestion?: (data: Question) => void;
}
const ShortAnswerQuestionUI = ({ question, onSubmitQuestion }: Props) => {
  const thisUser = fakeUser;
  const handleGetGeneralSetting = (question: Question) => {
    const { questionName, questionText, status, defaultMark } = question;
    const generalSetting: ShortAnswerQuestionGeneralForm = {
      questionName: questionName,
      questionText: questionText,
      questionStatus: status,
      defaultMark: defaultMark,
    };
    return generalSetting;
  };
  const handleGetAnswerSetting = (question: Question) => {
    const { data } = question;
    const { choices } = data as ShortAnswerQuestion;
    const answerSetting: ShortAnswerQuestionAnswerForm = {
      answers: choices,
    };
    return answerSetting;
  };

  const initGeneralSetting = question
    ? handleGetGeneralSetting(question)
    : dafaultGeneralSetting;
  const initAnswerSetting = question
    ? handleGetAnswerSetting(question)
    : defaultAnswerSetting;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      generalSettingForm: initGeneralSetting,
      answerSettingForm: initAnswerSetting,
    },
  });
  const { setValue, watch } = form;

  const handleGeneralSettingChange = (data: ShortAnswerQuestionGeneralForm) => {
    setValue("generalSettingForm", data);
  };

  const handleAnswerSettingChange = (data: ShortAnswerQuestionAnswerForm) => {
    setValue("answerSettingForm", data);
  };

  const handleCreateQuestion = (data: ShortAnswerQuestionForm) => {
    const questionData: ShortAnswerQuestion = {
      choices: data.answerSettingForm.answers,
    };
    const questionToCreate: Question = {
      id: nanoid(),
      type: QuestionType.SHORT_ANSWER,
      questionName: data.generalSettingForm.questionName,
      questionText: data.generalSettingForm.questionText,
      status: data.generalSettingForm.questionStatus,
      defaultMark: data.generalSettingForm.defaultMark,
      createdAt: new Date().toISOString(),
      createdBy: thisUser.username,
      modifiedAt: new Date().toISOString(),
      modifiedBy: thisUser.username,
      usage: 0,
      data: questionData,
    };
    return questionToCreate;
  };

  const handleEditQuestion = (
    question: Question,
    data: ShortAnswerQuestionForm
  ) => {
    const questionData: ShortAnswerQuestion = {
      choices: data.answerSettingForm.answers,
    };
    const questionToEdit: Question = {
      ...question,
      questionName: data.generalSettingForm.questionName,
      questionText: data.generalSettingForm.questionText,
      status: data.generalSettingForm.questionStatus,
      defaultMark: data.generalSettingForm.defaultMark,
      modifiedAt: new Date().toISOString(),
      modifiedBy: thisUser.username,
      data: questionData,
    };
    return questionToEdit;
  };

  const onSubmit = (data: ShortAnswerQuestionForm) => {
    let questionToSubmit;
    if (question) questionToSubmit = handleEditQuestion(question, data);
    else questionToSubmit = handleCreateQuestion(data);

    if (onSubmitQuestion) onSubmitQuestion(questionToSubmit);
  };

  const titles = ["General", "Answers"];
  const initShowContent = ["General", "Answers"];
  const collapsibleContent = [
    <ShortAnswerQuestionGeneralSetting
      key={0}
      formData={watch("generalSettingForm")}
      onChange={handleGeneralSettingChange}
    />,
    <ShortAnswerQuestionAnswerSetting
      key={1}
      formData={watch("answerSettingForm")}
      onChange={handleAnswerSettingChange}
    />,
  ];
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h1 className="font-bold text-2xl text-orange-600">
          {question ? "Editing" : "Adding"} a Short answer question
        </h1>
        <CollapsibleList titles={titles} initShowContent={initShowContent}>
          {collapsibleContent}
        </CollapsibleList>
        <div className="w-full flex flex-row justify-center">
          <Button type="submit" variant="default">
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ShortAnswerQuestionUI;
