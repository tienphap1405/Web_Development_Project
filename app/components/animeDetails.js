import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const AnimeDetails = ({ anime, onBack}) => {
  const plainTextDescription = anime.description.replace(/<\/?[^>]+(>|$)/g, "");
  return (
    <div className=" rounded-lg">
      <button 
        onClick={onBack}
        className="mb-4 px-3 py-1 rounded-full bg-amber-500 hover:bg-blue-300 text-white transition duration-0 md:duration-150"
      >
        {'<'}
      </button>
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <img
          src={anime.coverImage.large}
          alt={anime.title.romaji}
          className="w-64 h-auto rounded-lg shadow-lg"
        />
        <div className="mt-4 md:mt-0 md:ml-8">
          <h2 className="text-2xl font-bold">{anime.title.romaji}</h2>
          <h3 className="text-xl text-black mt-2">{anime.title.english}</h3>
          <p className="mt-4 text-black">{plainTextDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;
