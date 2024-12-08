import { fakeQuestions } from "@/fake-data/question";
import { useTab } from "@/hooks/useTab";
import { Question } from "@/models/question";
import { QuizData } from "@/models/quiz";
import { StudentResponse } from "@/models/student-response";
import { QuizTopic } from "@/models/topic";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { Tab } from "../static-data";
import TabQuestion from "./tab-question";
import TabQuestionBank from "./tab-question-bank";
import TabQuiz from "./tab-quiz";
import TabResults from "./tab-results";
import TabSetting from "./tab-setting";
import { getQuestionBank } from "@/services/question";
import { toast } from "react-toastify";
import { getTopic, updateTopic } from "@/services/topic";
import { nanoid } from "@reduxjs/toolkit";
import { getQuizResponses } from "@/services/quiz-response";
import { error } from "console";

interface Props {
  className?: string;
  quiz: QuizTopic;
  courseId: string;
  onQuizChange?: (quiz: QuizTopic) => void;
}

const TabContent = ({ className, quiz, courseId, onQuizChange }: Props) => {
  const tabContext = useTab<string>();
  const { selectedTab } = tabContext;
  const { data } = quiz;
  const { questions } = data as QuizData;
  const [questionsBank, setQuestionsBank] = useState<Question[]>([]);

  const [quizResponses, setQuizResponses] = useState<StudentResponse[]>([]);
  const [selectedQuizResponse, setSelectedQuizResponse] = useState<
    StudentResponse | undefined
  >();

  const handleQuestionBankChange = (questions: Question[]) => {
    setQuestionsBank(questions);
  };

  const handleGetQuestionBankSuccess = (data: Question[]) => {
    setQuestionsBank(data);
  };
  const handleGetQuestionFail = (error: any) => {
    toast.error(error);
  };
  useEffect(() => {
    getQuestionBank(
      courseId,
      handleGetQuestionBankSuccess,
      handleGetQuestionFail
    );
  }, [courseId]);
  useEffect(() => {
    getQuizResponses(
      quiz.id,
      handleGetQuizResponsesSuccess,
      handleGetQuizResponsesFail
    );
  }, []);

  const handleAddQuestionFromBank = (questions: Question[]) => {
    const questionsToAdd = questions.map((question) => ({
      ...question,
      id: nanoid(4),
    }));
    const oldQuestions = quiz.data.questions;
    const updatedQuiz = {
      ...quiz,
      data: { ...quiz.data, questions: [...oldQuestions, ...questionsToAdd] },
    };
    console.log("updatedQuiz", updatedQuiz);
    if (onQuizChange) onQuizChange(updatedQuiz);
  };

  const handleReorderedQuestion = (newQuestions: Question[]) => {
    const updatedQuiz = {
      ...quiz,
      data: { ...quiz.data, questions: newQuestions },
    };
    if (onQuizChange) onQuizChange(updatedQuiz);
  };

  const handleRemoveQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    const updatedQuiz = {
      ...quiz,
      data: { ...quiz.data, questions: newQuestions },
    };
    if (onQuizChange) onQuizChange(updatedQuiz);
  };

  const handleUpdateQuizSuccess = (updatedQuiz: QuizTopic) => {
    //can not use this updatedQuiz because it got error
    if (onQuizChange) {
      //reload quiz
      getTopic(quiz.id, onQuizChange, (error: any) => {
        toast.error(error);
      });
    }
    toast.success("Quiz updated successfully");
  };
  const handleUpdateQuizFail = (error: any) => {
    toast.error(error);
  };

  const handleUpdateQuizQuestions = () => {
    updateTopic(quiz, handleUpdateQuizSuccess, handleUpdateQuizFail);
  };

  const handleGetQuizResponsesSuccess = (responses: StudentResponse[]) => {
    setQuizResponses(responses);
  };
  const handleGetQuizResponsesFail = (error: any) => {
    toast.error(error);
  };

  switch (selectedTab) {
    case Tab.QUIZ:
      return (
        <TabQuiz
          quiz={quiz}
          quizResponses={quizResponses}
          onQuizResponsesChange={setQuizResponses}
          onSelectQuizResponse={setSelectedQuizResponse}
          className={className}
        />
      );
    case Tab.SETTINGS:
      return <TabSetting quiz={quiz} onQuizChange={onQuizChange} />;
    case Tab.QUESTION:
      return (
        <TabQuestion
          quiz={quiz}
          questionsBank={questionsBank}
          quizResponses={quizResponses}
          onQuizChange={onQuizChange}
          onAddQuestionsFromBank={handleAddQuestionFromBank}
          onReorderedQuestion={handleReorderedQuestion}
          onRemoveQuestion={handleRemoveQuestion}
          onSave={handleUpdateQuizQuestions}
        />
      );
    case Tab.QUESTION_BANK:
      return (
        <TabQuestionBank
          questions={questionsBank}
          onQuestionsChange={handleQuestionBankChange}
        />
      );
    case Tab.RESULTS:
      return <TabResults studentResponses={quizResponses} />;
    default:
      return notFound();
  }
};

export default TabContent;
