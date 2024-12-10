"use client";
import {useState, useEffect} from "react";
import AnimeList from "../components/animeList";
import NavigationBar from "../components/navigation-bar";
import Footer from "../components/footer";
import CategoryButton from "../components/category-button";
import {useSearchParams} from "next/navigation";

export default function Page() {
  const [category, setCategory] = useState("popular");

  // Get the sort parameter from the URL
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");
  
  const handleSetCategory = (category) => {
    setCategory(category);
  }

  useEffect(() => {
    if (sort && sort !== category) {
      setCategory(sort);
    }
  }, [sort]);
  // console.log(category);

  return (
    <main className="bg-cyan-600">
        <NavigationBar/>
        <section className="p-2 max-w-6xl mx-auto">
          <div className="pl-4">
            <h1 className="text-5xl text-sky-950 font-sans font-bold italic">Browse Anime</h1>
            <div className="flex items-center pt-5 space-x-3 w-full">
              <a className="py-2 pr-2 mb-4 font-semibold italic">Sorting by: </a>
              <CategoryButton name="Popular" prevCategory={category} newCategory={"popular"} handleSetCategory={handleSetCategory} longForm={true}/>
              <CategoryButton name="Trending" prevCategory={category} newCategory={"trending"} handleSetCategory={handleSetCategory} longForm={true}/>
              <CategoryButton name="New Releases" prevCategory={category} newCategory={"new"} handleSetCategory={handleSetCategory} longForm={true}/>
              <CategoryButton name="Highest Rated" prevCategory={category} newCategory={"score"} handleSetCategory={handleSetCategory} longForm={true}/>
            </div>
          </div>
          <AnimeList sort={category}/>
        </section>
        <Footer/>
    </main>
  );
}