import { cn } from "@/lib/utils";

interface Props {
  fileName: string;
  className?: string;
}
export default function TopicFileExtension({ fileName, className }: Props) {
  const getFileNameExtension = (fileName: string) => {
    const split = fileName.split(".");
    return split[split.length - 1];
  };

  const extension = getFileNameExtension(fileName);
  const pdfExtensions = ["pdf"];
  const wordExtensions = ["doc", "docx"];
  const excelExtensions = ["xls", "xlsx"];
  const powerpointExtensions = ["ppt", "pptx"];
  const imageExtensions = ["png", "jpg", "jpeg", "gif"];
  const videoExtensions = ["mp4", "avi", "mkv"];
  const audioExtensions = ["mp3", "wav", "flac"];

  let color = "";
  if (pdfExtensions.includes(extension)) color = "text-red-500";
  else if (wordExtensions.includes(extension)) color = "text-blue-500";
  else if (excelExtensions.includes(extension)) color = "text-green-500";
  else if (powerpointExtensions.includes(extension)) color = "text-orange-500";
  else if (imageExtensions.includes(extension)) color = "text-purple-500";
  else if (videoExtensions.includes(extension)) color = "text-indigo-700";
  else if (audioExtensions.includes(extension)) color = "text-yellow-500";

  return <span className={cn(color, className)}>{`(.${extension})`}</span>;
}
