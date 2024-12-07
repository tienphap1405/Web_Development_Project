import React from "react";
import AnimeList from "./components/animeList";
export default function Home() {
  return (
    <main className="bg-white">
        <section className="p-4 max-w-6xl mx-auto border-2 ">
          <AnimeList/>
        </section>
    </main>
  );
}
