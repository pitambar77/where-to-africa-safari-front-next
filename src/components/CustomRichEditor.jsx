"use client";

import { useEffect, useRef } from "react";

const CustomRichEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const isFocused = document.activeElement === editorRef.current;

    if (!isFocused) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const cleanHTML = (html) => {
    // Create temp container
    const temp = document.createElement("div");
    temp.innerHTML = html;

    // Remove MS Word comments
    temp.innerHTML = temp.innerHTML.replace(/<!--[\s\S]*?-->/g, "");

    // Remove style tags
    temp.querySelectorAll("style").forEach((el) => el.remove());

    // Remove meta tags
    temp.querySelectorAll("meta").forEach((el) => el.remove());

    // Remove xml tags
    temp.querySelectorAll("xml").forEach((el) => el.remove());

    // Remove unwanted attributes
    temp.querySelectorAll("*").forEach((el) => {
      // Remove MS Word / Google Docs junk
      el.removeAttribute("style");
      el.removeAttribute("class");
      el.removeAttribute("id");
      el.removeAttribute("dir");
      el.removeAttribute("role");

      // Keep only safe link attrs
      if (el.tagName !== "A") {
        el.removeAttribute("target");
        el.removeAttribute("rel");
      }
    });

    // Remove empty spans
    temp.querySelectorAll("span").forEach((span) => {
      span.replaceWith(...span.childNodes);
    });

    // Remove empty paragraphs
    temp.querySelectorAll("p").forEach((p) => {
      if (p.innerHTML.trim() === "<br>" || p.innerHTML.trim() === "") {
        p.remove();
      }
    });

    return temp.innerHTML;
  };

  const handlePaste = (e) => {
    e.preventDefault();

    // Get HTML or plain text
    const html =
      e.clipboardData.getData("text/html") ||
      e.clipboardData.getData("text/plain");

    if (!html) return;

    // Create temp container
    const temp = document.createElement("div");
    temp.innerHTML = html;

    temp.innerHTML = temp.innerHTML.replace(/<!--[\s\S]*?-->/g, "");

    // CLEAN WORD / GOOGLE DOCS JUNK
    temp.querySelectorAll("*").forEach((el) => {
      el.removeAttribute("style");
      el.removeAttribute("class");
      el.removeAttribute("id");
      el.removeAttribute("dir");
      el.removeAttribute("role");

      // Remove aria attributes
      [...el.attributes].forEach((attr) => {
        if (attr.name.startsWith("aria-")) {
          el.removeAttribute(attr.name);
        }
      });

      // Keep only safe link attrs
      if (el.tagName !== "A") {
        el.removeAttribute("target");
        el.removeAttribute("rel");
      }

      // Remove empty spans
      if (el.tagName === "SPAN") {
        el.replaceWith(...el.childNodes);
      }
    });

    // Insert cleaned HTML
    document.execCommand("insertHTML", false, temp.innerHTML);

    // Save updated content
    handleInput();
  };

  const handleInput = () => {
    const cleaned = cleanHTML(editorRef.current.innerHTML);

    onChange(cleaned);
  };

  // Bold
  const handleBold = () => {
    document.execCommand("bold");
  };

  // Italic
  const handleItalic = () => {
    document.execCommand("italic");
  };

  // Underline
  const handleUnderline = () => {
    document.execCommand("underline");
  };

  // Heading
  const handleHeading = (tag) => {
    document.execCommand("formatBlock", false, tag);
  };

  // Bullet List
  const handleBulletList = () => {
    document.execCommand("insertUnorderedList");
  };

  // Number List
  const handleNumberList = () => {
    document.execCommand("insertOrderedList");
  };

  // Highlight
  const handleHighlight = () => {
    document.execCommand("backColor", false, "yellow");
  };

  // Link
  const handleLink = () => {
    const url = prompt("Enter URL");

    if (url) {
      document.execCommand("createLink", false, url);

      const links = editorRef.current.querySelectorAll("a");

      links.forEach((link) => {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      });

      handleInput();
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-3 border-b bg-gray-50">
        <button
          type="button"
          onClick={handleBold}
          className="border px-3 py-1 rounded font-bold"
        >
          B
        </button>

        <button
          type="button"
          onClick={handleItalic}
          className="border px-3 py-1 rounded italic"
        >
          I
        </button>

        <button
          type="button"
          onClick={handleUnderline}
          className="border px-3 py-1 rounded underline"
        >
          U
        </button>

        <button
          type="button"
          onClick={handleHighlight}
          className="border px-3 py-1 rounded"
        >
          Highlight
        </button>

        <button
          type="button"
          onClick={handleLink}
          className="border px-3 py-1 rounded text-[#d87029]"
        >
          Link
        </button>

        <button
          type="button"
          onClick={() => handleHeading("H1")}
          className="border px-3 py-1 rounded font-bold"
        >
          H1
        </button>

        <button
          type="button"
          onClick={() => handleHeading("H2")}
          className="border px-3 py-1 rounded font-bold"
        >
          H2
        </button>

        <button
          type="button"
          onClick={() => handleHeading("H3")}
          className="border px-3 py-1 rounded font-bold"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => handleHeading("H4")}
          className="border px-3 py-1 rounded font-bold"
        >
          H4
        </button>
        <button
          type="button"
          onClick={() => handleHeading("H5")}
          className="border px-3 py-1 rounded font-bold"
        >
          H5
        </button>
        <button
          type="button"
          onClick={() => handleHeading("H6")}
          className="border px-3 py-1 rounded font-bold"
        >
          H6
        </button>

        <button
          type="button"
          onClick={handleBulletList}
          className="border px-3 py-1 rounded"
        >
          • List
        </button>

        <button
          type="button"
          onClick={handleNumberList}
          className="border px-3 py-1 rounded"
        >
          1. List
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onPaste={handlePaste}
        className="
        min-h-[200px]
           max-h-[400px]
  overflow-y-auto
  overflow-x-hidden
          p-4
          rich-text
          outline-none
          max-w-none
        "
      />
    </div>
  );
};

export default CustomRichEditor;
