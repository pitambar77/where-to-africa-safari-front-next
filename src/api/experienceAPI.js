import axios from "axios";

const API = axios.create({
  // baseURL: "http://where-to-africa-safari-backend.manoramaseoservice.com/api/experience",
  // baseURL: "http://localhost:8003/api/experience",
  baseURL: "https://where-to-africa-safari-backend.whereto.africa/api/experience",

});

// CREATE
export const createExperience = (formData) =>
  API.post("/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// READ
export const getAllExperiences = () => API.get("/");

export const getExperienceById = () => API.get(`/${id}`);
// UPDATE
export const updateExperience = (id, formData) =>
  API.put(`/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// DELETE
export const deleteExperience = (id) => API.delete(`/${id}`);

