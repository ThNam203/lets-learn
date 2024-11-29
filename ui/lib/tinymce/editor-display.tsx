import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { cn } from "../utils";

interface Props {
  htmlString: string;
  className?: string;
}
const EditorDisplay = ({ htmlString, className }: Props) => {
  return (
    <div
      className={cn(
        "h-fit [&>div.tox-tinymce]:border-0 [&>html]:scrollbar [&_*]:!bg-transparent",
        className
      )}
    >
      <Editor
        apiKey={process.env.TINYMCE_API_KEY}
        init={{
          plugins: ["autoresize"],
          statusbar: false,
          menu: {},
          menubar: false,
          toolbar: false,
          highlight_on_focus: false,
          editable_root: false,
          content_style:
            "iframe {background-color: transparent;} .mce-content-body {box-shadow: none !important; cursor: default; margin: 0;} ",
        }}
        disabled={true}
        initialValue={htmlString}
      />
    </div>
  );
};

export default EditorDisplay;
