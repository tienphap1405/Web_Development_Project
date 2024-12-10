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
        const animeData = await fetchAnime(page, 10); 
        setAnimeList(animeData);
      } catch (err) {
        setError("Failed to fetch anime. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadAnime();
  }, [page]); // Refetch when page changes

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

  const backToList = () => {
    setSelectedAnime(null); 
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

    <div className="flex flex-col justify-center items-center">
      {/* Anime Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6 p-4">
        {animeList.map((anime) => (
          <div
            key={anime.id}
            onClick={() => setSelectedAnime(anime)} 
            className="relative border-2 border-neutral-200 p-2 pb-5 shadow-md rounded-lg transition ease-in-out delay-150 bg-neutral-100 hover:-translate-y-1 drop-shadow-2xl hover:scale-110 hover:bg-indigo-500 duration-300 hover:border-black cursor-pointer"
          >

            <img
              src={anime.coverImage.large}
              alt={anime.title.romaji}
              className="rounded-t-lg w-full h-5/6"
            />

            <p className="mt-2 text-md text-black text-center text-wrap md:text-balance">
              {anime.title.english || anime.title.romaji}
            </p>

            <FavoriteToggle
              isFavorite={favorites.has(anime.id)}
              onToggle={(e) => {
                e.stopPropagation();
                handleToggleFavorite(anime.id);
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4 w-1/2">
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1} 
          className={`px-4 py-2 rounded-lg ${
            page === 1 ? "bg-gray-300 font-normal text-white" : "bg-yellow-500 hover:bg-amber-500"
          } text-black font-semibold`}
        >
          Previous
        </button>
        <p className="text-lg font-semibold">Page {page}</p>
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-amber-500 font-semibold text-black"
        >
          Next
        </button>
      </div>
    </div>
  );
}
