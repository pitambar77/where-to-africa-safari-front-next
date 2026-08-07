import React, { useMemo, useState } from "react";
import JoditEditor from "jodit-react";

import {
  FileText,
  Eye,
  Edit,
  Maximize2,
  Minimize2,
  CheckCircle,
} from "lucide-react";

const EditorBlock = ({ block, onChange }) => {
  const [preview, setPreview] = useState(false);

  const [fullscreen, setFullscreen] = useState(false);

  const [saved, setSaved] = useState(true);

  // const [editorValue, setEditorValue] = useState(block.content || "");

  // useEffect(() => {
  //   setEditorValue(block.content || "");
  // }, [block.blockId]);

  const config = useMemo(
    () => ({
      readonly: false,
      height: 450,
      placeholder: "Start writing your blog content...",

      toolbarSticky: false,

      buttons: [
        "source",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "image",
        "video",
        "table",
        "link",
        "|",
        "align",
        "outdent",
        "indent",
        "|",
        "hr",
        "eraser",
        "copyformat",
        "|",
        "undo",
        "redo",
        "|",
        "fullsize",
      ],
    }),
    [],
  );

const cleanHtml = (html) => {
  return html
    // Remove leading <br> inside paragraphs
    .replace(/<p>\s*<br\s*\/?>/gi, "<p>")

    // Remove leading <br> inside headings
    .replace(/<h([1-6])>\s*<br\s*\/?>/gi, "<h$1>")

    // Remove leading <br> inside list items
    .replace(/<li>\s*<br\s*\/?>/gi, "<li>")

    // Remove leading <br> inside blockquotes
    .replace(/<blockquote>\s*<br\s*\/?>/gi, "<blockquote>")

    // Remove empty paragraphs
    .replace(/<p>\s*(<br\s*\/?>)?\s*<\/p>/gi, "")

    // Remove empty headings
    .replace(/<h([1-6])>\s*(<br\s*\/?>)?\s*<\/h\1>/gi, "")

    // Remove empty list items
    .replace(/<li>\s*(<br\s*\/?>)?\s*<\/li>/gi, "")

    // Remove multiple consecutive <br>
    .replace(/(<br\s*\/?>\s*){2,}/gi, "<br>")

    // Remove whitespace between tags
    .replace(/>\s+</g, "><")

    .trim();
};

const handleEditorChange = (value) => {
  onChange({
    content: cleanHtml(value),
  });
};

  // const handleEditorChange = (value) => {
  //   console.log(value);

  //   onChange({
  //     content: value,
  //   });
  // };

  // const handleBlur = (value) => {
  //   setSaved(false);

  //   onChange({
  //     content: value,
  //   });

  //   setSaved(true);
  // };

  /* ----------------------------------------
   Statistics
---------------------------------------- */

  const plainText = (block.content || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const wordCount = plainText ? plainText.split(" ").length : 0;

  const characterCount = plainText.length;

  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const paragraphCount = (block.content?.match(/<p/gi) || []).length;

  const headingCount = (block.content?.match(/<h[1-6]/gi) || []).length;

  const lastEdited = new Date().toLocaleTimeString();

  return (
    <div className="space-y-6">
      {/* Heading */}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-blue-100 p-4">
            <FileText size={28} className="text-blue-600" />
          </div>

          <div>
            <h2 className="text-xl font-bold">Rich Text Editor</h2>

            <p className="text-sm text-gray-500">
              Write engaging blog content with formatting, tables, images and
              links.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setPreview(!preview)}
            className="flex items-center gap-2 rounded-xl border px-4 py-2 hover:bg-gray-100"
          >
            {preview ? (
              <>
                <Edit size={18} />
                Edit
              </>
            ) : (
              <>
                <Eye size={18} />
                Preview
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setFullscreen(!fullscreen)}
            className="rounded-xl border p-3 hover:bg-gray-100"
          >
            {fullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </div>

      {/* Editor */}

      <div
        className={
          fullscreen ? "fixed inset-0 z-50 bg-white p-10 overflow-auto" : ""
        }
      >
        {preview ? (
          <div
            className="prose prose-lg max-w-none rounded-2xl border bg-white p-8"
            dangerouslySetInnerHTML={{
              __html: block.content || "<p>No Content</p>",
            }}
          />
        ) : (
          <JoditEditor
            value={block.content || ""}
            config={config}
            onBlur={handleEditorChange}
          />
          // <JoditEditor
          //   value={editorValue}
          //   config={config}
          //   onChange={(value) => {
          //     setEditorValue(value);
          //   }}
          //   onBlur={(value) => {
          //     handleBlur(value);
          //   }}
          // />
        )}
      </div>

      <div className="flex items-center justify-end">
        <div className="flex items-center gap-2 rounded-full bg-green-50 px-4 py-2">
          <CheckCircle size={16} className="text-green-600" />

          <span className="text-sm">{saved ? "Saved" : "Saving..."}</span>
        </div>
      </div>

      {/* Footer */}

      <div className="grid gap-4 md:grid-cols-2">
        {/* Left */}

        <div className="rounded-2xl border bg-gray-50 p-5">
          <h4 className="mb-4 font-semibold">Content Statistics</h4>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Words</span>
              <strong>{wordCount}</strong>
            </div>

            <div className="flex justify-between">
              <span>Characters</span>
              <strong>{characterCount}</strong>
            </div>

            <div className="flex justify-between">
              <span>Reading Time</span>
              <strong>{readingTime} min</strong>
            </div>

            <div className="flex justify-between">
              <span>Paragraphs</span>
              <strong>{paragraphCount}</strong>
            </div>

            <div className="flex justify-between">
              <span>Headings</span>
              <strong>{headingCount}</strong>
            </div>
          </div>
        </div>

        {/* Right */}

        <div className="rounded-2xl border bg-white p-5">
          <h4 className="mb-4 font-semibold">Block Information</h4>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Block ID</span>
              <strong>{block.blockId}</strong>
            </div>

            <div className="flex justify-between">
              <span>Type</span>
              <strong>{block.type}</strong>
            </div>

            <div className="flex justify-between">
              <span>Order</span>
              <strong>{block.order}</strong>
            </div>

            <div className="flex justify-between">
              <span>Last Edited</span>
              <strong>{lastEdited}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorBlock;
