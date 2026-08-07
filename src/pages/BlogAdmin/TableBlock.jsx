"use client";

import { useMemo } from "react";

import { Table, Plus, Trash2 } from "lucide-react";

const DEFAULT_HEADERS = ["Column 1", "Column 2", "Column 3"];

const DEFAULT_ROWS = [
  ["", "", ""],
  ["", "", ""],
];

const TableBlock = ({ block, onChange }) => {
  const headers = useMemo(
    () => block.headers || DEFAULT_HEADERS,
    [block.headers],
  );

  const rows = useMemo(() => block.rows || DEFAULT_ROWS, [block.rows]);

  /* =====================================
      Update Header
  ===================================== */

  const updateHeader = (index, value) => {
    const updated = [...headers];

    updated[index] = value;

    onChange({
      headers: updated,
    });
  };

  /* =====================================
      Update Cell
  ===================================== */

  const updateCell = (rowIndex, columnIndex, value) => {
    const updated = rows.map((row) => [...row]);

    updated[rowIndex][columnIndex] = value;

    onChange({
      rows: updated,
    });
  };

  /* =====================================
      Add Row
  ===================================== */

  const addRow = () => {
    const updated = [...rows, new Array(headers.length).fill("")];

    onChange({
      rows: updated,
    });
  };

  /* =====================================
      Remove Row
  ===================================== */

  const removeRow = (index) => {
    const updated = [...rows];

    updated.splice(index, 1);

    onChange({
      rows: updated,
    });
  };

  /* =====================================
      Add Column
  ===================================== */

  const addColumn = () => {
    const updatedHeaders = [...headers, `Column ${headers.length + 1}`];

    const updatedRows = rows.map((row) => [...row, ""]);

    onChange({
      headers: updatedHeaders,
      rows: updatedRows,
    });
  };

  /* =====================================
      Remove Column
  ===================================== */

  const removeColumn = (index) => {
    if (headers.length <= 1) return;

    const updatedHeaders = [...headers];

    updatedHeaders.splice(index, 1);

    const updatedRows = rows.map((row) => {
      const copy = [...row];
      copy.splice(index, 1);
      return copy;
    });

    onChange({
      headers: updatedHeaders,
      rows: updatedRows,
    });
  };

  return (
    <div className="space-y-8">
      {/* =====================================
          Header
      ===================================== */}

      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-blue-100 p-4">
          <Table size={30} className="text-blue-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold">Table Block</h2>

          <p className="text-gray-500">
            Create comparison tables, pricing tables, itineraries and structured
            content.
          </p>
        </div>
      </div>

      {/* =====================================
          Title
      ===================================== */}

      <div>
        <label className="mb-2 block font-medium">Table Title</label>

        <input
          type="text"
          value={block.title || ""}
          onChange={(e) =>
            onChange({
              title: e.target.value,
            })
          }
          className="w-full rounded-xl border p-3"
          placeholder="Safari Pricing Comparison"
        />
      </div>

      {/* =====================================
          Description
      ===================================== */}

      <div>
        <label className="mb-2 block font-medium">Description</label>

        <textarea
          rows={4}
          value={block.description || ""}
          onChange={(e) =>
            onChange({
              description: e.target.value,
            })
          }
          className="w-full rounded-xl border p-3"
          placeholder="Describe what this table represents..."
        />
      </div>

      {/* =====================================
          Toolbar
      ===================================== */}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={addRow}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Row
        </button>

        <button
          type="button"
          onClick={addColumn}
          className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-white transition hover:bg-green-700"
        >
          <Plus size={18} />
          Add Column
        </button>
      </div>
      {/* =====================================
          Table Editor
      ===================================== */}

      <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
        <table className="min-w-full border-collapse">
          {/* =====================================
              Header
          ===================================== */}

          <thead className="bg-gray-100">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="border p-3 align-top">
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={header}
                      onChange={(e) => updateHeader(index, e.target.value)}
                      className="w-full rounded-lg border p-2 font-semibold"
                      placeholder={`Column ${index + 1}`}
                    />

                    <button
                      type="button"
                      onClick={() => removeColumn(index)}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 py-2 text-sm text-red-600 transition hover:bg-red-100"
                    >
                      <Trash2 size={16} />
                      Remove Column
                    </button>
                  </div>
                </th>
              ))}

              <th className="w-24 border bg-gray-50">Actions</th>
            </tr>
          </thead>

          {/* =====================================
              Body
          ===================================== */}

          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {row.map((cell, columnIndex) => (
                  <td key={columnIndex} className="border p-3">
                    <textarea
                      rows={2}
                      value={cell}
                      onChange={(e) =>
                        updateCell(rowIndex, columnIndex, e.target.value)
                      }
                      className="w-full resize-none rounded-lg border p-2"
                      placeholder="Enter value..."
                    />
                  </td>
                ))}

                {/* Row Actions */}

                <td className="border p-3">
                  <button
                    type="button"
                    onClick={() => removeRow(rowIndex)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 py-2 text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* =====================================
          Quick Statistics
      ===================================== */}

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Columns</p>

          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            {headers.length}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Rows</p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {rows.length}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Cells</p>

          <h2 className="mt-2 text-3xl font-bold text-purple-600">
            {rows.length * headers.length}
          </h2>
        </div>
      </div>
      {/* =====================================
          Table Settings
      ===================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h3 className="text-lg font-semibold">Table Settings</h3>

          <p className="text-sm text-gray-500">
            Customize the appearance and behavior of your table.
          </p>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-2">
          {/* Header Background */}

          <div>
            <label className="mb-2 block font-medium">Header Background</label>

            <input
              type="color"
              value={block.headerColor || "#2563eb"}
              onChange={(e) =>
                onChange({
                  headerColor: e.target.value,
                })
              }
              className="h-12 w-full rounded-xl border"
            />
          </div>

          {/* Header Text */}

          <div>
            <label className="mb-2 block font-medium">Header Text Color</label>

            <input
              type="color"
              value={block.headerTextColor || "#ffffff"}
              onChange={(e) =>
                onChange({
                  headerTextColor: e.target.value,
                })
              }
              className="h-12 w-full rounded-xl border"
            />
          </div>

          {/* Border Color */}

          <div>
            <label className="mb-2 block font-medium">Border Color</label>

            <input
              type="color"
              value={block.borderColor || "#e5e7eb"}
              onChange={(e) =>
                onChange({
                  borderColor: e.target.value,
                })
              }
              className="h-12 w-full rounded-xl border"
            />
          </div>

          {/* Width */}

          <div>
            <label className="mb-2 block font-medium">Table Width</label>

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
          {/* Show Border */}

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h4 className="font-semibold">Show Borders</h4>

              <p className="text-sm text-gray-500">
                Display borders around cells.
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

          {/* Striped */}

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h4 className="font-semibold">Zebra Stripes</h4>

              <p className="text-sm text-gray-500">Alternate row colors.</p>
            </div>

            <input
              type="checkbox"
              checked={block.striped ?? true}
              onChange={(e) =>
                onChange({
                  striped: e.target.checked,
                })
              }
              className="h-5 w-5"
            />
          </div>

          {/* Hover */}

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h4 className="font-semibold">Hover Highlight</h4>

              <p className="text-sm text-gray-500">Highlight rows on hover.</p>
            </div>

            <input
              type="checkbox"
              checked={block.hover ?? true}
              onChange={(e) =>
                onChange({
                  hover: e.target.checked,
                })
              }
              className="h-5 w-5"
            />
          </div>

          {/* Sticky Header */}

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h4 className="font-semibold">Sticky Header</h4>

              <p className="text-sm text-gray-500">
                Keep table header visible while scrolling.
              </p>
            </div>

            <input
              type="checkbox"
              checked={block.stickyHeader ?? false}
              onChange={(e) =>
                onChange({
                  stickyHeader: e.target.checked,
                })
              }
              className="h-5 w-5"
            />
          </div>
        </div>
      </div>

      {/* =====================================
          Layout Settings
      ===================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h3 className="text-lg font-semibold">Layout</h3>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          {/* Cell Padding */}

          <div>
            <label className="mb-2 block font-medium">Cell Padding</label>

            <input
              type="range"
              min="8"
              max="30"
              value={block.cellPadding || 16}
              onChange={(e) =>
                onChange({
                  cellPadding: Number(e.target.value),
                })
              }
              className="w-full"
            />

            <p className="mt-2 text-sm text-gray-500">
              {block.cellPadding || 16}px
            </p>
          </div>

          {/* Border Radius */}

          <div>
            <label className="mb-2 block font-medium">Table Radius</label>

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
        </div>
      </div>
      {/* =====================================
          Live Preview
      ===================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b bg-gray-50 px-6 py-4">
          <h3 className="text-lg font-semibold">Live Preview</h3>

          <p className="text-sm text-gray-500">
            Preview how your table will appear on the website.
          </p>
        </div>

        <div className="overflow-x-auto p-8">
          {block.title && (
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold">{block.title}</h2>

              {block.description && (
                <p className="mt-3 text-gray-600">{block.description}</p>
              )}
            </div>
          )}

          <div
            className="overflow-hidden border"
            style={{
              width: block.width || "100%",
              borderRadius: `${block.radius || 16}px`,
              borderColor: block.borderColor || "#e5e7eb",
            }}
          >
            <table className="min-w-full border-collapse">
              {/* Header */}

              <thead
                style={{
                  backgroundColor: block.headerColor || "#2563eb",
                  color: block.headerTextColor || "#ffffff",
                }}
                className={block.stickyHeader ? "sticky top-0" : ""}
              >
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      className="font-semibold"
                      style={{
                        padding: `${block.cellPadding || 16}px`,
                        border:
                          block.showBorder === false
                            ? "none"
                            : `1px solid ${block.borderColor || "#e5e7eb"}`,
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body */}

              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={
                      block.hover !== false
                        ? "transition hover:bg-gray-100"
                        : ""
                    }
                    style={{
                      background:
                        block.striped && rowIndex % 2 === 1
                          ? "#f9fafb"
                          : "#ffffff",
                    }}
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        style={{
                          padding: `${block.cellPadding || 16}px`,
                          border:
                            block.showBorder === false
                              ? "none"
                              : `1px solid ${block.borderColor || "#e5e7eb"}`,
                        }}
                      >
                        {cell || "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* =====================================
          Statistics
      ===================================== */}

      <div className="rounded-2xl border bg-gray-50 p-6">
        <h3 className="mb-6 text-lg font-semibold">Table Statistics</h3>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Columns</p>

            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {headers.length}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Rows</p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {rows.length}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Total Cells</p>

            <h2 className="mt-2 text-3xl font-bold text-purple-600">
              {rows.length * headers.length}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Filled Cells</p>

            <h2 className="mt-2 text-3xl font-bold text-orange-600">
              {
                rows
                  .flat()
                  .filter((cell) => cell && cell.toString().trim() !== "")
                  .length
              }
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableBlock;
