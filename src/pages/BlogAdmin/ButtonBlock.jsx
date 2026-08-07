"use client";

import { MousePointerClick, ArrowRight, ExternalLink } from "lucide-react";

const ButtonBlock = ({  block = {},
  onChange = () => {}, }) => {
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
          <MousePointerClick size={30} className="text-blue-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold">Button Block</h2>

          <p className="text-gray-500">
            Create call-to-action buttons for your readers.
          </p>
        </div>
      </div>

      {/* =====================================
          Button Text
      ===================================== */}

      <div>
        <label className="mb-2 block font-medium">Button Text</label>

        <input
          type="text"
          value={block.text || ""}
          onChange={(e) => updateField("text", e.target.value)}
          className="w-full rounded-xl border p-3"
          placeholder="Book Your Safari"
        />
      </div>

      {/* =====================================
          URL
      ===================================== */}

      <div>
        <label className="mb-2 block font-medium">Button URL</label>

        <input
          type="text"
          value={block.url || ""}
          onChange={(e) => updateField("url", e.target.value)}
          className="w-full rounded-xl border p-3"
          placeholder="/contact"
        />
      </div>

      {/* =====================================
          Description
      ===================================== */}

      <div>
        <label className="mb-2 block font-medium">Description (Optional)</label>

        <textarea
          rows={4}
          value={block.description || ""}
          onChange={(e) => updateField("description", e.target.value)}
          className="w-full rounded-xl border p-3"
          placeholder="Explain why users should click this button..."
        />
      </div>

      {/* =====================================
          Quick Options
      ===================================== */}

      <div className="grid gap-6 md:grid-cols-2">
        {/* New Tab */}

        <div className="flex items-center justify-between rounded-xl border p-4">
          <div>
            <h4 className="font-semibold">Open in New Tab</h4>

            <p className="text-sm text-gray-500">
              Opens the link in a new browser tab.
            </p>
          </div>

          <input
            type="checkbox"
            checked={block.newTab ?? false}
            onChange={(e) => updateField("newTab", e.target.checked)}
            className="h-5 w-5"
          />
        </div>

        {/* Full Width */}

        <div className="flex items-center justify-between rounded-xl border p-4">
          <div>
            <h4 className="font-semibold">Full Width</h4>

            <p className="text-sm text-gray-500">
              Stretch button to the container width.
            </p>
          </div>

          <input
            type="checkbox"
            checked={block.fullWidth ?? false}
            onChange={(e) => updateField("fullWidth", e.target.checked)}
            className="h-5 w-5"
          />
        </div>
      </div>
      {/* =====================================
          Button Appearance
      ===================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h3 className="text-lg font-semibold">Button Appearance</h3>

          <p className="text-sm text-gray-500">
            Customize the look and feel of your call-to-action button.
          </p>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          {/* Style */}

          <div>
            <label className="mb-2 block font-medium">Button Style</label>

            <select
              value={block.style || "solid"}
              onChange={(e) => updateField("style", e.target.value)}
              className="w-full rounded-xl border p-3"
            >
              <option value="solid">Solid</option>

              <option value="outline">Outline</option>

              <option value="ghost">Ghost</option>

              <option value="gradient">Gradient</option>
            </select>
          </div>

          {/* Size */}

          <div>
            <label className="mb-2 block font-medium">Button Size</label>

            <select
              value={block.size || "medium"}
              onChange={(e) => updateField("size", e.target.value)}
              className="w-full rounded-xl border p-3"
            >
              <option value="small">Small</option>

              <option value="medium">Medium</option>

              <option value="large">Large</option>
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

          {/* Icon */}

          <div>
            <label className="mb-2 block font-medium">Button Icon</label>

            <select
              value={block.icon || "arrow"}
              onChange={(e) => updateField("icon", e.target.value)}
              className="w-full rounded-xl border p-3"
            >
              <option value="none">None</option>

              <option value="arrow">Arrow Right</option>

              <option value="external">External Link</option>
            </select>
          </div>
        </div>
      </div>

      {/* =====================================
          Colors
      ===================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h3 className="text-lg font-semibold">Colors</h3>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          {/* Background */}

          <div>
            <label className="mb-2 block font-medium">Background Color</label>

            <input
              type="color"
              value={block.background || "#2563eb"}
              onChange={(e) => updateField("background", e.target.value)}
              className="h-12 w-full rounded-xl border"
            />
          </div>

          {/* Text */}

          <div>
            <label className="mb-2 block font-medium">Text Color</label>

            <input
              type="color"
              value={block.color || "#ffffff"}
              onChange={(e) => updateField("color", e.target.value)}
              className="h-12 w-full rounded-xl border"
            />
          </div>

          {/* Hover */}

          <div>
            <label className="mb-2 block font-medium">Hover Background</label>

            <input
              type="color"
              value={block.hoverBackground || "#1d4ed8"}
              onChange={(e) => updateField("hoverBackground", e.target.value)}
              className="h-12 w-full rounded-xl border"
            />
          </div>

          {/* Hover Text */}

          <div>
            <label className="mb-2 block font-medium">Hover Text Color</label>

            <input
              type="color"
              value={block.hoverColor || "#ffffff"}
              onChange={(e) => updateField("hoverColor", e.target.value)}
              className="h-12 w-full rounded-xl border"
            />
          </div>
        </div>
      </div>

      {/* =====================================
          Advanced
      ===================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h3 className="text-lg font-semibold">Advanced Settings</h3>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          {/* Radius */}

          <div>
            <label className="mb-2 block font-medium">Border Radius</label>

            <input
              type="range"
              min="0"
              max="40"
              value={block.radius || 12}
              onChange={(e) => updateField("radius", Number(e.target.value))}
              className="w-full"
            />

            <p className="mt-2 text-sm text-gray-500">{block.radius || 12}px</p>
          </div>

          {/* Padding */}

          <div>
            <label className="mb-2 block font-medium">Padding</label>

            <input
              type="range"
              min="8"
              max="28"
              value={block.padding || 16}
              onChange={(e) => updateField("padding", Number(e.target.value))}
              className="w-full"
            />

            <p className="mt-2 text-sm text-gray-500">
              {block.padding || 16}px
            </p>
          </div>

          {/* Shadow */}

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h4 className="font-semibold">Shadow</h4>

              <p className="text-sm text-gray-500">
                Add shadow around the button.
              </p>
            </div>

            <input
              type="checkbox"
              checked={block.shadow ?? true}
              onChange={(e) => updateField("shadow", e.target.checked)}
              className="h-5 w-5"
            />
          </div>

          {/* Icon Position */}

          <div>
            <label className="mb-2 block font-medium">Icon Position</label>

            <select
              value={block.iconPosition || "right"}
              onChange={(e) => updateField("iconPosition", e.target.value)}
              className="w-full rounded-xl border p-3"
            >
              <option value="left">Left</option>

              <option value="right">Right</option>
            </select>
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
            Preview how your button will appear on the website.
          </p>
        </div>

        <div className="p-10">
          <div
            className={`flex ${
              block.align === "center"
                ? "justify-center"
                : block.align === "right"
                  ? "justify-end"
                  : "justify-start"
            }`}
          >
            <a
              href={block.url || "#"}
              target={block.newTab ? "_blank" : "_self"}
              rel={block.newTab ? "noopener noreferrer" : undefined}
              className={`inline-flex items-center gap-3 font-semibold transition-all duration-300
                ${block.fullWidth ? "w-full justify-center" : ""}
                ${
                  block.size === "small"
                    ? "px-4 py-2 text-sm"
                    : block.size === "large"
                      ? "px-8 py-5 text-lg"
                      : "px-6 py-3"
                }
                ${block.shadow !== false ? "shadow-lg" : ""}
              `}
              style={{
                borderRadius: `${block.radius || 12}px`,
                padding: `${block.padding || 16}px`,
                background:
                  block.style === "gradient"
                    ? `linear-gradient(135deg, ${
                        block.background || "#2563eb"
                      }, ${block.hoverBackground || "#1d4ed8"})`
                    : block.style === "solid"
                      ? block.background || "#2563eb"
                      : "transparent",

                color:
                  block.style === "outline"
                    ? block.background || "#2563eb"
                    : block.color || "#ffffff",

                border:
                  block.style === "outline"
                    ? `2px solid ${block.background || "#2563eb"}`
                    : block.style === "ghost"
                      ? "none"
                      : "none",
              }}
            >
              {/* Left Icon */}

              {block.iconPosition === "left" &&
                block.icon !== "none" &&
                (block.icon === "external" ? (
                  <ExternalLink size={18} />
                ) : (
                  <ArrowRight size={18} />
                ))}

              <span>{block.text || "Click Here"}</span>

              {/* Right Icon */}

              {block.iconPosition !== "left" &&
                block.icon !== "none" &&
                (block.icon === "external" ? (
                  <ExternalLink size={18} />
                ) : (
                  <ArrowRight size={18} />
                ))}
            </a>
          </div>

          {block.description && (
            <p className="mt-6 text-center text-gray-500">
              {block.description}
            </p>
          )}
        </div>
      </div>

      {/* =====================================
          Statistics
      ===================================== */}

      <div className="rounded-2xl border bg-gray-50 p-6">
        <h3 className="mb-6 text-lg font-semibold">Button Statistics</h3>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Text Length</p>

            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {(block.text || "").length}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Button Style</p>

            <h2 className="mt-2 text-xl font-bold capitalize text-green-600">
              {block.style || "Solid"}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Button Size</p>

            <h2 className="mt-2 text-xl font-bold capitalize text-purple-600">
              {block.size || "Medium"}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Destination</p>

            <h2 className="mt-2 truncate text-sm font-bold text-orange-600">
              {block.url || "No URL"}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonBlock;
