import { GET, POST } from "@/lib/http-handle/http-handle";
import { StudentResponse } from "@/models/student-response";
import {
  convertQuizResponseFromResponseData,
  convertQuizResponseToRequestData,
} from "./adapters/student-response/quiz-response";

export const createQuizResponse = (
  topicId: string,
  quizResponse: StudentResponse,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  const reqData = convertQuizResponseToRequestData(quizResponse);
  POST(`/topic/${topicId}/quiz-response`, reqData, onSuccess, onFail);
};

export const getQuizResponses = (
  topicId: string,
  onSuccess: (data: StudentResponse[]) => void,
  onFail: (err?: any) => void
) => {
  const handleSuccess = (data: any) => {
    console.log("data get", data);
    const quizResponses = data.map(convertQuizResponseFromResponseData);
    console.log("quizResponses", quizResponses);
    onSuccess(quizResponses);
  };
  GET(`/topic/${topicId}/quiz-response`, handleSuccess, onFail);
};

export const getQuizResponse = (
  topicId: string,
  quizResponseId: string,
  onSuccess: (data: StudentResponse) => void,
  onFail: (err?: any) => void
) => {
  const handleSuccess = (data: any) => {
    const quizResponse = convertQuizResponseFromResponseData(data);
    onSuccess(quizResponse);
  };
  GET(
    `/topic/${topicId}/quiz-response/${quizResponseId}`,
    handleSuccess,
    onFail
  );
};
