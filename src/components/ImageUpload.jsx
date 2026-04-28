import React from "react";

const ImageUpload = ({ label, name, multiple, register }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold mb-2">{label}</label>
    <input
      type="file"
      accept="image/*"
      multiple={multiple}
      {...register(name)}
      className="w-full border p-2 rounded"
    />
  </div>
);

export default ImageUpload;

// export default function ImageUpload({ label, onChange }) {
//   return (
//     <div className="mb-4">
//       <label className="block text-gray-700 mb-1">{label}</label>
//       <input type="file" accept="image/*" onChange={onChange} />
//     </div>
//   );
// }
