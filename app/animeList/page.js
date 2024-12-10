"use client";
import {useState} from "react";
import AnimeList from "../components/animeList";
import NavigationBar from "../components/navigation-bar";
import Footer from "../components/footer";
import CategoryButton from "../components/category-button";

export default function Page() {
  const [category, setCategory] = useState("popular");

  const handleSetCategory = (category) => {
    setCategory(category);
  }


  return (
    <main className="bg-cyan-600">
        <NavigationBar/>
        <section className="p-4 max-w-6xl mx-auto">
          <h1 className="text-6xl text-white">Anime List</h1>
          <p className="text-white">sorting by... {category}</p>
          <div className="flex items-center pt-5 space-x-3">
            <CategoryButton name="Popular" category={"popular"} handleSetCategory={handleSetCategory} longForm={true}/>
            <CategoryButton name="Trending" category={"trending"} handleSetCategory={handleSetCategory} longForm={true}/>
            <CategoryButton name="New Releases" category={"new"} handleSetCategory={handleSetCategory} longForm={true}/>
            <CategoryButton name="All Time Best" category={"score"} handleSetCategory={handleSetCategory} longForm={true}/>
          </div>
          <AnimeList sort={category}/>
        </section>
        <Footer/>
    </main>
  );
}