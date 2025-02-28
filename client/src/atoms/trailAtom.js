import { atom } from "jotai";
import axios from "../../api";

export const createTrailAtom = atom(
  null,
  async (get, set, trailData) => {
    try {
      console.log("Creating trail:", trailData);
      const response = await axios.post("/api/trails/createTrail", trailData);
      console.log("Trail created:", response.data);
      set(createTrailAtom, response.data);
    } catch (error) {
      console.error("Error creating trail:", error);
    }
  }
);

export const getTrailAtom = atom(
  null,
  async (get, set, { trailId }) => {
    try {
      console.log("Fetching trail:", trailId);
      const response = await axios.get(`/api/trails/getTrail?trailId=${trailId}`);
      console.log("Trail fetched:", response.data);
      set(getTrailAtom, response.data);
    } catch (error) {
      console.error("Error fetching trail:", error);
    }
  }
);

export const updateTrailAtom = atom(
  null,
  async (get, set, { trailId, updatedTrailData }) => {
    try {
      console.log("Updating trail:", trailId, updatedTrailData);
      const response = await axios.put("/api/trails/updateTrail", {
        trailId,
        ...updatedTrailData,
      });
      console.log("Trail updated:", response.data);
      set(updateTrailAtom, response.data);
    } catch (error) {
      console.error("Error updating trail:", error);
    }
  }
);

export const deleteTrailAtom = atom(
  null,
  async (get, set, { trailId }) => {
    try {
      console.log("Deleting trail:", trailId);
      await axios.delete(`/api/trails/deleteTrail?trailId=${trailId}`);
      console.log("Trail deleted");
      set(deleteTrailAtom, null);
    } catch (error) {
      console.error("Error deleting trail:", error);
    }
  }
);
