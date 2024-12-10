import AnimeList from "./animeList";
import Link from "next/link";

export default function QuickView({name, sort}){
    return(
        <div className="mt-4 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mt-10">
                <h1 className="ml-4 text-4xl font-sans font-bold text-sky-950 italic">{name}</h1>
                <div className="mt-6 mr-4">
                    <Link href={{
                    pathname: 'animeList',
                    query:{sort}
                    }} 
                    className="flex text-yellow-500 text-lg font-sans font-semibold hover:underline">
                    View {name}...
                    </Link>
                </div>
            </div>
            <AnimeList sort={sort} longForm={false}/>
        </div>
    );
}
