import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { saveFavorite, removeFavorite } from "./FavoriteList-Service";
import { useUserAuth } from "../authentication/auth-context";

export default function FavoriteToggle({ anime, isFavorite, onToggle }) {
  const { user } = useUserAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleToggle = async (event) => {
    event.stopPropagation(); 
    if (!user) {
      alert("You must be logged in to manage favorites!");
      return;
    }

    setIsLoading(true);
    setError(null); 
    try {
      if (isFavorite) {
        await removeFavorite(user.uid, anime.id); 
      } else {
        await saveFavorite(user.uid, anime); 
      }
      onToggle(!isFavorite); 
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
      setError("An error occurred while saving your favorite. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={(event) => handleToggle(event)}
        className="cursor-pointer"
        disabled={isLoading}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isLoading ? (
          <span>Loading...</span> 
        ) : isFavorite ? (
          <AiFillHeart className="text-red-500 text-2xl hover:text-gray-500" />
        ) : (
          <AiOutlineHeart className="text-gray-500 text-2xl hover:text-red-500" />
        )}
      </button>

      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </div>
  );
}
