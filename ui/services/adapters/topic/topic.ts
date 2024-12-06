import { AssignmentTopic, QuizTopic, Topic, TopicType } from "@/models/topic";
import { convertAssignmentToRequestData } from "./convert-assignment";
import { convertQuizToRequestData } from "./convert-quiz";
import { convertQuestionFromResponseData } from "../question";

export const convertTopicToRequestData = (topic: Topic) => {
  const { type } = topic;
  let reqData;
  if (type === TopicType.QUIZ) {
    reqData = convertQuizToRequestData(topic as QuizTopic);
  } else if (type === TopicType.ASSIGNMENT) {
    reqData = convertAssignmentToRequestData(topic as AssignmentTopic);
  }
  return reqData;
};

export const convertTopicFromResponseData = (topic: any): Topic => {
  console.log("topic", topic);
  const parsedData = JSON.parse(topic.data);
  const convertedQuestions = parsedData.questions.map((q: any) =>
    convertQuestionFromResponseData(q)
  );
  console.log("parsedData", parsedData);
  let res = {
    ...topic,
    data: {
      ...parsedData,
      questions: convertedQuestions,
    },
  };
  console.log("res", res);
  return res as Topic;
};
