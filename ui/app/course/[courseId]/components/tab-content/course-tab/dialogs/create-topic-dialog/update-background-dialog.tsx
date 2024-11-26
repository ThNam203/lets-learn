"use client";

import { Button } from "@/lib/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/lib/shadcn/dialog";
import { getFileInput, resetFileInput } from "@/lib/utils";
import { Course } from "@/models/course";
import { uploadImage } from "@/services/cloudinary";
import { Spinner } from "@nextui-org/spinner";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  course: Course;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: React.ReactNode;
  onUpdatedImage?: (url: string) => void;
}
export default function UpdateBackgroundDialog({
  course,
  open,
  onOpenChange,
  trigger,
  onUpdatedImage,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(course.imageUrl);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = () => {
    const newFile = getFileInput(inputRef);
    if (newFile) {
      //check if the file is an image
      if (!newFile.type.startsWith("image")) {
        toast.error("Please upload an image file");
      }
      const url = URL.createObjectURL(newFile);
      setImageURL(url);
      setImageFile(newFile);
    }
  };
  const handleUploadButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleCancel = () => {
    setImageURL(null);
    resetFileInput(inputRef);
    onOpenChange(false);
  };
  const handleSaveImageSuccess = (data: any) => {
    if (onUpdatedImage) {
      onUpdatedImage(data.secure_url);
      resetFileInput(inputRef);
      setIsUploading(false);
    }
    onOpenChange(false);
  };
  const handleSaveImageFail = (error: any) => {
    toast.error(error);
    setIsUploading(false);
  };
  const handleSave = () => {
    if (!imageFile) {
      toast.error("Please select an image");
      return;
    }
    setIsUploading(true);
    uploadImage(imageFile, handleSaveImageSuccess, handleSaveImageFail);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="min-w-[800px] w-fit">
        <DialogHeader>
          <h5 className="text-orange-600 font-bold">Customize course image</h5>
        </DialogHeader>
        <div className="relative w-full h-[300px] rounded-lg flex items-center justify-center overflow-hidden z-0">
          <Image
            src={imageURL || "/astronomy-bg.jpg"}
            alt="Astronomy background"
            width={1000}
            height={400}
            className="absolute w-full h-full object-cover"
          />
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="z-10 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 bg-black/40 transition-all duration-200">
            <Button
              onClick={handleUploadButtonClick}
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              Upload
            </Button>
          </div>
        </div>
        <DialogFooter className="flex flex-row justify-end">
          <Button variant="ghost" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {isUploading && <Spinner size="sm" color="white" />}
            {!isUploading && "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
