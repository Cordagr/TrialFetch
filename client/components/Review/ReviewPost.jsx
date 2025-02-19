import { useAtom } from "jotai";
import { testAtom } from "../../atoms/testAtom";
import { createReviewAtom } from "../../atoms/reviewsAtom";
import { useState } from "react";
import Modal from "../IconModal/IconModal";
import { useEffect } from "react";
import { atom } from "jotai";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./HomePosts.css";

// Define atoms to store review data
const trailNameAtom = atom(localStorage.getItem("trailName") || "");
const ratingAtom = atom(localStorage.getItem("rating") || "");
const reviewContentAtom = atom(localStorage.getItem("reviewContent") || "");

function HomePost() {
	// Get user id and create a review atom
	const [user, setUser] = useAtom(testAtom);
	const [, createReview] = useAtom(createReviewAtom);
	const navigate = useNavigate();

	// Local state to store the values
	const [trailName, setTrailName] = useAtom(trailNameAtom);
	const [rating, setRating] = useAtom(ratingAtom);
	const [reviewContent, setReviewContent] = useAtom(reviewContentAtom);

	// Update local storage whenever the review data changes
	useEffect(() => {
		localStorage.setItem("trailName", trailName);
		localStorage.setItem("rating", rating);
		localStorage.setItem("reviewContent", reviewContent);
	}, [trailName, rating, reviewContent]);

	// Handle changes
	const handleTrailNameChange = (e) => {
		setTrailName(e.target.value);
	};
	const handleRatingChange = (e) => {
		setRating(e.target.value);
	};
	const handleReviewContentChange = (e) => {
		setReviewContent(e.target.value);
	};

	// Handle submit button
	const handleSubmit = async (e) => {
		if (!reviewContent.trim()) {
			toast.error("Review content cannot be empty");
			return;
		}
		if (!trailName.trim()) {
			toast.error("Trail name cannot be empty");
			return;
		}
		if (!rating.trim()) {
			toast.error("Rating cannot be empty");
			return;
		}
		e.preventDefault();
		if (user && user._id) {
			try {
				const newReview = { trailName, rating, reviewContent };
				await createReview({ userId: user._id, ...newReview });
				// Update user reviews in local storage
				const updatedUser = { ...user, reviews: [...user.reviews, newReview] };
				setUser(updatedUser);
				localStorage.setItem("user", JSON.stringify(updatedUser));
				// Clear the form after submission
				setTrailName("");
				setRating("");
				setReviewContent("");
				// Navigate to the dashboard page
				navigate("/dashboard");
			} catch (error) {
				console.error("Error creating review:", error);
			}
		} else {
			console.error("User not found");
		}
	};

	// Modal
	const [showModal, setShowModal] = useState(false);
	const handleOpenModal = () => {
		setShowModal(true);
	};
	const handleCloseModal = () => {
		setShowModal(false);
	};

	return (
		<>
			<div className="home-card-review">
				<button className="importbook-btn" onClick={handleOpenModal}>
					Review
				</button>
				<input
					type="text"
					className="reviews-input"
					placeholder="Write your review here..."
					value={reviewContent}
					onChange={handleReviewContentChange}
				/>
				<div className="reviews-btn-container">
					<button className="reviews-btn" onClick={handleSubmit}>
						Submit Review
					</button>
				</div>
			</div>

			<Modal show={showModal} onClose={handleCloseModal}>
				<div className="importmodal-container">
					<input
						type="text"
						placeholder="Trail Name"
						value={trailName}
						onChange={handleTrailNameChange}
					/>
					<input
						type="text"
						placeholder="Rating"
						value={rating}
						onChange={handleRatingChange}
					/>

					<div className="modal-btn-wrapper">
						<button className="modal-cancel-btn" onClick={handleCloseModal}>
							Cancel
						</button>
						<button className="modal-update-btn" onClick={handleCloseModal}>
							Update
						</button>
					</div>
				</div>
			</Modal>
		</>
	);
}

export default HomePost;
