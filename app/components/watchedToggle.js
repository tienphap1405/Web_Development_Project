import React, { useState } from "react";
import { AiOutlineEye, AiFillEye } from "react-icons/ai";
import { saveWatchedAnime, removeWatchedAnime } from "./WatchedList-Service";
import { useUserAuth } from "../authentication/auth-context";
export default function WatchedToggle({ anime, isWatched, onToggle }) {
  const { user } = useUserAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleToggle = async (event) => {
    event.stopPropagation(); 
    if (!user) {
      alert("You must be logged in to manage watched animes!");
      return;
    }

    setIsLoading(true);
    setError(null); 
    try {
      if (isWatched) {
        await removeWatchedAnime(user.uid, anime.id); 
      } else {
        await saveWatchedAnime(user.uid, anime); 
      }
      onToggle(!isWatched); 
    } catch (error) {
      console.error("Failed to toggle watched:", error);
      setError("An error occurred while saving your watched anime. Please try again.");
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
        aria-label={isWatched ? "Remove from watched anime" : "Add to watched anime"}
      >
        {isLoading ? (
          <span>Loading...</span> 
        ) : isWatched ? (
          <AiFillEye className="text-blue-300 text-2xl hover:text-gray-500" />
        ) : (
          <AiOutlineEye className="text-gray-500 text-2xl hover:text-blue-400" />
        )}
      </button>

      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </div>
  );
}
