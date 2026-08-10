import React, { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Type,
  Image,
  Images,
  PlayCircle,
  Quote,
  Table,
  HelpCircle,
  Minus,
  MousePointer,
  LayoutGrid,
  PanelsTopLeft,
  PanelTop,
} from "lucide-react";

import EditorBlock from "./EditorBlock";
import TextImageBlock from "./TextImageBlock";
import ImageBlock from "./ImageBlock";
import GalleryBlock from "./GalleryBlock";
import ImageGridBlock from "./ImageGridBlock";
import SliderBlock from "./SliderBlock";
import VideoBlock from "./VideoBlock";
import FAQBlock from "./FAQBlock";
import AccordionBlock from "./AccordionBlock";
import DividerBlock from "./DividerBlock";
import ButtonBlock from "./ButtonBlock";
import TableBlock from "./TableBlock";
import CalloutBlock from "./CalloutBlock";
import QuoteBlock from "./QuoteBlock";

const BLOCKS = [
  {
    type: "editor",
    label: "Editor",
    icon: Type,
  },
  {
    type: "textImage",
    label: "Text + Image",
    icon: PanelsTopLeft,
  },
  {
    type: "image",
    label: "Image",
    icon: Image,
  },
  {
    type: "gallery",
    label: "Gallery",
    icon: Images,
  },
  {
    type: "imageGrid",
    label: "Image Grid",
    icon: LayoutGrid,
  },
  {
    type: "slider",
    label: "Slider",
    icon: PanelTop,
  },
  {
    type: "video",
    label: "Video",
    icon: PlayCircle,
  },
  {
    type: "faq",
    label: "FAQ",
    icon: HelpCircle,
  },
  {
    type: "accordion",
    label: "Accordion",
    icon: PanelsTopLeft,
  },
  {
    type: "callout",
    label: "Callout",
    icon: PanelsTopLeft,
  },
  {
    type: "quote",
    label: "Quote",
    icon: Quote,
  },
  {
    type: "table",
    label: "Table",
    icon: Table,
  },
  {
    type: "divider",
    label: "Divider",
    icon: Minus,
  },
  {
    type: "button",
    label: "Button",
    icon: MousePointer,
  },
];

/* ------------------------------------
   Component
------------------------------------ */

