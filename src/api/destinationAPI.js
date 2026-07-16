
// ✅ correct versions

import axiosInstance from "./axiosInstance";

export const getDestinationBySlug = (slug) =>
  axiosInstance.get(`/api/destinations/slug/${slug}`);

export const getRegionBySlug = async (destinationSlug, regionSlug) => 
  axiosInstance.get(`api/destinations/${destinationSlug}/regions/${regionSlug}`);

export const getAllDestinations = () => axiosInstance.get("/api/destinations");
export const createDestination = (formData) =>
  axiosInstance.post("/api/destinations", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateDestination = (id, formData) =>
  axiosInstance.put(`/api/destinations/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteDestination = (id) =>
  axiosInstance.delete(`/api/destinations/${id}`);
