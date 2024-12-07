"use client";
import React, { useState, useEffect } from "react";
import { fetchAnime } from "../api/route";
import FavoriteToggle from "./favoriteToggle";
import AnimeDetails from "./animeDetails";

export default function AnimeList() {
  const [animeList, setAnimeList] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [page, setPage] = useState(1); 
  const [favorites, setFavorites] = useState(new Set()); 
  const [selectedAnime, setSelectedAnime] = useState(null);

  useEffect(() => {
    const loadAnime = async () => {
      setLoading(true);
      setError(null);
      try {
        const animeData = await fetchAnime(page, 10); // Fetch data for current page
        setAnimeList(animeData);
      } catch (err) {
        setError("Failed to fetch anime. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadAnime();
  }, [page]); // Refetch when page changes

  // Update favorite status
  const handleToggleFavorite = async (animeId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = new Set(prevFavorites);
      if (updatedFavorites.has(animeId)) {
        updatedFavorites.delete(animeId); 
      } else {
        updatedFavorites.add(animeId); 
      }
      return updatedFavorites;
    });
  };
  // Back to list handler
  const backToList = () => {
    setSelectedAnime(null); // Reset selected anime
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
            viewBox="0 0 100 101"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Spinner paths */}
          </svg>
          <span className="sr-only">Loading anime...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-4">
        <p>{error}</p>
      </div>
    );
  }

  if (selectedAnime) {
    return (
      <AnimeDetails
        anime={selectedAnime}
        onBack={backToList}
        toggleFavorite={handleToggleFavorite}
        isFavorite={favorites.has(selectedAnime.id)}
      />
    );
  }

  return (

    <div>
      {/* Anime Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6 p-4">
        {animeList.map((anime) => (
          <div
            key={anime.id}
            onClick={() => setSelectedAnime(anime)} // Show details on click
            className="relative border-2 border-neutral-200 p-2 pb-5 shadow-md rounded-lg transition ease-in-out delay-150 bg-neutral-100 hover:-translate-y-1 drop-shadow-2xl hover:scale-110 hover:bg-indigo-500 ease-in-out duration-300 hover:border-black cursor-pointer"
          >
            {/* Anime Image */}
            <img
              src={anime.coverImage.large}
              alt={anime.title.romaji}
              className="rounded-t-lg w-full h-5/6"
            />
            {/* Anime Title */}
            <p className="mt-2 text-md text-black text-center text-wrap md:text-balance">
              {anime.title.english || anime.title.romaji}
            </p>
            {/* Favorite Icon */}
            <FavoriteToggle
              isFavorite={favorites.has(anime.id)}
              onToggle={(e) => {
                e.stopPropagation(); // Prevent triggering the card click
                handleToggleFavorite(anime.id);
              }}
            />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1} // Disable "Previous" button on first page
          className={`px-4 py-2 rounded-lg ${
            page === 1 ? "bg-gray-300" : "bg-indigo-500 hover:bg-indigo-700"
          } text-white`}
        >
          Previous
        </button>
        <p className="text-lg font-semibold">Page {page}</p>
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-700 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}
