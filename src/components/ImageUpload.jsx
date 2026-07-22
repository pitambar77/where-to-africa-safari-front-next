// import React from "react";

// const ImageUpload = ({ label, name, multiple, register }) => (
//   <div className="mb-4">
//     <label className="block text-sm font-semibold mb-2">{label}</label>
//     <input
//       type="file"
//       accept="image/*"
//       multiple={multiple}
//       {...register(name)}
//       className="w-full border p-2 rounded"
//     />
//   </div>
// );

// export default ImageUpload;

"use client";

import React, { useState } from "react";

const ImageUpload = ({
  label,
  name,
  multiple = false,
  register,
  existingImages = [],
}) => {
  const [preview, setPreview] = useState([]);

  const { onChange, ...rest } = register(name);

  const images =
    preview.length > 0
      ? preview
      : Array.isArray(existingImages)
        ? existingImages
        : [existingImages];

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-2">{label}</label>

      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        {...rest}
        onChange={(e) => {
          onChange(e);

          const files = Array.from(e.target.files);

          setPreview(files.map((file) => URL.createObjectURL(file)));
        }}
        className="w-full border p-2 rounded"
      />

      <div className="flex gap-3 flex-wrap mt-3">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            className="w-28 h-28 object-cover rounded border"
            alt=""
          />
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
