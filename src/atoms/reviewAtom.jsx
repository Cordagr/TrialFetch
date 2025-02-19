import { atom } from 'jotai';

// Define atoms to store review data
export const trailNameAtom = atom(localStorage.getItem("trailName") || "");
export const ratingAtom = atom(localStorage.getItem("rating") || "");
export const reviewContentAtom = atom(localStorage.getItem("reviewContent") || "");

// Define atom to manage reviews
export const reviewsAtom = atom([]);

// Define atom to create a review
export const createReviewAtom = atom(
  (get) => get(reviewsAtom),
  (get, set, { trailId, newReview }) => {
    const currentReviews = get(reviewsAtom);
    const trailReviews = currentReviews[trailId] || [];
    set(reviewsAtom, { ...currentReviews, [trailId]: [...trailReviews, newReview] });
  }
);
