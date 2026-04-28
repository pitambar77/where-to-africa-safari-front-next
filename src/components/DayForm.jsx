// import React from "react";

// const DayForm = ({ day, index, handleChange, handleRemove }) => (
//   <div className="border p-4 rounded-xl bg-gray-50">
//     <div className="flex justify-between items-center mb-2">
//       <h3 className="font-semibold">Day {index + 1}</h3>
//       <button type="button" onClick={() => handleRemove(index)} className="text-red-500">
//         Remove
//       </button>
//     </div>

//     <div className="grid grid-cols-2 gap-3">
//       <input name="day" value={day.day} onChange={(e) => handleChange(e, index)} placeholder="Day (e.g. Day 1)" className="border p-2 rounded" />
//       <input name="title" value={day.title} onChange={(e) => handleChange(e, index)} placeholder="Title" className="border p-2 rounded" />
//       <input name="location" value={day.location} onChange={(e) => handleChange(e, index)} placeholder="Location" className="border p-2 rounded" />
//       <input name="accommodationName" value={day.accommodationName} onChange={(e) => handleChange(e, index)} placeholder="Accommodation" className="border p-2 rounded" />
//       <textarea name="description" value={day.description} onChange={(e) => handleChange(e, index)} placeholder="Description" className="border p-2 rounded col-span-2" />
//       <input type="file" name="image" onChange={(e) => handleChange(e, index, true)} className="col-span-2" />
//     </div>
//   </div>
// );

// export default DayForm;


import React from "react";
import { MdDelete } from "react-icons/md";

const DayForm = ({
  day,
  index,
  handleChange,
  handleRemove,
  handleDeleteImage,
}) => (
  <div className="border p-4 rounded-xl bg-gray-50">
    <div className="flex justify-between items-center mb-2">
      <h3 className="font-semibold">Day {index + 1}</h3>
      <button
        type="button"
        onClick={() => handleRemove(index)}
        className="text-red-500 hover:text-red-700"
      >
        Remove Day
      </button>
    </div>

    <div className="grid grid-cols-2 gap-3">
      <input
        name="day"
        value={day.day}
        onChange={(e) => handleChange(e, index)}
        placeholder="Day (e.g. Day 1)"
        className="border p-2 rounded"
      />
      <input
        name="title"
        value={day.title}
        onChange={(e) => handleChange(e, index)}
        placeholder="Title"
        className="border p-2 rounded"
      />
      <input
        name="location"
        value={day.location}
        onChange={(e) => handleChange(e, index)}
        placeholder="Location"
        className="border p-2 rounded"
      />
      <input
        name="accommodationName"
        value={day.accommodationName}
        onChange={(e) => handleChange(e, index)}
        placeholder="Accommodation"
        className="border p-2 rounded"
      />
      <textarea
        name="description"
        value={day.description}
        onChange={(e) => handleChange(e, index)}
        placeholder="Description"
        className="border p-2 rounded col-span-2"
      />

      {/* ✅ Image Preview + Delete Button */}
      {day.image && typeof day.image === "string" && (
        <div className="relative col-span-2 w-fit">
          <img
            src={day.image}
            alt="preview"
            className="w-40 h-28 object-cover rounded-lg border"
          />
          <button
            type="button"
            onClick={() => handleDeleteImage(index)}
            className="absolute top-1 right-1 bg-white/70 p-1 rounded-full text-red-600 hover:bg-white"
          >
            <MdDelete size={18} />
          </button>
        </div>
      )}

      <input
        type="file"
        name="image"
        onChange={(e) => handleChange(e, index, true)}
        className="col-span-2"
      />
    </div>
  </div>
);

export default DayForm;

