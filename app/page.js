import React from "react";
import AnimeList from "./components/animeList";
export default function Home() {
  return (
    <main className="bg-white">
        <section className="p-4 max-w-6xl mx-auto">
          <div className=" bg-violet-800 text-white mb-3 rounded-t-lg border-black border-2">
            <h1 className="p-5">Anime List</h1>
          </div>
          <AnimeList/>
        </section>
    </main>
  );
}
