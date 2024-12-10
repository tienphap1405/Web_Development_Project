import AnimeList from "./animeList";
import Link from "next/link";

export default function QuickView({name, category}){
    return(
        <div className="p-4 max-w-6xl mx-auto">
            <h1 className="text-6xl text-white">{name}</h1>
            <div className="flex justify-end w-full">
                <Link href={{
                pathname: 'animeList',
                query:`category=${category}`}} 
                className="text-white">
                See More...
                </Link>
            </div>
            <AnimeList category={category} longForm={false}/>
        </div>
    );
}
