import React from "react";
import NavigationBar from "./components/navigation-bar";
import Footer from "./components/footer";

export default function Home() {
  return (
    <main className="flex flex-col justify-center w-full h-full bg-cyan-600" >
      <NavigationBar />  
      <section className="flex-col items-center justify-center w-full h-full">
        <h1 className="text-6xl text-white">Welcome to My Anime Vault</h1>
        <p className="text-2xl text-white">This is a place to store all your favorite anime</p>
      </section>
      <Footer />
    </main>
  );
}
