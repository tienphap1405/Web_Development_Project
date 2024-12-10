import AnimeList from "./animeList";
import Link from "next/link";

export default function QuickView({name, sort}){
    return(
        <div className="mt-4 max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="ml-4 text-3xl font-sans font-bold text-sky-950">{name}</h1>
                <div className="mt-6 mr-4">
                    <Link href={{
                    pathname: 'animeList',
                    query:{sort}
                    }} 
                    className="text-yellow-500 font-sans font-semibold hover:underline">
                    See More...
                    </Link>
                </div>
            </div>
            <AnimeList sort={sort} longForm={false}/>
        </div>
    );
}
