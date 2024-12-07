import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function FavoriteToggle({isFavorite, onToggle}){
    return(
        <div onClick={onToggle} className="cursor-pointer">
            {isFavorite? (
                <AiFillHeart className="text-red-500 text-2xl"/>
            ):
            (
                <AiFillHeart className="text-black text-2xl"/>
            )
        }
        </div>
    )
}