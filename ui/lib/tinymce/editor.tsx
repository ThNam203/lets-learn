"use client";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";

interface Props {
  initValue?: string;
  onChange?: (data: string) => void;
}
const TinyEditor = ({ initValue, onChange }: Props) => {
  //each time initValue changes, the editor will be re-rendered so we need to store the initValue in a state
  const [_initValue, setInitValue] = useState<string>(initValue || "");
  const handleChange = (e: any) => {
    if (onChange) onChange(e.target.getContent());
  };

  return (
    // <Editor
    //   apiKey="p7z81chejai65m6tmap8bd0q4g4hxf5qbipdja5vvwqzeyb0"
    //   init={{
    //     plugins: [
    //       // Core editing features
    //       "anchor",
    //       "autosave",
    //       "autolink",
    //       "charmap",
    //       "codesample",
    //       "emoticons",
    //       "image",
    //       "link",
    //       "lists",
    //       "media",
    //       "searchreplace",
    //       "table",
    //       "visualblocks",
    //       "wordcount",
    //       "preview",
    //       // Your account includes a free trial of TinyMCE premium features
    //       // Try the most popular premium features until Sep 20, 2024:
    //     ],
    //     toolbar:
    //       "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
    //     resize: true,
    //   }}
    //   initialValue={_initValue}
    //   onChange={handleChange}
    // />
    <textarea
      value={_initValue}
      onChange={(e) => {
        setInitValue(e.target.value);
        if (onChange) onChange(e.target.value);
      }}
    />
  );
};

export default TinyEditor;
