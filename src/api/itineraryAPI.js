// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:8000/api/itinerary", // your backend URL
// });

// export const getItineraries = () => API.get("/");
// export const getItinerary = (id) => API.get(`/${id}`);
// export const createItinerary = (formData) =>
//   API.post("/", formData, { headers: { "Content-Type": "multipart/form-data" } });
// export const updateItinerary = (id, formData) =>
//   API.put(`/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
// export const deleteItinerary = (id) => API.delete(`/${id}`);


import axios from "axios";

const API = axios.create({
  baseURL: "http://where-to-africa-safari-backend.manoramaseoservice.com/api/itinerary", // backend base URL
  // baseURL: "http://localhost:8003/api/itinerary", // backend base URL

});

export const getItineraries = () => API.get("/");
export const getItinerary = (id) => API.get(`/${id}`);
export const createItinerary = (formData) =>
  API.post("/", formData, { headers: { "Content-Type": "multipart/form-data" } });
export const updateItinerary = (id, formData) =>
  API.put(`/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
export const deleteItinerary = (id) => API.delete(`/${id}`);


export const deleteItineraryImage = (itineraryId, dayIndex) =>
  API.delete(`/${itineraryId}/day/${dayIndex}/image`);
