import GLOBAL from "@/global";
import { makeRequest, POST } from "@/lib/http-handle/http-handle";

export const startMeeting = (
  meetingId: string,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  makeRequest(
    "POST",
    `/v1/meeting/${meetingId}`,
    onSuccess,
    onFail,
    null,
    GLOBAL.MEETING_URL
  );
};
