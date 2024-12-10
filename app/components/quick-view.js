import AnimeList from "./animeList";

export default function QuickView(){
    return(
        <div className="">
            <section className="p-4 max-w-6xl mx-auto">
                <h1 className="text-6xl text-white">Trending</h1>
                <AnimeList category={"trending"} longForm={false}/>
            </section>
            <section className="p-4 max-w-6xl mx-auto">
                <h1 className="text-6xl text-white">New Releases</h1>
                <AnimeList category={"new"} longForm={false}/>
            </section>
            <section className="p-4 max-w-6xl mx-auto">
                <h1 className="text-6xl text-white">All Time Popular</h1>
                <AnimeList category={"score"} longForm={false}/>
            </section>
        </div>
    );
}
