import GLOBAL from "@/global";

const HEADER = {
  "Content-Type": "application/json",
};

export const get = async (
  uri: string,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  const res = await fetch(GLOBAL.API_URL + uri, {
    headers: HEADER,
  });
  if (!res.ok) {
    onFail(res.statusText);
    return;
  }
  await res
    .json()
    .then(onSuccess)
    .catch(() => onFail("Failed to parse data"));
};

export const post = async (
  uri: string,
  reqData: any,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  const res = await fetch(GLOBAL.API_URL + uri, {
    method: "POST",
    headers: HEADER,
    body: JSON.stringify(reqData),
    credentials: "include",
  });

  if (!res.ok) {
    onFail(res.statusText);
    return;
  }
  await res
    .json()
    .then(onSuccess)
    .catch(() => onFail("Failed to parse data"));
};
