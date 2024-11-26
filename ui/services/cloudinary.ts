import { UploadFile } from "@/lib/cloudinary/cloudinary-handler";

export const uploadImage = async (
  file: File,
  onSuccess: (data: any) => void,
  onFail: (err?: string) => void
) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await UploadFile(formData);
    if (res.error) onFail(res.error);
    else onSuccess(res.data);
  } catch (err: any) {
    onFail(err);
  }
};
