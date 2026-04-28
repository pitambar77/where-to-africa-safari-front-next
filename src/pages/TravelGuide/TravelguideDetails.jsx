"use client";

import React from "react";

import { TbHandFingerRight } from "react-icons/tb";
import Banner from "../../components/Banner";
import PageNotFound from "../PageNotFound";

const RenderSection = ({ section }) => {
  switch (section.type) {
    case "h1":
      return (
        <h2 className="text-4xl mb-8 mt-4 text-[#636363] capitalize font-cormorant tracking-wide font-semibold">
          {section.text}
        </h2>
      );

    case "h2":
      return (
        <h3 className="text-3xl text-[#636363] capitalize font-cormorant font-semibold tracking-wide mb-4">
          {section.text}
        </h3>
      );

    case "h3":
      return (
        <h4 className="text-2xl text-[#636363] capitalize font-cormorant font-semibold tracking-wide mb-4">
          {section.text}
        </h4>
      );

    case "paragraph":
      return (
        <p className="text-gray-700 text-lg leading-relaxed mb-6 font-quicksand">
          {section.text}
        </p>
      );

    case "image":
      return (
        <img
          src={section.imageUrl}
          alt={section.imageAlt || ""}
          className="rounded-sm shadow-sm w-full h-[560px] my-8 object-cover"
        />
      );

    case "list":
      return (
        <ul className="space-y-3 text-gray-700 text-lg my-8 ml-6 font-quicksand">
          {section.items?.map((item) => (
            <li key={item.id} className="flex gap-2">
              <span className="text-[#d5aa4f] mt-1 text-xl">
                <TbHandFingerRight />
              </span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      );

    default:
      return null;
  }
};

const TravelguideDetails = ({ blog }) => {

  if (!blog) return <PageNotFound/>;

  return (
    <div>
      <Banner imageUrl={blog.thumbnail} title={blog.title} />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {blog.sections.map((section, index) => (
          <RenderSection key={index} section={section} />
        ))}
      </div>
    </div>
  );
};

export default TravelguideDetails;

