import { useState, useEffect } from "react";
import { fetchFavorites, removeFavorite } from "./FavoriteList-Service";
import { useUserAuth } from "../authentication/auth-context";
import FavoriteToggle from "./favoriteToggle";
import WatchedToggle from "./watchedToggle";
import { fetchWatched, removeWatchedAnime } from "./WatchedList-Service";
import AnimeReviews from "./animeReviews";


export default function UserVault() {
  const { user } = useUserAuth();
  const [favorites, setFavorites] = useState([]);
  const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [selectedAnime, setSelectedAnime] = useState(null);


  // Fetch favorites
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
  
  useEffect(() => {
    const loadWatched = async () => {
      if (!user) {
        setWatched([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {

        const fetchedWatched = await fetchWatched(user.uid); 
        setWatched(fetchedWatched); 
      } catch (err) {
        console.error("Failed to load watched anime:", err);
        setError("Failed to load watched anime. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadWatched();
  }, [user]);

  // Toggle Favorite
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

  // Toggle Watched
const handleToggleWatched = async (animeId) => {
  if (!user) {
    console.error("No user found");
    return;
  }

  if (!animeId) {
    console.error("Invalid animeId:", animeId);
    return;
  }

  console.log(`Removing watched anime with ID: ${animeId}`);

  try {
    await removeWatchedAnime(user.uid, animeId);
    setWatched((prevWatched) =>
      prevWatched.filter((anime) => anime.animeId !== animeId)
    );
  } catch (err) {
    console.error("Failed to remove watched anime:", err);
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
    <>
      {/* Watched List */}
      <div>
        <h1 className="text-2xl font-bold text-center mb-6">Have Watched</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6 p-4">
          {watched.map((anime) => (
            <div
              key={anime.animeId}
              // onClick={() => setSelectedAnime(anime)}
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

              <WatchedToggle
                anime={anime}
                isWatched={watched.some((item) => item.animeId === anime.animeId)} 
                onToggle={() => handleToggleWatched(anime.animeId)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Favorites List */}
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
                isFavorite={favorites.some((item) => item.animeId === anime.animeId)} 
                onToggle={() => handleToggleFavorite(anime.animeId)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
