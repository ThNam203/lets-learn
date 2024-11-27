import { QuizTopic, Topic, TopicType } from "@/models/topic";

export const convertTopicToRequestData = (topic: Topic) => {
  const { type } = topic;
  let topicData;
  let reqData;
  if (type === TopicType.QUIZ) {
    topicData = topic as QuizTopic;
    const { id, data } = topicData;
    reqData = {
      ...topicData,
      id: id.length === 4 ? null : id,
      data: topicData.data ? JSON.stringify(topicData.data) : null,
    };
  }
  return reqData;
};