const ContentBuilder = ({
  blocks = [],
  onChange,
  sidebar = false,
  onBlockAdded,
  scrollToBlockId = null,
}) => {
  const [showBlocks, setShowBlocks] = useState(false);

  useEffect(() => {
    if (!scrollToBlockId) return;

    const element = document.getElementById(`content-block-${scrollToBlockId}`);

    if (!element) return;

    setTimeout(() => {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  }, [scrollToBlockId]);

  /* ------------------------------------
     Add Block
  ------------------------------------ */

  const addBlock = (type) => {
    const newBlock = {
      blockId: crypto.randomUUID(),

      type,

      order: blocks.length + 1,

      title: "",

      subtitle: "",

      content: "",

      layout: "right",

      media: [],

      items: [],

      headers: [],

      rows: [],

      buttonText: "",

      buttonUrl: "",

      style: "",

      columns: 3,
    };

    onChange([...blocks, newBlock]);

    setShowBlocks(false);
    if (onBlockAdded) {
      onBlockAdded(newBlock.blockId);
    }
  };

  /* ------------------------------------
     Delete
  ------------------------------------ */

  // const deleteBlock = (id) => {
  //   const updated = blocks.filter((block) => block.blockId !== id);

  //   onChange(updated);
  // };

  const deleteBlock = (id) => {
    const updated = blocks
      .filter((block) => block.blockId !== id)
      .map((block, index) => ({
        ...block,
        order: index + 1,
      }));

    onChange(updated);
  };

  /* ------------------------------------
     Move Up
  ------------------------------------ */

  // const moveUp = (index) => {
  //   if (index === 0) return;

  //   const updated = [...blocks];

  //   [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];

  //   onChange(updated);
  // };

  const moveUp = (index) => {
    if (index === 0) return;

    const updated = [...blocks];

    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];

    const reordered = updated.map((block, i) => ({
      ...block,
      order: i + 1,
    }));

    onChange(reordered);
  };

  /* ------------------------------------
     Move Down
  ------------------------------------ */

  // const moveDown = (index) => {
  //   if (index === blocks.length - 1) return;

  //   const updated = [...blocks];

  //   [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];

  //   onChange(updated);
  // };

  const moveDown = (index) => {
    if (index === blocks.length - 1) return;

    const updated = [...blocks];

    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];

    const reordered = updated.map((block, i) => ({
      ...block,
      order: i + 1,
    }));

    onChange(reordered);
  };

  /* ------------------------------------
   Update Block
------------------------------------ */

  const updateBlock = (blockId, data) => {
    const updated = blocks.map((block) =>
      block.blockId === blockId
        ? {
            ...block,
            ...data,
          }
        : block,
    );

    onChange(updated);
  };

  // return (
  //   <div className="space-y-6">
  //     {/* Header */}

  //     <div className="rounded-2xl bg-white border shadow-sm">
  //       <div className="flex items-center justify-between p-6">
  //         <div>
  //           <h2 className="text-xl font-semibold">Content Builder</h2>

  //           <p className="mt-1 text-sm text-gray-500">
  //             Build your article visually.
  //           </p>
  //         </div>

  //         <button
  //           onClick={() => setShowBlocks(!showBlocks)}
  //           className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
  //         >
  //           <Plus size={18} />
  //           Add Section
  //         </button>
  //       </div>
  //     </div>

  //     {/* ======================================
  //         Block Picker
  //     ====================================== */}

  //     {showBlocks && (
  //       <div className="rounded-2xl border bg-white p-6 shadow-sm">
  //         <h3 className="mb-2 text-xl font-semibold">Choose a Section</h3>

  //         <p className="mb-6 text-sm text-gray-500">
  //           Click any block below to add it to your blog.
  //         </p>

  //         <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
  //           {BLOCKS.map((block) => {
  //             const Icon = block.icon;

  //             return (
  //               <button
  //                 key={block.type}
  //                 type="button"
  //                 onClick={() => addBlock(block.type)}
  //                 className="group rounded-2xl border bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg"
  //               >
  //                 <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 transition-all group-hover:bg-blue-600">
  //                   <Icon
  //                     size={28}
  //                     className="text-blue-600 transition-all group-hover:text-white"
  //                   />
  //                 </div>

  //                 <h4 className="font-semibold text-gray-800">{block.label}</h4>

  //                 <p className="mt-1 text-sm text-gray-500">
  //                   Add {block.label} section
  //                 </p>
  //               </button>
  //             );
  //           })}
  //         </div>
  //       </div>
  //     )}

  //     {/* ======================================
  //         Sections
  //     ====================================== */}

  //     <div className="space-y-5">
  //       {blocks.length === 0 && (
  //         <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-16 text-center">
  //           <Plus size={50} className="mx-auto mb-4 text-gray-400" />

  //           <h3 className="text-xl font-semibold">No Sections Added</h3>

  //           <p className="mt-2 text-gray-500">
  //             Click the
  //             <span className="font-semibold text-blue-600"> Add Section </span>
  //             button to start building your article.
  //           </p>
  //         </div>
  //       )}

  //       {blocks.map((block, index) => {
  //         const blockInfo = BLOCKS.find((item) => item.type === block.type);

  //         const Icon = blockInfo?.icon || Type;

  //         return (
  //           <div
  //             key={block.blockId}
  //             className="overflow-hidden rounded-2xl border bg-white shadow-sm"
  //           >
  //             {/* Header */}

  //             <div className="flex items-center justify-between border-b bg-gray-50 px-6 py-4">
  //               <div className="flex items-center gap-4">
  //                 <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
  //                   <Icon size={22} className="text-blue-600" />
  //                 </div>

  //                 <div>
  //                   <h3 className="font-semibold">{blockInfo?.label}</h3>

  //                   <p className="text-sm text-gray-500">Section {index + 1}</p>
  //                 </div>
  //               </div>

  //               <div className="flex items-center gap-2">
  //                 <button
  //                   type="button"
  //                   onClick={() => moveUp(index)}
  //                   className="rounded-lg border p-2 hover:bg-gray-100"
  //                 >
  //                   <ChevronUp size={18} />
  //                 </button>

  //                 <button
  //                   type="button"
  //                   onClick={() => moveDown(index)}
  //                   className="rounded-lg border p-2 hover:bg-gray-100"
  //                 >
  //                   <ChevronDown size={18} />
  //                 </button>

  //                 <button
  //                   type="button"
  //                   onClick={() => deleteBlock(block.blockId)}
  //                   className="rounded-lg border border-red-300 p-2 text-red-600 hover:bg-red-50"
  //                 >
  //                   <Trash2 size={18} />
  //                 </button>
  //               </div>
  //             </div>

  //             {/* Block UI */}

  //             <div className="p-6">
  //               {/* Part 2 will render the block component here */}
  //               <>
  //                 {block.type === "editor" && (
  //                   <EditorBlock
  //                     block={block}
  //                     onChange={(data) => updateBlock(block.blockId, data)}
  //                   />
  //                 )}

  //                 {block.type === "textImage" && (
  //                   <TextImageBlock
  //                     block={block}
  //                     onChange={(data) => updateBlock(block.blockId, data)}
  //                   />
  //                 )}

  //                 {block.type === "image" && (
  //                   <ImageBlock
  //                     block={block}
  //                     onChange={(data) => updateBlock(block.blockId, data)}
  //                   />
  //                 )}

  //                 {block.type === "gallery" && (
  //                   <GalleryBlock
  //                     block={block}
  //                     onChange={(data) => updateBlock(block.blockId, data)}
  //                   />
  //                 )}

  //                 {block.type === "imageGrid" && (
  //                   <ImageGridBlock
  //                     block={block}
  //                     onChange={(data) => updateBlock(block.blockId, data)}
  //                   />
  //                 )}

  //                 {block.type === "slider" && (
  //                   <SliderBlock
  //                     block={block}
  //                     onChange={(data) => updateBlock(block.blockId, data)}
  //                   />
  //                 )}

  //                 {block.type === "video" && (
  //                   <VideoBlock
  //                     block={block}
  //                     onChange={(data) => updateBlock(block.blockId, data)}
  //                   />
  //                 )}

  //                 {block.type === "faq" && (
  //                   <FAQBlock
  //                     block={block}
  //                     onChange={(data) => updateBlock(block.blockId, data)}
  //                   />
  //                 )}

  //                 {block.type === "quote" && (
  //                   <QuoteBlock
  //                     block={block}
  //                     onChange={(data) => updateBlock(block.blockId, data)}
  //                   />
  //                 )}

  //                 {block.type === "callout" && (
  //                   <CalloutBlock
  //                     block={block}
  //                     onChange={(data) => updateBlock(block.blockId, data)}
  //                   />
  //                 )}

  //                 {block.type === "table" && (
  //                   <TableBlock
  //                     block={block}
  //                     onChange={(data) => updateBlock(block.blockId, data)}
  //                   />
  //                 )}

  //                 {block.type === "button" && (
  //                   <ButtonBlock
  //                     block={block}
  //                     onChange={(data) => updateBlock(block.blockId, data)}
  //                   />
  //                 )}

  //                 {block.type === "divider" && (
  //                   <DividerBlock
  //                     block={block}
  //                     onChange={(data) => updateBlock(block.blockId, data)}
  //                   />
  //                 )}

  //                 {block.type === "accordion" && (
  //                   <AccordionBlock
  //                     block={block}
  //                     onChange={(data) => updateBlock(block.blockId, data)}
  //                   />
  //                 )}
  //               </>
  //             </div>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   </div>
  // );

  return (
    <div className="space-y-6 mt-2">
      {/* =========================================
        RIGHT SIDEBAR - ADD SECTION
    ========================================= */}
      {sidebar ? (
        <div className="rounded-md border border-gray-400 bg-white shadow-sm">
          <div className="border-b p-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Content Builder
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add a section to your blog
            </p>
          </div>

          <div className="max-h-[calc(60vh-100px)] overflow-y-auto p-4">
            <div className="grid grid-cols-2 gap-3">
              {BLOCKS.map((block) => {
                const Icon = block.icon;

                return (
                  <button
                    key={block.type}
                    type="button"
                    onClick={() => addBlock(block.type)}
                    className="
                    group flex flex-col items-center
                    rounded-xl border bg-white p-4
                    text-center
                    transition-all
                    hover:-translate-y-0.5
                    hover:border-blue-500
                    hover:bg-blue-50
                    hover:shadow-md
                  "
                  >
                    <div
                      className="
                      mb-2 flex h-10 w-10
                      items-center justify-center
                      rounded-lg bg-blue-100
                      transition
                      group-hover:bg-blue-600
                    "
                    >
                      <Icon
                        size={20}
                        className="
                        text-blue-600
                        group-hover:text-white
                      "
                      />
                    </div>

                    <span className="text-sm font-medium text-gray-800">
                      {block.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* =========================================
         LEFT SIDE - CONTENT SECTIONS
      ========================================= */
        <div className="space-y-6">
          {/* Content Header */}
          <div className="rounded-2xl border bg-white shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold">Blog Content</h2>

              <p className="mt-1 text-sm text-gray-500">
                Build your article using content sections.
              </p>
            </div>
          </div>

          {/* ======================================
            EMPTY STATE
        ====================================== */}

          <div className="space-y-5">
            {blocks.length === 0 && (
              <div
                className="
                rounded-2xl
                border-2
                border-dashed
                border-gray-300
                bg-white
                p-16
                text-center
              "
              >
                <Plus size={50} className="mx-auto mb-4 text-gray-400" />

                <h3 className="text-xl font-semibold">No Sections Added</h3>

                <p className="mt-2 text-gray-500">
                  Select a section from the
                  <span className="font-semibold text-blue-600">
                    {" "}
                    Content Builder{" "}
                  </span>
                  on the right.
                </p>
              </div>
            )}

            {/* ======================================
              CONTENT BLOCKS
          ====================================== */}

            {blocks.map((block, index) => {
              const blockInfo = BLOCKS.find((item) => item.type === block.type);

              const Icon = blockInfo?.icon || Type;

              return (
                <div
                  id={`content-block-${block.blockId}`}
                  key={block.blockId}
                  className="
                  overflow-hidden
                  rounded-2xl
                  border
                  bg-white
                  shadow-sm
                "
                >
                  {/* BLOCK HEADER */}

                  <div
                    className="
                    flex
                    items-center
                    justify-between
                    border-b
                    bg-gray-50
                    px-6
                    py-4
                  "
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="
                        flex h-12 w-12
                        items-center justify-center
                        rounded-xl
                        bg-blue-100
                      "
                      >
                        <Icon size={22} className="text-blue-600" />
                      </div>

                      <div>
                        <h3 className="font-semibold">{blockInfo?.label}</h3>

                        <p className="text-sm text-gray-500">
                          Section {index + 1}
                        </p>
                      </div>
                    </div>

                    {/* CONTROLS */}

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => moveUp(index)}
                        disabled={index === 0}
                        className="
                        rounded-lg
                        border
                        p-2
                        hover:bg-gray-100
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                      "
                      >
                        <ChevronUp size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={() => moveDown(index)}
                        disabled={index === blocks.length - 1}
                        className="
                        rounded-lg
                        border
                        p-2
                        hover:bg-gray-100
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                      "
                      >
                        <ChevronDown size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteBlock(block.blockId)}
                        className="
                        rounded-lg
                        border
                        border-red-300
                        p-2
                        text-red-600
                        hover:bg-red-50
                      "
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* BLOCK CONTENT */}

                  <div className="p-6">
                    {block.type === "editor" && (
                      <EditorBlock
                        block={block}
                        onChange={(data) => updateBlock(block.blockId, data)}
                      />
                    )}

                    {block.type === "textImage" && (
                      <TextImageBlock
                        block={block}
                        onChange={(data) => updateBlock(block.blockId, data)}
                      />
                    )}

                    {block.type === "image" && (
                      <ImageBlock
                        block={block}
                        onChange={(data) => updateBlock(block.blockId, data)}
                      />
                    )}

                    {block.type === "gallery" && (
                      <GalleryBlock
                        block={block}
                        onChange={(data) => updateBlock(block.blockId, data)}
                      />
                    )}

                    {block.type === "imageGrid" && (
                      <ImageGridBlock
                        block={block}
                        onChange={(data) => updateBlock(block.blockId, data)}
                      />
                    )}

                    {block.type === "slider" && (
                      <SliderBlock
                        block={block}
                        onChange={(data) => updateBlock(block.blockId, data)}
                      />
                    )}

                    {block.type === "video" && (
                      <VideoBlock
                        block={block}
                        onChange={(data) => updateBlock(block.blockId, data)}
                      />
                    )}

                    {block.type === "faq" && (
                      <FAQBlock
                        block={block}
                        onChange={(data) => updateBlock(block.blockId, data)}
                      />
                    )}

                    {block.type === "accordion" && (
                      <AccordionBlock
                        block={block}
                        onChange={(data) => updateBlock(block.blockId, data)}
                      />
                    )}

                    {block.type === "callout" && (
                      <CalloutBlock
                        block={block}
                        onChange={(data) => updateBlock(block.blockId, data)}
                      />
                    )}

                    {block.type === "quote" && (
                      <QuoteBlock
                        block={block}
                        onChange={(data) => updateBlock(block.blockId, data)}
                      />
                    )}

                    {block.type === "table" && (
                      <TableBlock
                        block={block}
                        onChange={(data) => updateBlock(block.blockId, data)}
                      />
                    )}

                    {block.type === "button" && (
                      <ButtonBlock
                        block={block}
                        onChange={(data) => updateBlock(block.blockId, data)}
                      />
                    )}

                    {block.type === "divider" && (
                      <DividerBlock
                        block={block}
                        onChange={(data) => updateBlock(block.blockId, data)}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentBuilder;
