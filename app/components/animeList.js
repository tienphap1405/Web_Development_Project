"use client";
import React, { useState, useEffect } from "react";
import { fetchAnime } from "../api/route";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; 

export default function AnimeList() {
  const [animeList, setAnimeList] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    const loadAnime = async () => {
      setLoading(true);
      setError(null);
      try {
        const animeData = await fetchAnime(page, 10); 
        setAnimeList(animeData);
      } catch (err) {
        setError("Failed to fetch anime. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadAnime();
  }, [page]); 

  // Toggle favorite status
  const toggleFavorite = (animeId) => {
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

  // Pagination handlers
  const handleNextPage = () => setPage((prevPage) => prevPage + 1); // Increment page
  const handlePreviousPage = () =>
    setPage((prevPage) => Math.max(prevPage - 1, 1)); // Decrement page, minimum 1

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

  return (
    <div>
      {/* Anime Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6 p-4">
        {animeList.map((anime) => (
            <div
            key={anime.id}
            className="relative border-2 border-neutral-200 p-2 shadow-md rounded-lg transition ease-in-out delay-150 bg-neutral-100 hover:-translate-y-1 drop-shadow-2xl hover:scale-110 hover:bg-indigo-500 ease-in-out duration-300 hover:border-black"
            >
            {/* Anime Image */}
            <img
                src={anime.coverImage.large}
                alt={anime.title.romaji}
                className="rounded-t-lg w-full h-5/6"
            />
            
            {/* Anime Title */}
            <p className="mt-2 text-lg text-black text-center">
                {anime.title.english || anime.title.romaji}
            </p>
            
            {/* Favorite Icon */}
            <div
                className="absolute bottom-2 right-2 cursor-pointer"
                onClick={() => toggleFavorite(anime.id)}
            >
                {favorites.has(anime.id) ? (
                <AiFillHeart className="text-red-500 text-2xl" />
                ) : (
                <AiOutlineHeart className="text-gray-500 text-2xl" />
                )}
            </div>
            </div>

        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1} // Disable "Previous" button on first page
          className={`px-4 py-2 rounded-lg ${
            page === 1 ? "bg-gray-300" : "bg-indigo-500 hover:bg-indigo-700"
          } text-white`}
        >
          Previous
        </button>
        <p className="text-lg font-semibold">Page {page}</p>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-700 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}
