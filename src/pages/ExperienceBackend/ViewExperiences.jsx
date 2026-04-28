import React, { useEffect, useState } from "react";
import { getAllExperiences, deleteExperience } from "../../api/experienceAPI.js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ViewExperiences = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await getAllExperiences();
    setData(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this experience?")) {
      await deleteExperience(id);
      toast.success("Deleted successfully");
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">All Experiences</h1>
      <div className="grid grid-cols-3 gap-6">
        {data.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={item.bannerImage} alt="" className="h-48 w-full object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{item.bannerTitle}</h2>
              <p className="text-sm text-gray-600 mb-3">
                {item.bannerDescription.slice(0, 100)}...
              </p>
              <div className="flex gap-3">
                <Link
                  to={`/edit-experience/${item._id}`}
                  className="bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-600 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewExperiences;
