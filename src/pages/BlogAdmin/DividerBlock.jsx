"use client";

import { Minus, Star, Circle, Diamond } from "lucide-react";

const DividerBlock = ({ block = {}, onChange = () => {} }) => {
  const updateField = (field, value) => {
    onChange({
      [field]: value,
    });
  };

  return (
    <div className="space-y-8">
      {/* =====================================
          Header
      ===================================== */}

      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-blue-100 p-4">
          <Minus size={30} className="text-blue-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold">Divider Block</h2>

          <p className="text-gray-500">
            Separate sections with a stylish divider.
          </p>
        </div>
      </div>

      {/* =====================================
          Divider Text
      ===================================== */}

      <div>
        <label className="mb-2 block font-medium">
          Divider Text (Optional)
        </label>

        <input
          type="text"
          value={block.text || ""}
          onChange={(e) => updateField("text", e.target.value)}
          className="w-full rounded-xl border p-3"
          placeholder="Continue Reading"
        />
      </div>

      {/* =====================================
          Divider Style
      ===================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h3 className="font-semibold">Divider Settings</h3>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          {/* Style */}

          <div>
            <label className="mb-2 block font-medium">Line Style</label>

            <select
              value={block.style || "solid"}
              onChange={(e) => updateField("style", e.target.value)}
              className="w-full rounded-xl border p-3"
            >
              <option value="solid">Solid</option>

              <option value="dashed">Dashed</option>

              <option value="dotted">Dotted</option>

              <option value="double">Double</option>
            </select>
          </div>

          {/* Width */}

          <div>
            <label className="mb-2 block font-medium">Width</label>

            <select
              value={block.width || "100%"}
              onChange={(e) => updateField("width", e.target.value)}
              className="w-full rounded-xl border p-3"
            >
              <option value="100%">100%</option>

              <option value="80%">80%</option>

              <option value="60%">60%</option>

              <option value="40%">40%</option>
            </select>
          </div>

          {/* Alignment */}

          <div>
            <label className="mb-2 block font-medium">Alignment</label>

            <select
              value={block.align || "center"}
              onChange={(e) => updateField("align", e.target.value)}
              className="w-full rounded-xl border p-3"
            >
              <option value="left">Left</option>

              <option value="center">Center</option>

              <option value="right">Right</option>
            </select>
          </div>

          {/* Icon */}

          <div>
            <label className="mb-2 block font-medium">Center Icon</label>

            <select
              value={block.icon || "none"}
              onChange={(e) => updateField("icon", e.target.value)}
              className="w-full rounded-xl border p-3"
            >
              <option value="none">None</option>

              <option value="star">Star</option>

              <option value="circle">Circle</option>

              <option value="diamond">Diamond</option>
            </select>
          </div>

          {/* Color */}

          <div>
            <label className="mb-2 block font-medium">Line Color</label>

            <input
              type="color"
              value={block.color || "#d1d5db"}
              onChange={(e) => updateField("color", e.target.value)}
              className="h-12 w-full rounded-xl border"
            />
          </div>

          {/* Thickness */}

          <div>
            <label className="mb-2 block font-medium">Thickness</label>

            <input
              type="range"
              min="1"
              max="10"
              value={block.thickness || 2}
              onChange={(e) => updateField("thickness", Number(e.target.value))}
              className="w-full"
            />

            <p className="mt-2 text-sm text-gray-500">
              {block.thickness || 2}px
            </p>
          </div>
        </div>
      </div>

      {/* =====================================
          Spacing
      ===================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h3 className="font-semibold">Spacing</h3>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">Top Margin</label>

            <input
              type="range"
              min="0"
              max="100"
              value={block.marginTop || 40}
              onChange={(e) => updateField("marginTop", Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Bottom Margin</label>

            <input
              type="range"
              min="0"
              max="100"
              value={block.marginBottom || 40}
              onChange={(e) =>
                updateField("marginBottom", Number(e.target.value))
              }
              className="w-full"
            />
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
            Preview how your divider will appear on the website.
          </p>
        </div>

        <div
          className="bg-white px-8"
          style={{
            paddingTop: `${block.marginTop || 40}px`,
            paddingBottom: `${block.marginBottom || 40}px`,
          }}
        >
          <div
            className={`flex items-center ${
              block.align === "left"
                ? "justify-start"
                : block.align === "right"
                  ? "justify-end"
                  : "justify-center"
            }`}
          >
            <div
              className="flex items-center gap-4"
              style={{
                width: block.width || "100%",
              }}
            >
              {/* Left Line */}

              <div
                className="flex-1"
                style={{
                  borderTop: `${block.thickness || 2}px ${block.style || "solid"} ${
                    block.color || "#d1d5db"
                  }`,
                }}
              />

              {/* Center Content */}

              {(block.text || block.icon !== "none") && (
                <div className="flex items-center gap-3 whitespace-nowrap px-2">
                  {/* Icon */}

                  {block.icon === "star" && (
                    <Star size={20} color={block.color || "#d1d5db"} />
                  )}

                  {block.icon === "circle" && (
                    <Circle size={18} color={block.color || "#d1d5db"} />
                  )}

                  {block.icon === "diamond" && (
                    <Diamond size={18} color={block.color || "#d1d5db"} />
                  )}

                  {block.text && (
                    <span className="font-medium text-gray-600">
                      {block.text}
                    </span>
                  )}
                </div>
              )}

              {/* Right Line */}

              <div
                className="flex-1"
                style={{
                  borderTop: `${block.thickness || 2}px ${block.style || "solid"} ${
                    block.color || "#d1d5db"
                  }`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================
          Statistics
      ===================================== */}

      <div className="rounded-2xl border bg-gray-50 p-6">
        <h3 className="mb-6 text-lg font-semibold">Divider Statistics</h3>

        <div className="grid gap-6 md:grid-cols-4">
          {/* Style */}

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Style</p>

            <h2 className="mt-2 text-xl font-bold capitalize text-blue-600">
              {block.style || "Solid"}
            </h2>
          </div>

          {/* Width */}

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Width</p>

            <h2 className="mt-2 text-xl font-bold text-green-600">
              {block.width || "100%"}
            </h2>
          </div>

          {/* Thickness */}

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Thickness</p>

            <h2 className="mt-2 text-xl font-bold text-purple-600">
              {block.thickness || 2}px
            </h2>
          </div>

          {/* Label */}

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Divider Label</p>

            <h2 className="mt-2 truncate text-lg font-bold text-orange-600">
              {block.text || "No Label"}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DividerBlock;
