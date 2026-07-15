import axios from "axios";

const API = axios.create({
  // baseURL: "http://where-to-africa-safari-backend.manoramaseoservice.com/api/trips", 
//  baseURL: "http://localhost:8003/api/trips", // Change to your deployed backend URL in production
baseURL:"http://where-to-africa-safari-backend.whereto.africa/api/trips",

});


export const createTrip = (formData) =>
  API.post("/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getAllTrips = () => API.get("/");

export const getTripById = (id) => API.get(`/${id}`);

export const updateTrip = (id, formData) =>
  API.put(`/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteTrip = (id) => API.delete(`/${id}`);
