// "use client";

// import Image from "next/image";
// import { TbHandFingerRight } from "react-icons/tb";

// export default function BlogContent({ blog }) {
//   if (!blog) return null;

//   return (
//     <section className="">
//       <div className="mx-auto max-w-5xl px-4">
//         {/* Hero Image */}
//         {blog.bannerImage && (
//           <div className="relative mb-20 h-[500px] overflow-hidden rounded-md">
//             <Image
//               src={blog.bannerImage}
//               alt={blog.title}
//               fill
//               priority
//               className="object-cover"
//             />
//           </div>
//         )}

// {blog.content?.map((section, index) => {
//   switch (section.type) {
//     case "heading":
//       return (
//         <section key={index} className="mb-10">
//           <h2 className="font-cormorant text-5xl text-[#4f4f4f]">
//             {section.text}
//           </h2>
//         </section>
//       );

//     case "heading3":
//       return (
//         <section key={index} className="mb-6">
//           <h3 className="font-cormorant text-3xl font-medium text-[#555]">
//             {section.text}
//           </h3>
//         </section>
//       );

//     case "heading4":
//       return (
//         <section key={index} className="mb-4">
//           <h4 className="font-cormorant text-2xl font-medium text-[#555]">
//             {section.text}
//           </h4>
//         </section>
//       );

//     case "paragraph":
//       return (
//         <section key={index} className="mb-8">
//           <p className="leading-8 text-gray-700">{section.text}</p>
//         </section>
//       );

//     case "list":
//       return (
//         <section key={index} className="mb-10 font-quicksand">
//           <ul className="ml-8 list-disc space-y-3 marker:text-[#ab8c51]">
//             {section.items.map((item, i) => (
//               <li key={i} className="text-gray-700">
//                 {item}
//               </li>
//             ))}
//           </ul>
//         </section>
//       );

//     case "numberList":
//       return (
//         <section key={index} className="mb-10">
//           <ol className="ml-8 list-decimal space-y-3 text-gray-700">
//             {section.items.map((item, i) => (
//               <li key={i}>{item}</li>
//             ))}
//           </ol>
//         </section>
//       );

//     case "checkList":
//       return (
//         <section key={index} className="mb-12">
//           <div className="space-y-4">
//             {section.items.map((item, i) => (
//               <div key={i} className="flex items-start gap-4">
//                 <TbHandFingerRight
//                   className="mt-1 text-[#ab8c51]"
//                   size={22}
//                 />

//                 <p className="leading-6 text-gray-700">{item}</p>
//               </div>
//             ))}
//           </div>
//         </section>
//               );
//             /* ---------------------------------- */
//             /* Text + Image */
//             /* ---------------------------------- */

//             case "textImage":
//               return (
//                 <section
//                   key={index}
//                   className="mb-24 grid items-center gap-16 lg:grid-cols-2"
//                 >
//                   {section.layout === "left" ? (
//                     <>
//                       <div className="relative h-[460px] overflow-hidden rounded-md">
//                         <Image
//                           src={section.image}
//                           alt=""
//                           fill
//                           className="object-cover"
//                         />
//                       </div>

//                       <div>
//                         {section.title && (
//                           <h2 className="mb-6 font-cormorant text-[#636363] text-4xl">
//                             {section.title}
//                           </h2>
//                         )}

//                         {section.text.map((para, i) => (
//                           <p key={i} className="mb-6 leading-8 text-gray-700">
//                             {para}
//                           </p>
//                         ))}
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <div>
//                         {section.title && (
//                           <h2 className="mb-6 font-cormorant text-4xl text-[#636363]">
//                             {section.title}
//                           </h2>
//                         )}

//                         {section.text.map((para, i) => (
//                           <p key={i} className="mb-6 leading-8 text-gray-700">
//                             {para}
//                           </p>
//                         ))}
//                       </div>

//                       <div className="relative h-[460px] overflow-hidden rounded-md">
//                         <Image
//                           src={section.image}
//                           alt=""
//                           fill
//                           className="object-cover"
//                         />
//                       </div>
//                     </>
//                   )}
//                 </section>
//               );

//             /* ---------------------------------- */
//             /* Gallery */
//             /* ---------------------------------- */

//             case "gallery":
//               return (
//                 <section key={index} className="mb-24">
//                   <div className="grid gap-4 md:grid-cols-3">
//                     {section.images.map((img, i) => (
//                       <div
//                         key={i}
//                         className="relative h-[500px] overflow-hidden rounded-md"
//                       >
//                         <Image
//                           src={img}
//                           alt=""
//                           fill
//                           className="object-cover transition duration-500 hover:scale-105"
//                         />
//                       </div>
//                     ))}
//                   </div>

