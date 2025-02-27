import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigate from react-router-dom
import { useAtom } from "jotai"; // Import Jotai
import { testAtom } from "../../atoms/testAtom"; // Import testAtom for user data
import { toast } from "react-hot-toast";
import axios from "axios";
import Trails from "./Trail/Trail"; // Import Trails component
import Search from "./Trail/Search"; // Import Search component

// TrailCard component that displays a trail's image, name, and other details.
const TrailCard = (props) => {
	const navigate = useNavigate();
	const [user] = useAtom(testAtom); // Retrieve user data from testAtom
	const trailId = props.id;
	const trailIMG = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${encodeURIComponent(
		trailId
	)}&key=YOUR_API_KEY`;

	const [averageRating, setAverageRating] = useState(0);
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		console.log("User from testAtom in TrailCard:", user); // Debug log for user data
		loadTrailReviewRating();
	}, [user]);

	const handleClick = () => {
		// Navigate to the individual trail page
		const trailID = props.id;
		console.log("Navigating to trail ID:", trailID); // Debug log
		navigate(`/trail/${trailID}`, { state: { trailId: trailID } });
	};

	const addToList = async (listName) => {
		console.log("addToList called with listName:", listName); // Debug log for listName
		if (!user || !user._id) {
			console.error("User ID is missing");
			toast.error("Please log in to add trails to your list."); // If user is not logged in, populate toast error message
			return;
		}

		console.log("User ID being used:", user._id); // Debug log for user ID

		try {
			const response = await fetch(
				"https://trail-realm-backend.vercel.app/api/trails/add-to-list",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						userId: user._id, // Use user._id from testAtom
						trail: {
							id: props.id,
							name: props.name,
							location: props.location,
							image: props.image,
							distance: props.distance,
						},
						listName,
					}),
				}
			);

			console.log("Request sent to server"); // Debug log for request status

			const data = await response.json();
			console.log("Response from server:", data); // Debug log for response

			if (response.ok) {
				console.log(data.message); // Successful message
			} else {
				console.error("Failed to add trail to list:", data.message); // Error message
			}
		} catch (error) {
			console.error("Failed to add trail to list:", error); // Catch block for network or other errors
		}
		navigate("/trail-list"); // Navigate to the trail list page
	};

	const loadTrailReviewRating = async () => {
		try {
			const response = await axios.get(
				`https://trail-realm-backend.vercel.app/review/get-reviews?trailId=${trailId}`
			);
			if (response.status === 200) {
				setReviews(response.data.reviews);
				// calculate the average rating
				const totalRating = response.data.reviews.reduce(
					(acc, review) => acc + review.rating,
					0
				);
				let avgRating = totalRating / response.data.reviews.length;
				avgRating = avgRating % 1 === 0 ? avgRating.toFixed(0) : avgRating.toFixed(1);
				console.log("Average rating:", avgRating);
				setAverageRating(avgRating);
			} else if (response.status === 404) {
				console.error("No reviews found for this trail");
			} else {
				console.error("Failed to load reviews");
			}
		} catch (error) {
			console.error("Error fetching reviews:", error);
		}
	};

	return (
		<div>
			<div className="trail-card-container">
				{/* Set trail cover image */}
				<div onClick={handleClick} style={{ cursor: "pointer" }}>
					<div className="trail-img">
						<img
							src={trailIMG || "./icons/NO_COVER.jpeg"}
							alt={props.name || "No name available"}
						/>
					</div>
				</div>{" "}
				{/* onclick Container */}
				{/* Name and location */}
				<div className="trail-desc">
					<div onClick={handleClick} style={{ cursor: "pointer" }}>
						<h2>{props.name}</h2>
						<h3>Location: {props.location}</h3>
					</div>{" "}
					{/* onclick Container */}
					{/* Added star icons for rating */}
					<div className="star-rating">
						<link
							rel="stylesheet"
							href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
						/>
						<div className="star-rating-container">
							{/* Dynamically display checked stars based on the average rating */}
							{Array.from({ length: 5 }, (_, index) => (
								<span
									key={index}
									className={`fa fa-star ${index < Math.floor(averageRating) ? "checked" : ""}`}
								></span>
							))}

							{/* Display the average rating and number of reviews */}
							<p
								class 
