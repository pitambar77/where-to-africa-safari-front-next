"use client";

import { useState } from "react";

import { Plus, Trash2, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

const FAQBlock = ({ block = {}, onChange = () => {} }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = block.items || [];

  /* =====================================
      Add FAQ
  ===================================== */

  const addFAQ = () => {
    onChange({
      items: [
        ...faqs,
        {
          question: "",
          answer: "",
        },
      ],
    });

    setActiveIndex(faqs.length);
  };

  /* =====================================
      Remove FAQ
  ===================================== */

  const removeFAQ = (index) => {
    const updated = [...faqs];

    updated.splice(index, 1);

    onChange({
      items: updated,
    });

    if (activeIndex >= updated.length) {
      setActiveIndex(updated.length - 1);
    }
  };

  /* =====================================
      Update FAQ
  ===================================== */

  const updateFAQ = (index, field, value) => {
    const updated = [...faqs];

    updated[index][field] = value;

    onChange({
      items: updated,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-blue-100 p-4">
          <HelpCircle size={30} className="text-blue-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold">FAQ Block</h2>

          <p className="text-gray-500">
            Build an SEO-friendly Frequently Asked Questions section.
          </p>
        </div>
      </div>

      {/* Section Title */}

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
          placeholder="Frequently Asked Questions"
        />
      </div>

      {/* Section Description */}

      <div>
        <label className="mb-2 block font-medium">Section Description</label>

        <textarea
          rows={3}
          value={block.description || ""}
          onChange={(e) =>
            onChange({
              description: e.target.value,
            })
          }
          className="w-full rounded-xl border p-3"
          placeholder="Answer the most common questions..."
        />
      </div>

      {/* Add FAQ */}

      <button
        type="button"
        onClick={addFAQ}
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        <Plus size={18} />
        Add FAQ
      </button>

      {/* =====================================
          FAQ Items
      ===================================== */}

      <div className="space-y-5">
        {faqs.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 py-16 text-center">
            <HelpCircle size={60} className="mx-auto mb-4 text-gray-400" />

            <h3 className="text-xl font-semibold">No FAQs Added</h3>

            <p className="mt-2 text-gray-500">
              Click "Add FAQ" to create your first question.
            </p>
          </div>
        )}

        {faqs.map((faq, index) => {
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
                className="flex cursor-pointer items-center justify-between bg-gray-50 px-6 py-5"
                onClick={() => setActiveIndex(expanded ? -1 : index)}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                    {index + 1}
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {faq.question || `FAQ ${index + 1}`}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {faq.answer
                        ? `${faq.answer.substring(0, 60)}${
                            faq.answer.length > 60 ? "..." : ""
                          }`
                        : "No answer added"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFAQ(index);
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
                  {/* Question */}

                  <div>
                    <label className="mb-2 block font-medium">Question</label>

                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) =>
                        updateFAQ(index, "question", e.target.value)
                      }
                      className="w-full rounded-xl border p-3"
                      placeholder="Enter the question"
                    />
                  </div>

                  {/* Answer */}

                  <div>
                    <label className="mb-2 block font-medium">Answer</label>

                    <textarea
                      rows={6}
                      value={faq.answer}
                      onChange={(e) =>
                        updateFAQ(index, "answer", e.target.value)
                      }
                      className="w-full rounded-xl border p-3"
                      placeholder="Write the answer..."
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* =====================================
          FAQ Settings
      ===================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h3 className="text-lg font-semibold">FAQ Settings</h3>

          <p className="text-sm text-gray-500">
            Customize how the FAQ accordion behaves on the frontend.
          </p>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-2">
          {/* Numbering */}

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h4 className="font-semibold">Show Numbers</h4>

              <p className="text-sm text-gray-500">
                Display question numbering.
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
                Visitors can expand multiple questions.
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

          {/* First Open */}

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h4 className="font-semibold">Open First FAQ</h4>

              <p className="text-sm text-gray-500">
                Expand the first question initially.
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

          {/* Border */}

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h4 className="font-semibold">Show Borders</h4>

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

          {/* Icon */}

          <div>
            <label className="mb-2 block font-medium">Expand Icon</label>

            <select
              value={block.icon || "plus"}
              onChange={(e) =>
                onChange({
                  icon: e.target.value,
                })
              }
              className="w-full rounded-xl border p-3"
            >
              <option value="plus">Plus</option>

              <option value="chevron">Chevron</option>

              <option value="arrow">Arrow</option>
            </select>
          </div>

          {/* Animation */}

          <div>
            <label className="mb-2 block font-medium">
              Animation Speed (ms)
            </label>

            <input
              type="number"
              min={100}
              step={100}
              value={block.animation || 300}
              onChange={(e) =>
                onChange({
                  animation: Number(e.target.value),
                })
              }
              className="w-full rounded-xl border p-3"
            />
          </div>

          {/* Max Width */}

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
        </div>
      </div>
      {/* =====================================
          Live Website Preview
      ===================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b bg-gray-50 px-6 py-4">
          <h3 className="text-lg font-semibold">Live Preview</h3>

          <p className="text-sm text-gray-500">
            Preview how your FAQ section will appear on the website.
          </p>
        </div>

        <div
          className="mx-auto space-y-4 p-8"
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

          {faqs.length === 0 ? (
            <div className="flex h-72 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50">
              <HelpCircle size={60} className="mb-4 text-gray-400" />

              <h3 className="text-xl font-semibold">FAQ Preview</h3>

              <p className="mt-2 text-gray-500">
                Add FAQs to preview the accordion.
              </p>
            </div>
          ) : (
            faqs.map((faq, index) => (
              <div
                key={index}
                className={`overflow-hidden rounded-xl ${
                  block.showBorder === false ? "" : "border"
                } ${block.style === "filled" ? "bg-blue-50" : "bg-white"}`}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    {block.showNumbers !== false && (
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                        {index + 1}
                      </span>
                    )}

                    <span className="text-lg font-semibold">
                      {faq.question || "Question"}
                    </span>
                  </div>

                  {block.icon === "plus" ? (
                    <Plus size={20} />
                  ) : block.icon === "arrow" ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>

                <div className="border-t px-6 py-5">
                  <p className="leading-8 text-gray-600">
                    {faq.answer || "Answer goes here..."}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* =====================================
          Statistics
      ===================================== */}

      <div className="rounded-2xl border bg-gray-50 p-6">
        <h3 className="mb-6 text-lg font-semibold">FAQ Statistics</h3>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total FAQs</p>

            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {faqs.length}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Questions Filled</p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {faqs.filter((faq) => faq.question?.trim()).length}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Answers Filled</p>

            <h2 className="mt-2 text-3xl font-bold text-purple-600">
              {faqs.filter((faq) => faq.answer?.trim()).length}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Completion</p>

            <h2 className="mt-2 text-3xl font-bold text-orange-600">
              {faqs.length === 0
                ? "0%"
                : `${Math.round(
                    (faqs.filter(
                      (faq) => faq.question?.trim() && faq.answer?.trim(),
                    ).length /
                      faqs.length) *
                      100,
                  )}%`}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQBlock;
