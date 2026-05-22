// import React, { useEffect, useState } from "react";
// import { getExperienceById, updateExperience } from "../../api/experienceAPI.js";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import ExperienceForm from "../../components/ExperienceBackend/ExperienceForm";

// const EditExperience = () => {
//   const { id } = useParams();
//   const [exp, setExp] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const res = await getExperienceById(id);
//       setExp(res.data);
//     })();
//   }, [id]);

//   const handleSubmit = async (formData) => {
//     try {
//       await updateExperience(id, formData);
//       toast.success("Experience updated!");
//     } catch (error) {
//       toast.error("Update failed!");
//     }
//   };

//   if (!exp) return <p>Loading...</p>;

//   return (
//     <div className="max-w-6xl mx-auto py-10">
//       <h1 className="text-3xl font-bold mb-6">Edit Experience</h1>
//       <ExperienceForm onSubmit={handleSubmit} initialData={exp} />
//     </div>
//   );
// };

// export default EditExperience;

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { getExperienceById, updateExperience } from "@/api/experienceAPI";

import ExperienceForm from "@/components/ExperienceBackend/ExperienceForm";

const EditExperience = () => {
  const params = useParams();
  const id = params?.id;

  const [exp, setExp] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchExperience = async () => {
      try {
        const res = await getExperienceById(id);
        setExp(res.data);
      } catch (error) {
        toast.error("Failed to load experience!");
      }
    };

    fetchExperience();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await updateExperience(id, formData);
      toast.success("Experience updated!");
    } catch (error) {
      toast.error("Update failed!");
    }
  };

  if (!exp) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Experience</h1>

      <ExperienceForm onSubmit={handleSubmit} initialData={exp} />
    </div>
  );
};

export default EditExperience;
