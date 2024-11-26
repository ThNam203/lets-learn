"use client";
import { Textarea } from "@/lib/shadcn/textarea";
import { useEffect, useRef } from "react";

interface Props {
  desc: string;
  isEditting?: boolean;
  onChange?: (value: string) => void;
}
export default function SectionDescription({
  desc,
  isEditting = false,
  onChange,
}: Props) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) onChange(e.target.value);
  };
  useEffect(() => {
    if (isEditting && inputRef.current) {
      inputRef.current.value = desc;
    }
  }, [desc]);
  return (
    <>
      {!isEditting ? (
        <h6 className="text-gray-500 font-medium text-sm">{desc}</h6>
      ) : (
        <Textarea
          ref={inputRef}
          defaultValue={desc}
          variant="no-border"
          className="text-gray-500 font-medium text-sm"
          onChange={handleChange}
        />
      )}
    </>
  );
}
