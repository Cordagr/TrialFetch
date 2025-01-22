// schema.js
import { db } from './firebase';
import { collection, addDoc, getDocs, query, where, orderBy } from "firebase/firestore";

// Function to get filtered trails
export const getFilteredTrails = async (userId, filters) => {
  try {
    let q = query(collection(db, "trails"));

    if (filters.stars) {
      q = query(q, where("rating", ">=", filters.stars));
    }

    if (filters.nonVisited) {
      const visitedTrails = await getVisitedTrails(userId);
      const visitedTrailIds = visitedTrails.map(trail => trail.id);
      q = query(q, where("__name__", "not-in", visitedTrailIds));
    }

    const querySnapshot = await getDocs(q);
    const filteredTrails = [];
    querySnapshot.forEach((doc) => {
      filteredTrails.push({ id: doc.id, ...doc.data() });
    });
    return filteredTrails;
  } catch (error) {
    console.error("Error getting filtered trails: ", error);
    return [];
  }
};
