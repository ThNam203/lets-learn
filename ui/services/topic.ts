import { Topic } from "@/models/topic";
import {
  convertTopicFromResponseData,
  convertTopicToRequestData,
} from "./adapters/topic";
import { GET, PUT } from "@/lib/http-handle/http-handle";

export const getTopic = (
  id: string,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  const handleSuccess = (data: any) => {
    const res = convertTopicFromResponseData(data);
    onSuccess(res);
  };
  GET(`/topic/${id}`, handleSuccess, onFail);
};

export const updateTopic = (
  data: Topic,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  const { id } = data;
  let reqData = convertTopicToRequestData(data);

  const handleSuccess = (data: any) => {
    const res = convertTopicFromResponseData(data);
    onSuccess(res);
  };
  console.log("reqData", reqData);
  PUT(`/topic/${id}`, reqData, handleSuccess, onFail);
};
