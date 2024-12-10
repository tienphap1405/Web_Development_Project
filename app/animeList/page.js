import React from "react";
import AnimeList from "./animeList";
import NavigationBar from "../components/navigation-bar";
import Footer from "../components/footer";

export default function Page() {
  return (
    <main className="bg-cyan-600">
        <NavigationBar/>
        <section className="p-4 max-w-6xl mx-auto">
          <AnimeList/>
        </section>
        <Footer/>
    </main>
  );
}