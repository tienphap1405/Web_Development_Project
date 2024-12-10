import AnimeList from "./animeList";

export default function QuickView({name, category}){
    return(
        <div className="p-4 max-w-6xl mx-auto">
            <h1 className="text-6xl text-white">{name}</h1>
            <AnimeList category={category} longForm={false}/>
        </div>
    );
}
