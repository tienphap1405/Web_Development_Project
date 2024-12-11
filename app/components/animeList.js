"use client";
import React, { useState, useEffect } from "react";
import { fetchAnime } from "../api/route";
import AnimeDetails from "./animeDetails";
import PreviousNextButtons from "./previous-next-buttons";
import AnimeDisplay from "./animeDisplay";

export default function AnimeList({sort = "popular", longForm = true, handleSetHidden}) {
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
      let perPage = 20;
      if (!longForm) {
        perPage = 5;
      } 
      let queryInput = "POPULAR_DESC";
      try {
        if (sort === "trending") {
          queryInput = "TRENDING_DESC";
        } else if (sort === "new") {
          queryInput = "START_DATE_DESC";
        } else if (sort === "score") {
          queryInput = "SCORE_DESC";
        } else {
          queryInput = "POPULARITY_DESC";
        }
        const animeData = await fetchAnime(page, perPage, queryInput);
        setAnimeList(animeData);
      } catch (err) {
        setError("Failed to fetch anime. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadAnime();
  }, [page, sort]); // Refetch when page changes or when sorting type changes

  const handleSetPage = (direction) => {
    setPage(direction);
  }

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
  
  const handleSetSelectedAnime = (anime) => {
    setSelectedAnime(anime);
    if (handleSetHidden) {
      handleSetHidden(false);
    }
  }

  const backToList = () => {
    setSelectedAnime(null); 
    if (handleSetHidden) {
      handleSetHidden(true);
    }
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
      />
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {/* Anime Grid */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6 p-4">
        {animeList.map((anime) => (
          <AnimeDisplay
            key={anime.id}
            anime={anime}
            handleSetSelectedAnime={handleSetSelectedAnime}
            favorites={favorites}
            handleToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>

      <PreviousNextButtons handleSetPage={handleSetPage} page={page} longForm={longForm} />
    </div>
  );
}
