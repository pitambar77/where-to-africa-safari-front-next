import React from "react";
import { createExperience } from "../../api/experienceAPI.js";
import ExperienceForm from "../../components/ExperienceBackend/ExperienceForm";
import { toast } from "react-toastify";

const AddExperience = () => {
  const handleSubmit = async (formData) => {
    try {
      await createExperience(formData);
      toast.success("Experience created successfully!");
    } catch (error) {
      toast.error("Error creating experience");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Add Experience</h1>
      <ExperienceForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddExperience;


