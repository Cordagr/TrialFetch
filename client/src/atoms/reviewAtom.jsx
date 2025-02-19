import { atom } from 'jotai';

// Define atoms to store review data
export const trailNameAtom = atom(localStorage.getItem("trailName") || "");
export const ratingAtom = atom(localStorage.getItem("rating") || "");
export const reviewContentAtom = atom(localStorage.getItem("reviewContent") || "");

// Define atom to manage reviews
export const reviewsAtom = atom([]);

// TODO: Attach user identifier to every review
// Define atom to create a review
export const createReviewAtom = atom(
  (get) => get(reviewsAtom),
  (get, set, { trailId, description, rating }) => {
    const currentReviews = get(reviewsAtom);
    const trailReviews = currentReviews[trailId] || [];
    // Define the new review structure
    const newReview = {
      description,
      rating: Math.max(0, Math.min(5, rating)), // Ensure rating is between 0 and 5
      date: new Date().toISOString() // Add a timestamp for the review
    };
    set(reviewsAtom, { ...currentReviews, [trailId]: [...trailReviews, newReview] });
  }
);
