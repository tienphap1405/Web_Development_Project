"use client";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { db, doc, setDoc, collection, updateDoc } from "firebase/firestore";


export default function ReviewForm({ anime, user }) {
    const [review, setReview] = useState(anime.animeReview);
    const [rating, setRating] = useState(anime.animeRating);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const updateReviewAndRating = async (userId, review, rating) => {
    
        const favoriteRef = doc(db, `users/${userId}/favorites`, `${anime.animeId}`);

        try {
        // Update the review and rating in the existing document
        await updateDoc(favoriteRef, {
            animeId: anime.id,
            animeTitle: anime.title.english || anime.title.romaji,
            animeImage: anime.coverImage.large,
            animeReview: review,
            animeRating: rating,
            createdAt: new Date(),
          });
    
        console.log("Review and rating updated successfully.");
        } catch (error) {
        console.error("Failed to update review and rating:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Submitting review:", review);
        console.log("Submitting rating:", rating);
        console.log("Submitting userID:", user.uid);
        console.log("Submitting animeID:", anime.animeId);

        if (!user) return;
        if (submitting) return;

        setSubmitting(true);
        setError(null);

        try {
        await updateReviewAndRating(user.uid, review, rating );
        setReview("");
        setRating(0);
        } catch (err) {
        console.error("Failed to add review:", err);
        setError("Failed to add review. Please try again.");
        } finally {
        setSubmitting(false);
        }
    };

    return (
        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        <label className="text-white">
            Review
        </label>
        <textarea
            id="review"
            className="p-2 mb-4 bg-gray-200 rounded text-black"
            value={review}
            onChange={(e) => setReview(e.target.value)}
        />
        <label className="text-white">
            Rating
        </label>
            <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                    key={star}
                    className={`text-2xl cursor-pointer ${
                    rating >= star ? "text-yellow-500" : "text-gray-300"
                    }`}
                    onClick={() => setRating(star)}
                />
                ))}
            </div>
        <button
            type="submit"
            className="p-2 bg-blue-300 text-white rounded"
            disabled={submitting}
        >
            {submitting ? "Submitting..." : "Submit"}
        </button>
        {error && <div className="text-red-500">{error}</div>}
        </form>
    );
}