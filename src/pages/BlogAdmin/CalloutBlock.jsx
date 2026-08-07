"use client";

import {
  Info,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Star,
} from "lucide-react";

const CalloutBlock = ({ block, onChange }) => {
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
          <Info size={30} className="text-blue-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold">Callout Block</h2>

          <p className="text-gray-500">
            Highlight important information for readers.
          </p>
        </div>
      </div>

      {/* =====================================
          Callout Title
      ===================================== */}

      <div>
        <label className="mb-2 block font-medium">Title</label>

        <input
          type="text"
          value={block.title || ""}
          onChange={(e) => updateField("title", e.target.value)}
          className="w-full rounded-xl border p-3"
          placeholder="Important Information"
        />
      </div>

      {/* =====================================
          Description
      ===================================== */}

      <div>
        <label className="mb-2 block font-medium">Description</label>

        <textarea
          rows={6}
          value={block.description || ""}
          onChange={(e) => updateField("description", e.target.value)}
          className="w-full rounded-xl border p-4"
          placeholder="Write your important message..."
        />
      </div>

      {/* =====================================
          Short Label
      ===================================== */}

      <div>
        <label className="mb-2 block font-medium">Badge Label</label>

        <input
          type="text"
          value={block.badge || ""}
          onChange={(e) => updateField("badge", e.target.value)}
          className="w-full rounded-xl border p-3"
          placeholder="TIP"
        />
      </div>

      {/* =====================================
          Callout Settings
      ===================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h3 className="text-lg font-semibold">Callout Settings</h3>

          <p className="text-sm text-gray-500">
            Choose the appearance and behavior of your callout.
          </p>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          {/* Type */}

          <div>
            <label className="mb-2 block font-medium">Callout Type</label>

            <select
              value={block.type || "info"}
              onChange={(e) => updateField("type", e.target.value)}
              className="w-full rounded-xl border p-3"
            >
              <option value="info">Information</option>

              <option value="tip">Tip</option>

              <option value="success">Success</option>

              <option value="warning">Warning</option>

              <option value="danger">Danger</option>

              <option value="note">Note</option>
            </select>
          </div>

          {/* Style */}

          <div>
            <label className="mb-2 block font-medium">Style</label>

            <select
              value={block.style || "filled"}
              onChange={(e) => updateField("style", e.target.value)}
              className="w-full rounded-xl border p-3"
            >
              <option value="filled">Filled</option>

              <option value="outlined">Outlined</option>

              <option value="minimal">Minimal</option>
            </select>
          </div>

          {/* Alignment */}

          <div>
            <label className="mb-2 block font-medium">Alignment</label>

            <select
              value={block.align || "left"}
              onChange={(e) => updateField("align", e.target.value)}
              className="w-full rounded-xl border p-3"
            >
              <option value="left">Left</option>

              <option value="center">Center</option>

              <option value="right">Right</option>
            </select>
          </div>

          {/* Icon Position */}

          <div>
            <label className="mb-2 block font-medium">Icon Position</label>

            <select
              value={block.iconPosition || "left"}
              onChange={(e) => updateField("iconPosition", e.target.value)}
              className="w-full rounded-xl border p-3"
            >
              <option value="left">Left</option>

              <option value="top">Top</option>

              <option value="right">Right</option>
            </select>
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
          {/* Show Icon */}

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h4 className="font-semibold">Show Icon</h4>

              <p className="text-sm text-gray-500">Display the callout icon.</p>
            </div>

            <input
              type="checkbox"
              checked={block.showIcon ?? true}
              onChange={(e) => updateField("showIcon", e.target.checked)}
              className="h-5 w-5"
            />
          </div>

          {/* Show Badge */}

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h4 className="font-semibold">Show Badge</h4>

              <p className="text-sm text-gray-500">Display the badge label.</p>
            </div>

            <input
              type="checkbox"
              checked={block.showBadge ?? true}
              onChange={(e) => updateField("showBadge", e.target.checked)}
              className="h-5 w-5"
            />
          </div>

          {/* Shadow */}

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h4 className="font-semibold">Shadow</h4>

              <p className="text-sm text-gray-500">Add a shadow effect.</p>
            </div>

            <input
              type="checkbox"
              checked={block.shadow ?? true}
              onChange={(e) => updateField("shadow", e.target.checked)}
              className="h-5 w-5"
            />
          </div>

          {/* Border */}

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h4 className="font-semibold">Show Border</h4>

              <p className="text-sm text-gray-500">
                Display border around the callout.
              </p>
            </div>

            <input
              type="checkbox"
              checked={block.border ?? true}
              onChange={(e) => updateField("border", e.target.checked)}
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
          {/* Border Radius */}

          <div>
            <label className="mb-2 block font-medium">Border Radius</label>

            <input
              type="range"
              min="0"
              max="40"
              value={block.radius || 18}
              onChange={(e) => updateField("radius", Number(e.target.value))}
              className="w-full"
            />

            <p className="mt-2 text-sm text-gray-500">{block.radius || 18}px</p>
          </div>

          {/* Padding */}

          <div>
            <label className="mb-2 block font-medium">Padding</label>

            <input
              type="range"
              min="10"
              max="60"
              value={block.padding || 24}
              onChange={(e) => updateField("padding", Number(e.target.value))}
              className="w-full"
            />

            <p className="mt-2 text-sm text-gray-500">
              {block.padding || 24}px
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
            Preview how your callout will appear on the website.
          </p>
        </div>

        {(() => {
          const styles = {
            info: {
              bg: "bg-blue-50",
              border: "border-blue-200",
              text: "text-blue-700",
              icon: <Info size={34} className="text-blue-600" />,
            },

            success: {
              bg: "bg-green-50",
              border: "border-green-200",
              text: "text-green-700",
              icon: <CheckCircle2 size={34} className="text-green-600" />,
            },

            warning: {
              bg: "bg-yellow-50",
              border: "border-yellow-200",
              text: "text-yellow-700",
              icon: <AlertTriangle size={34} className="text-yellow-600" />,
            },

            danger: {
              bg: "bg-red-50",
              border: "border-red-200",
              text: "text-red-700",
              icon: <XCircle size={34} className="text-red-600" />,
            },

            tip: {
              bg: "bg-purple-50",
              border: "border-purple-200",
              text: "text-purple-700",
              icon: <Lightbulb size={34} className="text-purple-600" />,
            },

            note: {
              bg: "bg-gray-100",
              border: "border-gray-300",
              text: "text-gray-700",
              icon: <Star size={34} className="text-gray-600" />,
            },
          };

          const current = styles[block.type || "info"];

          return (
            <div className="p-8">
              <div
                className={`
                  ${current.bg}
                  ${block.border === false ? "" : `border ${current.border}`}
                  ${block.shadow ? "shadow-lg" : ""}
                  p-8
                `}
                style={{
                  borderRadius: `${block.radius || 18}px`,
                  padding: `${block.padding || 24}px`,
                  textAlign: block.align || "left",
                }}
              >
                {/* Badge */}

                {block.showBadge !== false && block.badge && (
                  <span className="mb-5 inline-block rounded-full bg-white px-4 py-2 text-xs font-bold uppercase shadow">
                    {block.badge}
                  </span>
                )}

                {/* Top Icon */}

                {block.showIcon !== false && block.iconPosition === "top" && (
                  <div className="mb-5">{current.icon}</div>
                )}

                <div
                  className={`flex gap-5 ${
                    block.iconPosition === "right" ? "flex-row-reverse" : ""
                  }`}
                >
                  {/* Left Icon */}

                  {block.showIcon !== false && block.iconPosition !== "top" && (
                    <div className="shrink-0">{current.icon}</div>
                  )}

                  <div className="flex-1">
                    <h2 className={`mb-3 text-2xl font-bold ${current.text}`}>
                      {block.title || "Callout Title"}
                    </h2>

                    <p className="leading-8 text-gray-700">
                      {block.description ||
                        "Your highlighted message will appear here."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* =====================================
          Statistics
      ===================================== */}

      <div className="rounded-2xl border bg-gray-50 p-6">
        <h3 className="mb-6 text-lg font-semibold">Callout Statistics</h3>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Characters</p>

            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {(block.description || "").length}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Words</p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {
                (block.description || "").trim().split(/\s+/).filter(Boolean)
                  .length
              }
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Type</p>

            <h2 className="mt-2 text-xl font-bold capitalize text-purple-600">
              {block.type || "Info"}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Style</p>

            <h2 className="mt-2 text-xl font-bold capitalize text-orange-600">
              {block.style || "Filled"}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalloutBlock;
