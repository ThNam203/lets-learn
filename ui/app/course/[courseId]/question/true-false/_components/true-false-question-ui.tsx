import CollapsibleList from "@/app/courses/[courseId]/_components/collapsible/collapsible-list";
import { fakeUser } from "@/fake-data/user";
import { Button } from "@/lib/shadcn/button";
import { Question, TrueFalseQuestion } from "@/models/question";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "@reduxjs/toolkit";
import { FormProvider, useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import TrueFalseQuestionGeneralSetting, {
  TrueFalseQuestionGeneralForm,
} from "./general";
import { defaultAnswerSetting, defaultGeneralSetting } from "./static-data";
import {
  QuestionStatus,
  QuestionType,
} from "@/app/course/[courseId]/quiz/[topicId]/components/static-data";
import TrueFalseQuestionAnswerSetting, {
  TrueFalseQuestionAnswerForm,
} from "./answers";
import { useDebounceFunction } from "@/hooks/useDebounce";

const generalSettingSchema: ZodType<TrueFalseQuestionGeneralForm> = z.object({
  questionName: z.string().min(1, "Required"),
  questionText: z.string().min(1, "Required"),
  questionStatus: z.nativeEnum(QuestionStatus),
  defaultMark: z.number().int().positive(),
});
const answerSettingSchema: ZodType<TrueFalseQuestionAnswerForm> = z.object({
  correctAnswer: z.boolean(),
  feedbackOfTrue: z.string(),
  feedbackOfFalse: z.string(),
});

export type TrueFalseQuestionForm = {
  generalSettingForm: TrueFalseQuestionGeneralForm;
  answerSettingForm: TrueFalseQuestionAnswerForm;
};

const schema: ZodType<TrueFalseQuestionForm> = z.object({
  generalSettingForm: generalSettingSchema,
  answerSettingForm: answerSettingSchema,
});

interface Props {
  question: Question | undefined;
  onSubmitQuestion?: (data: Question) => void;
}
const TrueFalseQuestionUI = ({ question, onSubmitQuestion }: Props) => {
  const thisUser = fakeUser;
  const handleGetGeneralSetting = (question: Question) => {
    const { questionName, questionText, status, defaultMark, data } = question;
    const { correctAnswer, feedbackOfTrue, feedbackOfFalse } =
      data as TrueFalseQuestion;
    const generalSetting: TrueFalseQuestionGeneralForm = {
      questionName: questionName,
      questionText: questionText,
      questionStatus: status,
      defaultMark: defaultMark,
    };
    return generalSetting;
  };
  const handleGetAnswerSetting = (question: Question) => {
    const { data } = question;
    const { correctAnswer, feedbackOfTrue, feedbackOfFalse } =
      data as TrueFalseQuestion;

    const answerSetting: TrueFalseQuestionAnswerForm = {
      correctAnswer: correctAnswer,
      feedbackOfTrue: feedbackOfTrue,
      feedbackOfFalse: feedbackOfFalse,
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

  const handleCreateQuestion = (data: TrueFalseQuestionForm) => {
    const { generalSettingForm, answerSettingForm } = data;
    const { questionName, questionText, questionStatus, defaultMark } =
      generalSettingForm;
    const { correctAnswer, feedbackOfTrue, feedbackOfFalse } =
      answerSettingForm;

    const questionData: TrueFalseQuestion = {
      correctAnswer,
      feedbackOfTrue,
      feedbackOfFalse,
    };
    const questionToCreate: Question = {
      id: nanoid(4),
      type: QuestionType.TRUE_FALSE,
      questionName,
      questionText,
      status: questionStatus,
      defaultMark,
      createdBy: thisUser.username,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      modifiedBy: thisUser.username,
      usage: 0,
      data: questionData,
    };
    return questionToCreate;
  };

  const handleEditQuestion = (
    question: Question,
    data: TrueFalseQuestionForm
  ) => {
    const { generalSettingForm, answerSettingForm } = data;
    const { questionName, questionText, questionStatus, defaultMark } =
      generalSettingForm;
    const { correctAnswer, feedbackOfTrue, feedbackOfFalse } =
      answerSettingForm;
    const questionData: TrueFalseQuestion = {
      correctAnswer,
      feedbackOfTrue,
      feedbackOfFalse,
    };
    const questionToEdit: Question = {
      ...question,
      questionName,
      questionText,
      status: questionStatus,
      defaultMark,
      modifiedAt: new Date().toISOString(),
      modifiedBy: thisUser.username,
      data: questionData,
    };
    return questionToEdit;
  };

  const handleGeneralSettingChange = useDebounceFunction(
    (data: TrueFalseQuestionGeneralForm) => setValue("generalSettingForm", data)
  );

  const handleAnswerSettingChange = useDebounceFunction(
    (data: TrueFalseQuestionAnswerForm) => setValue("answerSettingForm", data)
  );

  const onSubmit = (data: TrueFalseQuestionForm) => {
    let questionToSubmit;
    if (question) questionToSubmit = handleEditQuestion(question, data);
    else questionToSubmit = handleCreateQuestion(data);

    if (onSubmitQuestion) onSubmitQuestion(questionToSubmit);
  };

  const titles = ["General", "Answer"];
  const initShowContent = ["General", "Answer"];
  const collapsibleContent = [
    <TrueFalseQuestionGeneralSetting
      key={0}
      formData={watch("generalSettingForm")}
      onChange={handleGeneralSettingChange}
    />,
    <TrueFalseQuestionAnswerSetting
      key={1}
      formData={watch("answerSettingForm")}
      onChange={handleAnswerSettingChange}
    />,
  ];

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h1 className="font-bold text-2xl text-orange-600">
          {question ? "Editing" : "Adding"} a True/False question
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

export default TrueFalseQuestionUI;
