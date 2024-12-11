import FavoriteToggle from "./favoriteToggle";

export default function AnimeDisplay({anime, handleSetSelectedAnime, favorites, handleToggleFavorite}) {
    return (
        <div
            onClick={() => handleSetSelectedAnime(anime)} 
            className="relative border-2 border-neutral-200 p-2 pb-5 shadow-md rounded-lg transition ease-in-out delay-150 bg-neutral-100 hover:-translate-y-1 drop-shadow-2xl hover:scale-110 hover:bg-indigo-500 duration-300 hover:border-black cursor-pointer"
        >

            <img
              src={anime.coverImage.large}
              alt={anime.title.romaji}
              className="rounded-t-lg w-full h-5/6"
            />

            <p className="mt-2 text-md text-black text-center text-wrap md:text-balance line-clamp-2 min-h-10">
              {anime.title.english || anime.title.romaji}
            </p>

            <FavoriteToggle
            anime={anime}
            isFavorite={favorites.has(anime.id)}
            onToggle={(isFavorite) => handleToggleFavorite(anime.id, isFavorite)}
            />
          </div>
    );
}