//                   <div className="mt-8 grid gap-10 md:grid-cols-2">
//                     <p className=" leading-8 text-gray-700">
//                       {section.descriptionLeft}
//                     </p>

//                     <p className=" leading-8 text-gray-700">
//                       {section.descriptionRight}
//                     </p>
//                   </div>
//                 </section>
//               );

//             /* ---------------------------------- */
//             /* Quote */
//             /* ---------------------------------- */

//             case "quote":
//               return (
//                 <blockquote
//                   key={index}
//                   className="mx-auto my-16 max-w-4xl font-quicksand border-l-4 border-[#ab8c51] pl-8 text-xl italic leading-relaxed text-gray-700"
//                 >
//                   {section.text}
//                 </blockquote>
//               );

//             /* ---------------------------------- */
//             /* Full Image */
//             /* ---------------------------------- */

//             case "image":
//               return (
//                 <div
//                   key={index}
//                   className="relative mb-10 h-[500px] overflow-hidden rounded-lg"
//                 >
//                   <Image
//                     src={section.image}
//                     alt=""
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//               );

//             default:
//               return null;
//           }
//         })}
//       </div>
//     </section>
//   );
// }

"use client";

import Image from "next/image";

export default function BlogContent({ blog }) {
  if (!blog) return null;

  return (
    <section className="py-10">
      <div className="mx-auto max-w-5xl px-4">
        {/* =====================================
            Banner Image
        ===================================== */}

        {blog.bannerImage && (
          <div className="relative mb-8 h-[500px] overflow-hidden rounded-md">
            <Image
              src={blog.bannerImage}
              alt={blog.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* =====================================
            Content Blocks
        ===================================== */}

        {blog.content?.map((section, index) => {
          switch (section.type) {
            /* =====================================
                Editor Block
            ===================================== */

            case "editor":
              return (
                <section key={index} className="mb-4">
                  {section.title && (
                    <h2 className="mb-6 font-cormorant text-5xl text-[#636363]">
                      {section.title}
                    </h2>
                  )}

                  {section.subtitle && (
                    <p className="mb-8 font-quicksand text-lg text-gray-500">
                      {section.subtitle}
                    </p>
                  )}
                  <div
                    className="rich-text"
                    dangerouslySetInnerHTML={{
                      __html: section.content || "",
                    }}
                  />
                </section>
              );

            /* =====================================
                Single Image
            ===================================== */

            case "image":
              return (
                <section key={index} className="mb-8">
                  {section.media?.length > 0 && (
                    <div className="relative h-[500px] overflow-hidden rounded-md">
                      <Image
                        src={section.media[0].url}
                        alt={section.media[0].alt || ""}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  {section.title && (
                    <p className="my-2 text-sm right-0 text-[#636363]">
                      {section.title}
                    </p>
                  )}
                  {section.subtitle && (
                    <p className="mt-6 text-center text-gray-500 italic">
                      {section.subtitle}
                    </p>
                  )}
                </section>
              );

            /* =====================================
                Divider
            ===================================== */

            case "divider":
              return (
                <div key={index} className="my-10">
                  <hr className="border-t border-gray-300" />
                </div>
              );

            /* =====================================
    Text + Image
===================================== */

            case "textImage":
              return (
                <section
                  key={index}
                  className="mb-16 grid items-center gap-12 lg:grid-cols-2"
                >
                  {section.layout === "left" ? (
                    <>
                      {section.media?.length > 0 && (
                        <div className="relative h-[450px] overflow-hidden rounded-md">
                          <Image
                            src={section.media[0].url}
                            alt={section.media[0].alt || ""}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      <div>
                        {section.title && (
                          <h2 className="mb-4 font-cormorant text-5xl text-[#636363]">
                            {section.title}
                          </h2>
                        )}

                        {section.subtitle && (
                          <p className="mb-6 text-gray-500">
                            {section.subtitle}
                          </p>
                        )}

                        <div
                          className="prose max-w-none prose-p:leading-8"
                          dangerouslySetInnerHTML={{
                            __html: section.content || "",
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        {section.title && (
                          <h2 className="mb-4 font-cormorant text-5xl text-[#636363]">
                            {section.title}
                          </h2>
                        )}

                        {section.subtitle && (
                          <p className="mb-6 text-gray-500">
                            {section.subtitle}
                          </p>
                        )}

                        <div
                          className="prose max-w-none prose-p:leading-8"
                          dangerouslySetInnerHTML={{
                            __html: section.content || "",
                          }}
                        />
                      </div>

                      {section.media?.length > 0 && (
                        <div className="relative h-[450px] overflow-hidden rounded-md">
                          <Image
                            src={section.media[0].url}
                            alt={section.media[0].alt || ""}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </>
                  )}
                </section>
              );

            /* =====================================
    Gallery
===================================== */

            case "gallery":
              return (
                <section key={index} className="mb-16">
                  {section.title && (
                    <h2 className="mb-8 text-center font-cormorant text-5xl text-[#636363]">
                      {section.title}
                    </h2>
                  )}

                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {section.media?.map((image, i) => (
                      <div
                        key={i}
                        className="relative h-[320px] overflow-hidden rounded-md"
                      >
                        <Image
                          src={image.url}
                          alt={image.alt || ""}
                          fill
                          className="object-cover transition duration-500 hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>

                  {section.content && (
                    <div
                      className="prose mx-auto mt-10 max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: section.content,
                      }}
                    />
                  )}
                </section>
              );

            /* =====================================
    Image Grid
===================================== */

            case "imageGrid":
              return (
                <section key={index} className="mb-16">
                  {section.title && (
                    <h2 className="mb-8 font-cormorant text-5xl text-[#636363]">
                      {section.title}
                    </h2>
                  )}

                  <div
                    className={`grid gap-5 ${
                      section.columns === 2
                        ? "md:grid-cols-2"
                        : section.columns === 4
                          ? "md:grid-cols-2 lg:grid-cols-4"
                          : "md:grid-cols-2 lg:grid-cols-3"
                    }`}
                  >
                    {section.media?.map((image, i) => (
                      <div
                        key={i}
                        className="relative aspect-square overflow-hidden rounded-md"
                      >
                        <Image
                          src={image.url}
                          alt={image.alt || ""}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              );

            /* =====================================
    Slider
===================================== */

            case "slider":
              return (
                <section key={index} className="mb-16">
                  {section.title && (
                    <h2 className="mb-8 text-center font-cormorant text-5xl text-[#636363]">
                      {section.title}
                    </h2>
                  )}

                  <div className="space-y-6">
                    {section.media?.map((image, i) => (
                      <div
                        key={i}
                        className="relative h-[500px] overflow-hidden rounded-md"
                      >
                        <Image
                          src={image.url}
                          alt={image.alt || ""}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              );

            /* =====================================
    Video
===================================== */

            case "video":
              return (
                <section key={index} className="mb-16">
                  {section.title && (
                    <h2 className="mb-6 text-center font-cormorant text-5xl text-[#636363]">
                      {section.title}
                    </h2>
                  )}

                  <div className="overflow-hidden rounded-md">
                    {section.videoUrl?.includes("youtube") ||
                    section.videoUrl?.includes("youtu.be") ? (
                      <iframe
                        src={section.videoUrl.replace("watch?v=", "embed/")}
                        className="h-[500px] w-full"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        controls
                        className="w-full rounded-xl"
                        src={section.videoUrl}
                      />
                    )}
                  </div>

                  {section.content && (
                    <div
                      className="prose mx-auto mt-8 max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: section.content,
                      }}
                    />
                  )}
                </section>
              );

            /* =====================================
    FAQ
===================================== */

            case "faq":
              return (
                <section key={index} className="mb-16">
                  {section.title && (
                    <h2 className="mb-8 text-center font-cormorant text-5xl text-[#636363]">
                      {section.title}
                    </h2>
                  )}

                  <div className="space-y-5">
                    {section.items?.map((faq, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-gray-200 p-6"
                      >
                        <h3 className="mb-3 text-xl font-semibold">
                          {faq.question}
                        </h3>

                        <div
                          className="prose max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: faq.answer,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </section>
              );

            /* =====================================
    Accordion
===================================== */

            // case "accordion":
            //   return (
            //     <section key={index} className="mb-16">
            //       {section.title && (
            //         <h2 className="mb-8 text-center font-cormorant text-5xl text-[#636363]">
            //           {section.title}
            //         </h2>
            //       )}

            //       <div className="space-y-4">
            //         {section.items?.map((item, i) => (
            //           <details
            //             key={i}
            //             className="rounded-xl border border-gray-200 p-5"
            //           >
            //             <summary className="cursor-pointer text-lg font-semibold">
            //               {item.question}
            //             </summary>

            //             <div
            //               className="prose mt-4 max-w-none"
            //               dangerouslySetInnerHTML={{
            //                 __html: item.answer,
            //               }}
            //             />
            //           </details>
            //         ))}
            //       </div>
            //     </section>
            //   );

            case "accordion":
              return (
                <section key={index} className="mb-10">
                  {/* Section Title */}
                  {section.title && (
                    <h2 className="mb-4 font-cormorant text-[40px] text-[#636363]">
                      {section.title}
                    </h2>
                  )}

                  {/* Accordion */}
                  <div className="space-y-3">
                    {section.items?.map((item, i) => (
                      <details
                        key={i}
                        className="group border-b border-dotted border-[#dcd9d1]"
                      >
                        {/* Accordion Header */}
                        <summary
                          className="
                flex
                cursor-pointer
                list-none
                items-center
                justify-between
                gap-3
                px-1
                py-3
                text-[22px]
                text-[#555555]
                transition-colors
                duration-300
                hover:text-[#b1a58a]

                [&::-webkit-details-marker]:hidden
              "
                        >
                          <h4
                            className=" font-cormorant
    text-[#555555]
    transition-colors
    duration-300
    group-open:text-[#b1a58a]"
                          >
                            {" "}
                            {item.title || ""}
                          </h4>

                          {/* Arrow */}
                          <span
                            className="
                  flex
                  h-6
                  w-6
                  shrink-0
                  items-center
                  justify-center
                  text-[#d8d6d1]
                  transition-transform
                  duration-300
                  group-open:rotate-180
                "
                          >
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            >
                              <path
                                d="M6 9l6 6 6-6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </summary>

                        {/* Accordion Content */}
                        <div className="px-1 pb-7">
                          <div
                            className="rich-text accordion-rich-text"
                            dangerouslySetInnerHTML={{
                              __html: item.content || item.answer || "",
                            }}
                          />
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              );

            /* =====================================
    Quote
===================================== */

            case "quote":
              return (
                <blockquote
                  key={index}
                  className="mx-auto my-20 max-w-4xl border-l-4 border-[#ab8c51] pl-8 text-2xl italic leading-relaxed text-gray-700"
                >
                  {section.content}

                  {section.author && (
                    <footer className="mt-6 text-lg not-italic font-semibold text-[#ab8c51]">
                      — {section.author}
                    </footer>
                  )}
                </blockquote>
              );

            /* =====================================
    Button
===================================== */

            case "button":
              return (
                <section key={index} className="mb-16 text-center">
                  {section.title && (
                    <h2 className="mb-5 font-cormorant text-5xl text-[#636363]">
                      {section.title}
                    </h2>
                  )}

                  {section.content && (
                    <div
                      className="prose mx-auto mb-8 max-w-3xl"
                      dangerouslySetInnerHTML={{
                        __html: section.content,
                      }}
                    />
                  )}

                  <a
                    href={section.buttonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-lg bg-[#ab8c51] px-8 py-4 font-semibold text-white transition hover:bg-[#8f7343]"
                  >
                    {section.buttonText || "Learn More"}
                  </a>
                </section>
              );

            /* =====================================
    Table
===================================== */

            case "table":
              return (
                <section key={index} className="mb-16">
                  {section.title && (
                    <h2 className="mb-8 text-center font-cormorant text-5xl text-[#636363]">
                      {section.title}
                    </h2>
                  )}

                  <div className="overflow-x-auto rounded-xl border">
                    <table className="min-w-full border-collapse">
                      {section.headers?.length > 0 && (
                        <thead className="bg-[#ab8c51] text-white">
                          <tr>
                            {section.headers.map((header, i) => (
                              <th
                                key={i}
                                className="border px-5 py-4 text-left"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                      )}

                      <tbody>
                        {section.rows?.map((row, rowIndex) => (
                          <tr
                            key={rowIndex}
                            className="odd:bg-white even:bg-gray-50"
                          >
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} className="border px-5 py-4">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              );

            /* =====================================
    Divider
===================================== */

            case "divider":
              return (
                <section key={index} className="my-16">
                  <hr className="border-t border-gray-300" />
                </section>
              );

            /* =====================================
    Callout
===================================== */

            case "callout":
              return (
                <section key={index} className="mb-16">
                  <div
                    className={`rounded-xl border-l-4 p-8 ${
                      section.style === "warning"
                        ? "border-yellow-500 bg-yellow-50"
                        : section.style === "success"
                          ? "border-green-500 bg-green-50"
                          : section.style === "danger"
                            ? "border-red-500 bg-red-50"
                            : "border-blue-500 bg-blue-50"
                    }`}
                  >
                    {section.title && (
                      <h3 className="mb-3 text-2xl font-semibold">
                        {section.title}
                      </h3>
                    )}

                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: section.content,
                      }}
                    />
                  </div>
                </section>
              );

            default:
              return (
                <div
                  key={index}
                  className="mb-8 rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600"
                >
                  Unsupported block type: <strong>{section.type}</strong>
                </div>
              );
          }
        })}
      </div>
    </section>
  );
}
