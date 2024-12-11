import ReviewForm from "./reviewForm";

const AnimeReviews = ({user, anime, onBack}) => {


    return (
        <div className="rounded-lg mt-4">
            <button 
                onClick={onBack}
                className="mb-4 px-3 py-1 rounded-full bg-amber-500 hover:bg-blue-300 text-white transition duration-0 md:duration-150"
            >
                {'<'}
            </button>
            <div className="flex flex-col md:flex-row items-center md:items-start">
                <img
                src={anime.animeImage}
                alt={anime.animeTitle}
                className="w-64 h-auto rounded-lg shadow-lg"
                />
                <div className="mt-4 md:mt-0 md:ml-8">
                    <h2 className="text-2xl font-bold">{anime.animeTitle}</h2>
                    <ReviewForm user={user} anime={anime}/>
                </div>
            </div>
        </div>
  );
};

export default AnimeReviews;
