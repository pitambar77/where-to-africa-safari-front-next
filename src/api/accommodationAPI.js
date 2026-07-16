// This my first accomodation that work fine

import axios from "axios";

const API = axios.create({
  // baseURL:
  //   "http://where-to-africa-safari-backend.manoramaseoservice.com/api/accommodation",
  // baseURL: "http://localhost:8003/api/accommodation",
  baseURL: "https://where-to-africa-safari-backend.whereto.africa/api/accommodation",
});

export const createAccommodation = (formData) =>
  API.post("/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getAccommodations = () => API.get("/");
export const getAccommodationBySlug = (slug) => API.get(`/slug/${slug}`);

export const getAccommodationById = (id) => API.get(`/${id}`);
export const deleteAccommodation = (id) => API.delete(`/${id}`);

export const updateAccommodation = (id, formData) =>
  API.put(`/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// export const getFilteredAccommodations = (destination, subdestination) =>
//   API.get(`/filter?destination=${destination}&subdestination=${subdestination}`);

export const getFilteredAccommodations = (destination, subdestination) => {
  const params = {};
  if (destination) params.destination = destination;
  if (subdestination) params.subdestination = subdestination;
  return API.get("/", { params }); // sends ?destination=Africa&subdestination=Kenya
};

// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:8000/api/accommodations", // must match backend route
// });

// export const createAccommodation = (formData) =>
//   API.post("/", formData, { headers: { "Content-Type": "multipart/form-data" } });

// export const getAllAccommodations = () => API.get("/");
// export const getAccommodationById = (id) => API.get(`/${id}`);
// export const updateAccommodation = (id, formData) =>
//   API.put(`/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
// export const deleteAccommodation = (id) => API.delete(`/${id}`);

// src/api/accommodationAPI.js
//

// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:8000/api/accommodations",
// });

// export const createAccommodation = (formData) =>
//   API.post("/", formData, { headers: { "Content-Type": "multipart/form-data" } });

// export const updateAccommodation = (id, formData) =>
//   API.put(`/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });

// export const getAllAccommodations = () => API.get("/");
// export const getAccommodationById = (id) => API.get(`/${id}`);
// export const deleteAccommodation = (id) => API.delete(`/${id}`);
