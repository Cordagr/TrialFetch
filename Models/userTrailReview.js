// schema.js
import { db } from './firebase';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

// Function to save review
export const saveReview = async (trailId, userId, review) => {
  try {
    const reviewData = {
      userId,
      ...review,
      timestamp: new Date(),
    };
    const docRef = await addDoc(collection(db, `trails/${trailId}/reviews`), reviewData);
    console.log("Review saved with ID: ", docRef.id);
  } catch (error) {
    console.error("Error saving review: ", error);
  }
};

// Function to get reviews
export const getReviews = async (trailId) => {
  try {
    const q = query(collection(db, `trails/${trailId}/reviews`), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    const reviews = [];
    querySnapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() });
    });
    return reviews;
  } catch (error) {
    console.error("Error getting reviews: ", error);
    return [];
  }
};
