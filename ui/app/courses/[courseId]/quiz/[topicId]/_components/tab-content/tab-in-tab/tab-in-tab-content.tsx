import React from "react";
import { Tab, TabInTab } from "../../static-data";
import TrueFalseQuestionTab from "./true-false-question-tab";
import ShortAnswerQuestionTab from "./short-answer-question-tab";
import ChoiceQuestionTab from "./choice-question-tab";
import {
  ChoiceQuestion,
  Question,
  ShortAnswerQuestion,
  TrueFalseQuestion,
} from "@/models/question";
import QuizAttemptingTab from "./quiz-attempting-tab";
import { QuizAnswer, StudentResponse } from "@/models/student-response";
import { Test } from "@/models/quiz";

interface BaseTabProps {
  tabInTabQuestion: Question | undefined;
  onSubmitQuestion?: (data: Question) => void;
}

interface TabQuizProps extends BaseTabProps {
  quiz: Test;
  quizResponse: StudentResponse;
  className?: string;
  onTabInTabChange: (tab: TabInTab) => void;
  onTabInTabQuestionChange: (question: Question | undefined) => void;
  onQuizResponseChange: (quizResponse: StudentResponse) => void;
  onQuizAnswerChange: (quizAnswer: QuizAnswer) => void;
}
interface TabQuestionProps extends BaseTabProps {}
interface TabQuestionBankProps extends BaseTabProps {}

type TabProps = TabQuizProps | TabQuestionProps | TabQuestionBankProps;

interface Props {
  tab: Tab;
  tabInTab: TabInTab;
  tabProps: TabProps;
}
const TabInTabContent = ({ tab, tabInTab, tabProps }: Props) => {
  switch (tabInTab) {
    case TabInTab.QUIZ_ATTEMPTING_TAB:
      if (tab !== Tab.QUIZ) return null;
      return (
        <QuizAttemptingTab
          quiz={(tabProps as TabQuizProps).quiz}
          className={(tabProps as TabQuizProps).className}
          onTabInTabChange={(tabProps as TabQuizProps).onTabInTabChange}
          onTabInTabQuestionChange={
            (tabProps as TabQuizProps).onTabInTabQuestionChange
          }
          quizResponse={(tabProps as TabQuizProps).quizResponse}
          onQuizResponseChange={(tabProps as TabQuizProps).onQuizResponseChange}
          onQuizAnswerChange={(tabProps as TabQuizProps).onQuizAnswerChange}
        />
      );
    case TabInTab.TRUE_FALSE_QUESTION_TAB:
      if (tab !== Tab.QUESTION && tab !== Tab.QUESTION_BANK) return null;

      return (
        <div className="mx-20">
          <TrueFalseQuestionTab
            question={tabProps.tabInTabQuestion}
            onSubmitQuestion={tabProps.onSubmitQuestion}
          />
        </div>
      );
    case TabInTab.SHORT_ANSWER_QUESTION_TAB:
      if (tab !== Tab.QUESTION && tab !== Tab.QUESTION_BANK) return null;
      return (
        <div className="mx-20">
          <ShortAnswerQuestionTab
            question={tabProps.tabInTabQuestion}
            onSubmitQuestion={tabProps.onSubmitQuestion}
          />
        </div>
      );
    case TabInTab.CHOICE_QUESTION_TAB:
      if (tab !== Tab.QUESTION && tab !== Tab.QUESTION_BANK) return null;
      return (
        <div className="mx-20">
          <ChoiceQuestionTab
            question={tabProps.tabInTabQuestion}
            onSubmitQuestion={tabProps.onSubmitQuestion}
          />
        </div>
      );
  }
};

export default TabInTabContent;
