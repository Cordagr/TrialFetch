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
  async (get, set, { trailId, description, rating }) => {
    try {
      const response = await axios.post(`/api/trailReviews`, { trailId, description, rating });
      const newReview = response.data;
      const currentReviews = get(reviewsAtom);
      const trailReviews = currentReviews[trailId] || [];
      set(reviewsAtom, { ...currentReviews, [trailId]: [...trailReviews, newReview] });
      console.log("Review Data from Atom:", newReview);
    } catch (error) {
      console.error("Error creating review", error);
    }
  }
);

export const trailReviewByIdAtom = atom(
(get) => get(singleReviewPostAtom),
async(get,set,{userId,reviewId}) =>
{
try
{
const response = await.axios.post(`/api/trailReviews/${userId}/${reviewPost}`)
const trailReviewPostData = response.data
set(singleReviewPostAtom,trailReviewPostData)
console.log("Review Post Data From Atom: ", trailReviewPostData)
} catch(error)
{
console.error("Error fetching review post", error);
}
}
)
