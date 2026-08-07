"use client";

import { useState } from "react";

import {
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  PanelsTopLeft,
} from "lucide-react";

const AccordionBlock = ({ block = {}, onChange = () => {} }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = block.items || [];

  /* =====================================
      Add Item
  ===================================== */

  const addItem = () => {
    onChange({
      items: [
        ...items,
        {
          title: "",
          content: "",
        },
      ],
    });

    setActiveIndex(items.length);
  };

  /* =====================================
      Remove Item
  ===================================== */

  const removeItem = (index) => {
    const updated = [...items];

    updated.splice(index, 1);

    onChange({
      items: updated,
    });

    if (activeIndex >= updated.length) {
      setActiveIndex(updated.length - 1);
    }
  };

  /* =====================================
      Update Item
  ===================================== */

  const updateItem = (index, field, value) => {
    const updated = [...items];

    updated[index][field] = value;

    onChange({
      items: updated,
    });
  };

  return (
    <div className="space-y-8">
      {/* =====================================
          Header
      ===================================== */}

      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-blue-100 p-4">
          <PanelsTopLeft size={30} className="text-blue-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold">Accordion Block</h2>

          <p className="text-gray-500">
            Create expandable content sections for itineraries, package details,
            policies, and more.
          </p>
        </div>
      </div>

      {/* =====================================
          Section Title
      ===================================== */}

      <div>
        <label className="mb-2 block font-medium">Section Title</label>

        <input
          type="text"
          value={block.title || ""}
          onChange={(e) =>
            onChange({
              title: e.target.value,
            })
          }
          className="w-full rounded-xl border p-3"
          placeholder="Travel Information"
        />
      </div>

      {/* =====================================
          Section Description
      ===================================== */}

      <div>
        <label className="mb-2 block font-medium">Section Description</label>

        <textarea
          rows={4}
          value={block.description || ""}
          onChange={(e) =>
            onChange({
              description: e.target.value,
            })
          }
          className="w-full rounded-xl border p-3"
          placeholder="Optional introduction..."
        />
      </div>

      {/* =====================================
          Add Accordion Item
      ===================================== */}

      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        <Plus size={18} />
        Add Accordion Item
      </button>

      {/* =====================================
          Empty State
      ===================================== */}

      {items.length === 0 && (
        <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 py-16 text-center">
          <PanelsTopLeft size={60} className="mx-auto mb-4 text-gray-400" />

          <h3 className="text-xl font-semibold">No Accordion Items</h3>

          <p className="mt-2 text-gray-500">
            Click "Add Accordion Item" to start building your content.
          </p>
        </div>
      )}
      {/* =====================================
          Accordion Items
      ===================================== */}

      <div className="space-y-5">
        {items.map((item, index) => {
          const expanded = activeIndex === index;

          return (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border bg-white shadow-sm"
            >
              {/* =====================================
                  Accordion Header
              ===================================== */}

              <div
                className="flex cursor-pointer items-center justify-between bg-gray-50 px-6 py-5 transition hover:bg-gray-100"
                onClick={() => setActiveIndex(expanded ? -1 : index)}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                    {index + 1}
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {item.title || `Accordion Item ${index + 1}`}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {item.content
                        ? `${item.content.substring(0, 70)}${
                            item.content.length > 70 ? "..." : ""
                          }`
                        : "No content added"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(index);
                    }}
                    className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </button>

                  {expanded ? (
                    <ChevronUp size={22} />
                  ) : (
                    <ChevronDown size={22} />
                  )}
                </div>
              </div>

              {/* =====================================
                  Accordion Body
              ===================================== */}

              {expanded && (
                <div className="space-y-6 border-t p-6">
                  {/* Title */}

                  <div>
                    <label className="mb-2 block font-medium">
                      Accordion Title
                    </label>

                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) =>
                        updateItem(index, "title", e.target.value)
                      }
                      className="w-full rounded-xl border p-3"
                      placeholder="Enter accordion title..."
                    />
                  </div>

                  {/* Content */}

                  <div>
                    <label className="mb-2 block font-medium">Content</label>

                    <textarea
                      rows={8}
                      value={item.content}
                      onChange={(e) =>
                        updateItem(index, "content", e.target.value)
                      }
                      className="w-full rounded-xl border p-4"
                      placeholder="Write your content here...

Later you can replace this textarea with your EditorBlock or Tiptap editor."
                    />
                  </div>

                  {/* Content Info */}

                  <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <h4 className="font-semibold text-blue-700">
                      Future Upgrade
                    </h4>

                    <p className="mt-2 text-sm text-blue-600">
                      This textarea can later be replaced with your{" "}
                      <strong>EditorBlock</strong> or
                      <strong> Tiptap Rich Text Editor</strong>
                      so each accordion item can contain images, videos, tables,
                      galleries, buttons, quotes, and any other content block.
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* =====================================
          Quick Statistics
      ===================================== */}

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Accordion Items</p>

          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            {items.length}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Titles Filled</p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {items.filter((item) => item.title?.trim()).length}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Content Filled</p>

          <h2 className="mt-2 text-3xl font-bold text-purple-600">
            {items.filter((item) => item.content?.trim()).length}
          </h2>
        </div>
      </div>
      {/* =====================================
          Accordion Settings
      ===================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h3 className="text-lg font-semibold">Accordion Settings</h3>

          <p className="text-sm text-gray-500">
            Configure the appearance and behavior of the accordion.
          </p>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          {/* Style */}

          <div>
            <label className="mb-2 block font-medium">Accordion Style</label>

            <select
              value={block.style || "boxed"}
              onChange={(e) =>
                onChange({
                  style: e.target.value,
                })
              }
              className="w-full rounded-xl border p-3"
            >
              <option value="boxed">Boxed</option>

              <option value="minimal">Minimal</option>

              <option value="filled">Filled</option>
            </select>
          </div>

          {/* Width */}

          <div>
            <label className="mb-2 block font-medium">Max Width</label>

            <select
              value={block.width || "100%"}
              onChange={(e) =>
                onChange({
                  width: e.target.value,
                })
              }
              className="w-full rounded-xl border p-3"
            >
              <option value="100%">Full Width</option>

              <option value="90%">90%</option>

              <option value="80%">80%</option>

              <option value="70%">70%</option>
            </select>
          </div>

          {/* Icon */}

          <div>
            <label className="mb-2 block font-medium">Expand Icon</label>

            <select
              value={block.icon || "chevron"}
              onChange={(e) =>
                onChange({
                  icon: e.target.value,
                })
              }
              className="w-full rounded-xl border p-3"
            >
              <option value="chevron">Chevron</option>

              <option value="plus">Plus</option>

              <option value="arrow">Arrow</option>
            </select>
          </div>

          {/* Animation */}

          <div>
            <label className="mb-2 block font-medium">Animation Speed</label>

            <input
              type="number"
              min="100"
              max="1000"
              step="100"
              value={block.animation || 300}
              onChange={(e) =>
                onChange({
                  animation: Number(e.target.value),
                })
              }
              className="w-full rounded-xl border p-3"
            />
          </div>
        </div>
      </div>

      {/* =====================================
          Display Options
      ===================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h3 className="text-lg font-semibold">Display Options</h3>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-2">
          {/* Numbers */}

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h4 className="font-semibold">Show Numbers</h4>

              <p className="text-sm text-gray-500">
                Display numbering before each accordion.
              </p>
            </div>

            <input
              type="checkbox"
              checked={block.showNumbers ?? true}
              onChange={(e) =>
                onChange({
                  showNumbers: e.target.checked,
                })
              }
              className="h-5 w-5"
            />
          </div>

          {/* Multiple Open */}

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h4 className="font-semibold">Allow Multiple Open</h4>

              <p className="text-sm text-gray-500">
                Allow visitors to open more than one item.
              </p>
            </div>

            <input
              type="checkbox"
              checked={block.allowMultiple ?? false}
              onChange={(e) =>
                onChange({
                  allowMultiple: e.target.checked,
                })
              }
              className="h-5 w-5"
            />
          </div>

          {/* Open First */}

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h4 className="font-semibold">Open First Item</h4>

              <p className="text-sm text-gray-500">
                Automatically expand the first accordion.
              </p>
            </div>

            <input
              type="checkbox"
              checked={block.openFirst ?? true}
              onChange={(e) =>
                onChange({
                  openFirst: e.target.checked,
                })
              }
              className="h-5 w-5"
            />
          </div>

          {/* Shadow */}

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h4 className="font-semibold">Shadow</h4>

              <p className="text-sm text-gray-500">
                Add shadow to accordion cards.
              </p>
            </div>

            <input
              type="checkbox"
              checked={block.shadow ?? true}
              onChange={(e) =>
                onChange({
                  shadow: e.target.checked,
                })
              }
              className="h-5 w-5"
            />
          </div>

          {/* Border */}

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h4 className="font-semibold">Show Border</h4>

              <p className="text-sm text-gray-500">
                Display borders around accordion items.
              </p>
            </div>

            <input
              type="checkbox"
              checked={block.showBorder ?? true}
              onChange={(e) =>
                onChange({
                  showBorder: e.target.checked,
                })
              }
              className="h-5 w-5"
            />
          </div>

          {/* Rounded */}

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h4 className="font-semibold">Rounded Corners</h4>

              <p className="text-sm text-gray-500">
                Apply rounded corners to accordion cards.
              </p>
            </div>

            <input
              type="checkbox"
              checked={block.rounded ?? true}
              onChange={(e) =>
                onChange({
                  rounded: e.target.checked,
                })
              }
              className="h-5 w-5"
            />
          </div>
        </div>
      </div>

      {/* =====================================
          Appearance
      ===================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h3 className="text-lg font-semibold">Appearance</h3>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          {/* Radius */}

          <div>
            <label className="mb-2 block font-medium">Border Radius</label>

            <input
              type="range"
              min="0"
              max="30"
              value={block.radius || 16}
              onChange={(e) =>
                onChange({
                  radius: Number(e.target.value),
                })
              }
              className="w-full"
            />

            <p className="mt-2 text-sm text-gray-500">{block.radius || 16}px</p>
          </div>

          {/* Padding */}

          <div>
            <label className="mb-2 block font-medium">Content Padding</label>

            <input
              type="range"
              min="12"
              max="40"
              value={block.padding || 20}
              onChange={(e) =>
                onChange({
                  padding: Number(e.target.value),
                })
              }
              className="w-full"
            />

            <p className="mt-2 text-sm text-gray-500">
              {block.padding || 20}px
            </p>
          </div>
        </div>
      </div>
      {/* =====================================
          Live Preview
      ===================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b bg-gray-50 px-6 py-4">
          <h3 className="text-lg font-semibold">Live Preview</h3>

          <p className="text-sm text-gray-500">
            Preview how your accordion section will appear on the website.
          </p>
        </div>

        <div
          className="mx-auto p-8"
          style={{
            maxWidth: block.width || "100%",
          }}
        >
          {block.title && (
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold">{block.title}</h2>

              {block.description && (
                <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">
                  {block.description}
                </p>
              )}
            </div>
          )}

          {items.length === 0 ? (
            <div className="flex h-72 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50">
              <PanelsTopLeft size={60} className="mb-4 text-gray-400" />

              <h3 className="text-xl font-semibold">Accordion Preview</h3>

              <p className="mt-2 text-gray-500">
                Add accordion items to preview them here.
              </p>
            </div>
          ) : (
            items.map((item, index) => {
              const isOpen = block.openFirst && index === 0;

              return (
                <div
                  key={index}
                  className={`mb-4 overflow-hidden transition-all
                    ${block.showBorder === false ? "" : "border"}
                    ${block.rounded === false ? "" : "rounded-xl"}
                    ${block.shadow ? "shadow-sm" : ""}
                    ${
                      block.style === "filled"
                        ? "bg-blue-50"
                        : block.style === "minimal"
                          ? "bg-transparent"
                          : "bg-white"
                    }`}
                  style={{
                    borderRadius:
                      block.rounded === false ? 0 : `${block.radius || 16}px`,
                  }}
                >
                  {/* Header */}

                  <div className="flex items-center justify-between px-6 py-5 font-semibold">
                    <div className="flex items-center gap-4">
                      {block.showNumbers !== false && (
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                          {index + 1}
                        </span>
                      )}

                      <span>{item.title || `Accordion Item ${index + 1}`}</span>
                    </div>

                    {/* Icon */}

                    {block.icon === "plus" ? (
                      <Plus size={20} />
                    ) : block.icon === "arrow" ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </div>

                  {/* Content */}

                  {isOpen && (
                    <div
                      className="border-t"
                      style={{
                        padding: `${block.padding || 20}px`,
                      }}
                    >
                      <p className="leading-8 text-gray-600">
                        {item.content || "Accordion content will appear here."}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* =====================================
          Statistics
      ===================================== */}

      <div className="rounded-2xl border bg-gray-50 p-6">
        <h3 className="mb-6 text-lg font-semibold">Accordion Statistics</h3>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Total Items</p>

            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {items.length}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Titles Filled</p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {items.filter((item) => item.title?.trim()).length}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Content Filled</p>

            <h2 className="mt-2 text-3xl font-bold text-purple-600">
              {items.filter((item) => item.content?.trim()).length}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Completion</p>

            <h2 className="mt-2 text-3xl font-bold text-orange-600">
              {items.length === 0
                ? "0%"
                : `${Math.round(
                    (items.filter(
                      (item) => item.title?.trim() && item.content?.trim(),
                    ).length /
                      items.length) *
                      100,
                  )}%`}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionBlock;
