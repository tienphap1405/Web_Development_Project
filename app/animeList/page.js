"use client";
import AnimeList from "../components/animeList";
import NavigationBar from "../components/navigation-bar";
import Footer from "../components/footer";

export default function Page() {

  return (
    <main className="bg-cyan-600">
        <NavigationBar/>
        <section className="p-4 max-w-6xl mx-auto">
          <button className="bg-cyan-500 text-white font-bold py-2 px-4 rounded mb-4">Trending</button>
          <button className="bg-cyan-500 text-white font-bold py-2 px-4 rounded mb-4">New Releases</button>
          <button className="bg-cyan-500 text-white font-bold py-2 px-4 rounded mb-4">Most Popular</button>
          <AnimeList/>
        </section>
        <Footer/>
    </main>
  );
}