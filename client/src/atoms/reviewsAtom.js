import { atom } from "jotai";
import axios from "../../api";

export const createReviewAtom = atom(
  null,
  async (get, set, { userId, trailName, rating, reviewContent }) => {
    try {
      console.log("Creating review:", { userId, trailName, rating, reviewContent });
      const response = await axios.post("/api/reviews", {
        userId,
        trailName,
        rating,
        reviewContent,
      });
      console.log("Review created:", response.data);
      set(createReviewAtom, response.data);
    } catch (error) {
      console.error("Error creating review:", error);
    }
  }
);

export const getReviewsAtom = atom(
  null,
  async (get, set, { trailId }) => {
    try {
      console.log("Fetching reviews for trail:", trailId);
      const response = await axios.get(`/api/reviews/${trailId}`);
      console.log("Reviews fetched:", response.data);
      set(getReviewsAtom, response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  }
);
