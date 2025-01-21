// schema.js
import { db } from './firebase';
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from "firebase/firestore";

// Function to save trail
export const saveTrail = async (userId, trail) => {
  try {
    const docRef = await addDoc(collection(db, "trails"), {
      userId,
      ...trail
    });
    console.log("Trail saved with ID: ", docRef.id);
  } catch (error) {
    console.error("Error saving trail: ", error);
  }
};

// Function to rate trail
export const rateTrail = async (trailId, rating) => {
  try {
    const trailRef = doc(db, "trails", trailId);
    await updateDoc(trailRef, {
      rating
    });
    console.log("Trail rated");
  } catch (error) {
    console.error("Error rating trail: ", error);
  }
};
