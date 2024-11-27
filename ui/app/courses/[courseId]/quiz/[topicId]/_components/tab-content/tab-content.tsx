import TabContentLayout from "@/components/ui/tab-content-layout";
import { useTab } from "@/hooks/useTab";
import { Question } from "@/models/question";
import {
  QuizAnswer,
  QuizResponseData,
  StudentResponse,
} from "@/models/student-response";
import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";
import { QuestionType, Tab, TabInTab } from "../static-data";
import BackwardButtonIcon from "./_components/backward-button-icon";
import TabInTabContent from "./tab-in-tab/tab-in-tab-content";
import { tabInTabMapper } from "./tab-in-tab/tap-in-tab-mapper";
import TabQuestion from "./tab-question";
import TabQuestionBank from "./tab-question-bank";
import TabQuiz from "./tab-quiz";
import TabSetting from "./tab-setting";
import { fakeQuestions } from "@/fake-data/question";
import { QuizData, Test } from "@/models/quiz";

interface Props {
  className?: string;
  quiz: Test;
  onQuizChange?: (quiz: Test) => void;
  onQuizModeChange?: (quizMode: boolean) => void;
}

const TabContent = ({
  className,
  quiz,
  onQuizChange,
  onQuizModeChange,
}: Props) => {
  const tabContext = useTab<string>();
  const { selectedTab } = tabContext;
  const { data } = quiz;
  const { questions } = data as QuizData;
  const [questionsBank, setQuestionsBank] = useState<Question[]>(fakeQuestions);
  const [tabInTab, setTabInTab] = useState<TabInTab>(TabInTab.MAIN_TAB);
  const [tabInTabQuestion, setTabInTabQuestion] = useState<
    Question | undefined
  >();
  const [quizResponses, setQuizResponses] = useState<StudentResponse[]>([]);
  const [selectedQuizResponse, setSelectedQuizResponse] = useState<
    StudentResponse | undefined
  >();

  // Reset tabInTab to MAIN_TAB when selectedTab changes
  useEffect(() => {
    setTabInTab(TabInTab.MAIN_TAB);
  }, [selectedTab]);

  useEffect(() => {
    if (onQuizModeChange)
      onQuizModeChange(tabInTab === TabInTab.QUIZ_ATTEMPTING_TAB);
  }, [tabInTab]);

  const handleTabInTabChange = (tab: TabInTab) => {
    setTabInTab(tab);
    setTabInTabQuestion(undefined);
  };

  const handleTabInTabQuestionChange = (question: Question | undefined) => {
    setTabInTabQuestion(question);
    if (question) setTabInTab(tabInTabMapper[question.type]);
  };

  const handleQuizResponseChange = (quizResponse: StudentResponse) => {
    const newQuizResponses = quizResponses.map((response) =>
      response.id === quizResponse.id ? quizResponse : response
    );
    setQuizResponses(newQuizResponses);

    // Update selectedQuizResponse if it is the same as the updated quizResponse
    if (selectedQuizResponse?.id === quizResponse.id)
      setSelectedQuizResponse(quizResponse);
  };

  const handleQuizAnswerChange = (quizAnswer: QuizAnswer) => {
    if (!selectedQuizResponse) return;
    const newQuizResponse = { ...selectedQuizResponse };
    const quizResponseData = newQuizResponse.data as QuizResponseData;
    const { answers } = quizResponseData;

    //find the index of the answer
    const index = answers.findIndex(
      (answer) => answer.question.id === quizAnswer.question.id
    );
    if (index === -1) return;
    answers[index] = quizAnswer;

    //update quiz responses
    handleQuizResponseChange(newQuizResponse);
  };

  const handleAddNewQuestion = (type: QuestionType) => {
    const tab = tabInTabMapper[type];
    handleTabInTabChange(tab);
  };

  const handleAddQuestionToQuestionBank = (question: Question) => {
    const newQuestionBank = [...questionsBank];
    const index = questionsBank.findIndex((q) => q.id === question.id);
    if (index === -1) newQuestionBank.push(question);
    else newQuestionBank[index] = question;

    setQuestionsBank(newQuestionBank);
  };

  const handleSubmitQuestion = (question: Question) => {
    if (selectedTab === Tab.QUESTION)
      handleAddQuestionsToQuizQuestions([question]);

    handleAddQuestionToQuestionBank(question);
    handleTabInTabChange(TabInTab.MAIN_TAB);
  };

  const handleRemoveQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    const newData = { ...data, questions: newQuestions };
    if (onQuizChange) onQuizChange({ ...quiz, data: newData });
  };

  const handleReorderedQuestion = (questions: Question[]) => {
    const newData = { ...data, questions };
    if (onQuizChange) onQuizChange({ ...quiz, data: newData });
  };

  const hasExistingQuestion = (
    question: Question,
    questionList: Question[]
  ) => {
    return questionList.find((q) => q.id === question.id);
  };

  const handleAddQuestionsToQuizQuestions = (comingQuestions: Question[]) => {
    const newQuestions = [...questions];
    //add if not exist
    comingQuestions.forEach((question) => {
      if (!hasExistingQuestion(question, newQuestions))
        newQuestions.push(question);
    });
    const newData = { ...data, questions: newQuestions };

    if (onQuizChange) onQuizChange({ ...quiz, data: newData });
  };

  switch (selectedTab) {
    case Tab.QUIZ:
      return (
        <TabContentLayout
          className={className}
          fullWidth={tabInTab !== TabInTab.MAIN_TAB}
          hasSeparator={tabInTab !== TabInTab.QUIZ_ATTEMPTING_TAB}
        >
          {tabInTab === TabInTab.MAIN_TAB && (
            <TabQuiz
              quiz={quiz}
              quizResponses={quizResponses}
              onQuizResponsesChange={setQuizResponses}
              onTabInTabChange={handleTabInTabChange}
              onSelectQuizResponse={setSelectedQuizResponse}
              className={className}
            />
          )}
          {tabInTab !== TabInTab.MAIN_TAB &&
            tabInTab !== TabInTab.QUIZ_ATTEMPTING_TAB && (
              <BackwardButtonIcon
                onClick={() => setTabInTab(TabInTab.QUIZ_ATTEMPTING_TAB)}
                className="absolute top-3 left-3"
              />
            )}
          <TabInTabContent
            tab={selectedTab}
            tabInTab={tabInTab}
            tabProps={{
              quiz: quiz,
              tabInTabQuestion: tabInTabQuestion,
              quizResponse: selectedQuizResponse,
              className: className,
              onTabInTabChange: handleTabInTabChange,
              onTabInTabQuestionChange: handleTabInTabQuestionChange,
              onQuizResponseChange: handleQuizResponseChange,
              onQuizAnswerChange: handleQuizAnswerChange,
              onSubmitQuestion: handleSubmitQuestion,
            }}
          />
        </TabContentLayout>
      );
    case Tab.SETTING:
      return (
        <TabContentLayout className={className}>
          <TabSetting quiz={quiz} onQuizChange={onQuizChange} />
        </TabContentLayout>
      );
    case Tab.QUESTION:
      return (
        <TabContentLayout className={className} fullWidth>
          {tabInTab !== TabInTab.MAIN_TAB && (
            <BackwardButtonIcon
              onClick={() => setTabInTab(TabInTab.MAIN_TAB)}
              className="absolute top-3 left-3"
            />
          )}
          {tabInTab === TabInTab.MAIN_TAB && (
            <div className="mx-20">
              <TabQuestion
                quiz={quiz}
                questionsBank={questionsBank}
                quizResponses={quizResponses}
                onAddNewQuestion={handleAddNewQuestion}
                onRemoveQuestion={handleRemoveQuestion}
                onReorderedQuestion={handleReorderedQuestion}
                onTabInTabChange={handleTabInTabChange}
                onAddQuestionsFromBank={handleAddQuestionsToQuizQuestions}
              />
            </div>
          )}
          <TabInTabContent
            tab={selectedTab}
            tabInTab={tabInTab}
            tabProps={{
              tabInTabQuestion: tabInTabQuestion,
              onSubmitQuestion: handleSubmitQuestion,
            }}
          />
        </TabContentLayout>
      );
    case Tab.QUESTION_BANK:
      return (
        <TabContentLayout className={className} fullWidth>
          {tabInTab !== TabInTab.MAIN_TAB && (
            <BackwardButtonIcon
              onClick={() => setTabInTab(TabInTab.MAIN_TAB)}
              className="absolute top-3 left-3"
            />
          )}
          {tabInTab === TabInTab.MAIN_TAB && (
            <div className="mx-20">
              <TabQuestionBank
                questions={questionsBank}
                onQuestionsChange={setQuestionsBank}
                onTabInTabChange={handleTabInTabChange}
                onTabInTabQuestionChange={handleTabInTabQuestionChange}
              />
            </div>
          )}
          <div className="mx-20">
            <TabInTabContent
              tab={selectedTab}
              tabInTab={tabInTab}
              tabProps={{
                tabInTabQuestion: tabInTabQuestion,
                onSubmitQuestion: handleSubmitQuestion,
              }}
            />
          </div>
        </TabContentLayout>
      );
    case Tab.MORE:
      return <TabContentLayout></TabContentLayout>;
    default:
      return notFound();
  }
};

export default TabContent;
