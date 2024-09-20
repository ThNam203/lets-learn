import CollapsibleList from "@/app/courses/[courseId]/_components/collapsible/collapsible-list";
import { fakeUser } from "@/fake-data/user";
import { Button } from "@/lib/shadcn/button";
import { getTextFromHtml } from "@/lib/utils";
import { ChoiceQuestion } from "@/models/question";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "@reduxjs/toolkit";
import { FormProvider, useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import ChoiceQuestionAnswerSetting, {
  ChoiceQuestionAnswerForm,
} from "../../question-bank/multiple-choice-question/answers";
import ChoiceQuestionGeneralSetting, {
  ChoiceQuestionGeneralForm,
} from "../../question-bank/multiple-choice-question/general";
import { QuestionStatus, QuestionType } from "../../static-data";
import {
  defaultAnswerSetting,
  defaultGeneralSetting,
} from "../_components/choice-question-tab/static-data";

// Child form schemas
const generalSettingSchema: ZodType<ChoiceQuestionGeneralForm> = z.object({
  questionName: z.string().min(1, "Required"),
  questionText: z.string().min(1, "Required"),
  questionStatus: z.nativeEnum(QuestionStatus),
  defaultMark: z.number().int().positive(),
  multipleChoice: z.boolean(),
});

const answerSettingSchema: ZodType<ChoiceQuestionAnswerForm> = z.object({
  choices: z.array(
    z.object({
      text: z.string().refine((data) => getTextFromHtml(data).length > 0, {
        message: "Required",
      }),
      gradePercent: z.number(),
      feedback: z.string(),
    })
  ),
});

export type ChoiceQuestionForm = {
  generalSettingForm: ChoiceQuestionGeneralForm;
  answerSettingForm: ChoiceQuestionAnswerForm;
};

// Combine child schemas into one
const schema: ZodType<ChoiceQuestionForm> = z.object({
  generalSettingForm: generalSettingSchema,
  answerSettingForm: answerSettingSchema,
});

interface Props {
  question: ChoiceQuestion | undefined;
  onSubmitQuestion?: (data: ChoiceQuestion) => void;
}
const ChoiceQuestionTab = ({ question, onSubmitQuestion }: Props) => {
  const thisUser = fakeUser;
  const handleGetGeneralSetting = (question: ChoiceQuestion) => {
    const generalSetting: ChoiceQuestionGeneralForm = {
      questionName: question.questionName,
      questionText: question.questionText,
      questionStatus: question.status,
      defaultMark: question.defaultMark,
      multipleChoice: question.multiple,
    };
    return generalSetting;
  };
  const handleGetAnswerSetting = (question: ChoiceQuestion) => {
    const answerSetting: ChoiceQuestionAnswerForm = {
      choices: question.choices,
    };
    return answerSetting;
  };

  const initGeneralSetting = question
    ? handleGetGeneralSetting(question)
    : defaultGeneralSetting;
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

  const handleGeneralSettingChange = (data: ChoiceQuestionGeneralForm) => {
    setValue("generalSettingForm", data);
  };

  const handleAnswerSettingChange = (data: ChoiceQuestionAnswerForm) => {
    setValue("answerSettingForm", data);
  };

  const handleCreateQuestion = (data: ChoiceQuestionForm) => {
    const questionToCreate: ChoiceQuestion = {
      id: nanoid(),
      type: QuestionType.CHOICE,
      questionName: data.generalSettingForm.questionName,
      questionText: data.generalSettingForm.questionText,
      status: data.generalSettingForm.questionStatus,
      defaultMark: data.generalSettingForm.defaultMark,
      multiple: data.generalSettingForm.multipleChoice,
      choices: data.answerSettingForm.choices,
      createdAt: new Date().toISOString(),
      createdBy: thisUser.username,
      modifiedAt: new Date().toISOString(),
      modifiedBy: thisUser.username,
      usage: 0,
    };
    return questionToCreate;
  };

  const handleEditQuestion = (
    question: ChoiceQuestion,
    data: ChoiceQuestionForm
  ) => {
    const questionToEdit: ChoiceQuestion = {
      ...question,
      questionName: data.generalSettingForm.questionName,
      questionText: data.generalSettingForm.questionText,
      status: data.generalSettingForm.questionStatus,
      defaultMark: data.generalSettingForm.defaultMark,
      multiple: data.generalSettingForm.multipleChoice,
      choices: data.answerSettingForm.choices,
      createdAt: new Date().toISOString(),
      createdBy: thisUser.username,
      modifiedAt: new Date().toISOString(),
      modifiedBy: thisUser.username,
    };
    return questionToEdit;
  };

  const onSubmit = (data: ChoiceQuestionForm) => {
    let questionToSubmit;
    if (question) questionToSubmit = handleEditQuestion(question, data);
    else questionToSubmit = handleCreateQuestion(data);

    if (onSubmitQuestion) onSubmitQuestion(questionToSubmit);
  };

  const titles = ["General", "Answers"];
  const initShowContent = ["General", "Answers"];
  const collapsibleContent = [
    <ChoiceQuestionGeneralSetting
      key={0}
      formData={watch("generalSettingForm")}
      onChange={handleGeneralSettingChange}
    />,
    <ChoiceQuestionAnswerSetting
      key={1}
      formData={watch("answerSettingForm")}
      onChange={handleAnswerSettingChange}
    />,
  ];

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h1 className="font-bold text-2xl text-orange-600">
          Adding a Multiple or Single choice question
        </h1>
        <CollapsibleList titles={titles} initShowContent={initShowContent}>
          {collapsibleContent}
        </CollapsibleList>
        <div className="w-full flex flex-row justify-center">
          <Button type="submit" variant="default">
            Submit
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ChoiceQuestionTab;
