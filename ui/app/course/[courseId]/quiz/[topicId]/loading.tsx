import { TopicType } from "@/models/topic";
import QuizSkeleton from "./components/skeleton/quiz-skeleton";
import { Tab } from "./components/static-data";

export default function Loading() {
  const tabs = Object.values(Tab);
  return <QuizSkeleton type={TopicType.QUIZ} tabs={tabs} />;
}
