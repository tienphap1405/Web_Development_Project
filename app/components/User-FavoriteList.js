"use client";
import { useState, useEffect } from "react";
import { fetchFavorites, removeFavorite } from "./FavoriteList-Service";
import { useUserAuth } from "../authentication/auth-context";
import FavoriteToggle from "./favoriteToggle";
import AnimeReviews from "./animeReviews";



export default function FavoritesPage() {
  const { user } = useUserAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnime, setSelectedAnime] = useState(null);

  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const userFavorites = await fetchFavorites(user.uid);
        setFavorites(userFavorites);
      } catch (err) {
        console.error("Failed to load favorites:", err);
        setError("Failed to load favorites. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [user, selectedAnime]);

  const backToList = () => {
    setSelectedAnime(null);
  };

  const handleToggleFavorite = async (animeId) => {
    if (!user) return;

    try {
      await removeFavorite(user.uid, animeId);
      setFavorites((prevFavorites) =>
        prevFavorites.filter((anime) => anime.animeId !== animeId)
      );
    } catch (err) {
      console.error("Failed to remove favorite:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
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
      <AnimeReviews
        user={user}
        anime={selectedAnime}
        onBack={backToList}
      />
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Your Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6 p-4">
        {favorites.map((anime) => (
          <div
            key={anime.animeId}
            onClick={() => setSelectedAnime(anime)}
            className="relative border-2 border-neutral-200 p-2 pb-5 shadow-md rounded-lg transition ease-in-out delay-150 bg-neutral-100 hover:-translate-y-1 drop-shadow-2xl hover:scale-110 hover:bg-indigo-500 duration-300 hover:border-black cursor-pointer"
          >
            <img
              src={anime.animeImage}
              alt={anime.animeTitle}
              className="rounded-t-lg w-full h-5/6"
            />
            <p className="mt-2 text-md text-black text-center text-wrap md:text-balance line-clamp-2 min-h-10">
              {anime.animeTitle}
            </p>
            
            <FavoriteToggle
              anime={anime}
              isFavorite={true}
              onToggle={() => handleToggleFavorite(anime.animeId)}
            />
            
          </div>
        ))}
      </div>
    </div>
  );
}
