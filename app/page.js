import React from "react";
import NavigationBar from "./components/navigation-bar";
import Footer from "./components/footer";
import QuickView from "./components/quick-view";

export default function Home() {
  return (
    <main className="flex flex-col justify-center w-full h-full bg-cyan-600" >
      <NavigationBar/>  
      <section className="flex-col items-center justify-center w-full h-full">
        <QuickView name={"Trending"} category={"trending"}/>
        <QuickView name={"New Releases"} category={"new"}/>
        <QuickView name={"All Time Best"} category={"score"}/>
      </section>
      <Footer/>
    </main>
  );
}
