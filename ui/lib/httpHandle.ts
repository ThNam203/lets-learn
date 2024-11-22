import GLOBAL from "@/global";

const HEADER = {
  "Content-Type": "application/json",
};

export const get = async (
  uri: string,
  onSuccess: (data: any) => void,
  onFail: () => void
) => {
  const res = await fetch(GLOBAL.API_URL + uri, {
    headers: HEADER,
  });
  if (!res.ok) {
    onFail();
    return;
  }
  const data = await res.json();
  onSuccess(data);
};

export const post = async (
  uri: string,
  reqData: any,
  onSuccess: (data: any) => void,
  onFail: () => void
) => {
  const res = await fetch(GLOBAL.API_URL + uri, {
    method: "POST",
    headers: HEADER,
    body: JSON.stringify(reqData),
  });
  if (!res.ok) {
    onFail();
    return;
  }
  const data = await res.json();
  onSuccess(data);
};
