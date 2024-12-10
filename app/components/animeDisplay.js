import FavoriteToggle from "./favoriteToggle";

export default function AnimeDisplay({anime, setSelectedAnime, favorites, handleToggleFavorite}) {
    return (
        <div
            onClick={() => setSelectedAnime(anime)} 
            className="h-full relative border-2 border-neutral-200 p-2 pb-5 shadow-md rounded-lg transition ease-in-out delay-150 bg-neutral-100 hover:-translate-y-1 drop-shadow-2xl hover:scale-110 hover:bg-indigo-500 duration-300 hover:border-black cursor-pointer"
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
    );
}