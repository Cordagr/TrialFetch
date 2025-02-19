import { atom } from "jotai";
import axios from "axios";

// Empty atom to store walking trails in array
export const trailsAtom = atom([]);
// Atom to store a single trail
export const singleTrailAtom = atom(null);

// Atom to fetch trails from database
export const fetchTrailsAtom = atom(
    (get) => get(trailsAtom),
    async (get, set, userId) => {
        try {
            const response = await axios.get(`/api/trails/${userId}`);
            const trailsData = response.data;
            set(trailsAtom, trailsData);
            console.log("Trails Data from Atom:", trailsData);
        } catch (error) {
            console.error("Error fetching trails", error);
        }
    }
);

// Atom to fetch a single trail by ID
export const fetchTrailByIdAtom = atom(
    (get) => get(singleTrailAtom),
    async (get, set, { userId, trailId }) => {
        try {
            const response = await axios.get(`/api/trails/${userId}/${trailId}`);
            const trailData = response.data;
            set(singleTrailAtom, trailData);
            console.log("Single Trail Data from Atom:", trailData);
        } catch (error) {
            console.error("Error fetching trail", error);
        }
    }
);

// Atom to create a trail
export const createTrailAtom = atom(
    null,
    async (get, set, { userId, name, location, description }) => {
        try {
            const payload = { userId, name, location, description };
            const response = await axios.post("/api/trails", payload);
            const newTrail = response.data;
            set(trailsAtom, [...get(trailsAtom), newTrail]);
            console.log("New Trail from Atom:", newTrail);
        } catch (error) {
            console.error("Error creating trail", error);
        }
    }
);

// Atom to update a trail
export const updateTrailAtom = atom(
    null,
    async (get, set, { userId, trailId, name, location, description }) => {
        try {
            const payload = { userId, trailId, name, location, description };
            const response = await axios.put(`/api/trails`, payload);
            const updatedTrail = response.data;
            set(
                trailsAtom,
                get(trailsAtom).map((trail) => (trail._id === trailId ? updatedTrail : trail))
            );
            console.log("Updated Trail from Atom:", updatedTrail);
        } catch (error) {
            console.error("Error updating trail", error);
        }
    }
);

// Atom to delete a trail
export const deleteTrailAtom = atom(
    null,
    async (get, set, { userId, trailId }) => {
        try {
            await axios.delete(`/api/trails/${userId}/${trailId}`);
            set(
                trailsAtom,
                get(trailsAtom).filter((trail) => trail._id !== trailId)
            );
            console.log("Deleted Trail ID from Atom:", trailId);
        } catch (error) {
            console.error("Error deleting trail", error);
        }
    }
);

// Atom to store feed
export const feedTrailsAtom = atom([]);

// Atom to get feed
export const fetchFeedTrailsAtom = atom(
    get => get(feedTrailsAtom),
    async (get, set, { page }) => {
        try {
            const response = await axios.get(`/api/trails?page=${page}&limit=10`); // Limit to 10 trails per page
            const { trails } = response.data;
            console.log("Fetched trails from backend:", trails);
            
            // This solves the duplicate trails issue
            const existingTrails = get(feedTrailsAtom);
            const uniqueTrails = trails.filter(trail => !existingTrails.some(existingTrail => existingTrail._id === trail._id));
            
            set(feedTrailsAtom, [...existingTrails, ...uniqueTrails]); // Append new unique trails to existing trails
        } catch (error) {
            console.error("Error fetching feed", error);
        }
    }
);
