// schema.js
import { db } from './firebase';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

// Function to save visited trail
export const saveVisitedTrail = async (userId, trail) => {
  try {
    const docRef = await addDoc(collection(db, `users/${userId}/visitedTrails`), trail);
    console.log("Visited trail saved with ID: ", docRef.id);
  } catch (error) {
    console.error("Error saving visited trail: ", error);
  }
};

// Function to get visited trails
export const getVisitedTrails = async (userId) => {
  try {
    const q = query(collection(db, `users/${userId}/visitedTrails`));
    const querySnapshot = await getDocs(q);
    const visitedTrails = [];
    querySnapshot.forEach((doc) => {
      visitedTrails.push({ id: doc.id, ...doc.data() });
    });
    return visitedTrails;
  } catch (error) {
    console.error("Error getting visited trails: ", error);
    return [];
  }
};
