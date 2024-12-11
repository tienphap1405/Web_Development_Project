"use client";
import NavigationBar from "../components/navigation-bar";
import Footer from "../components/footer";
import UserVault from "../components/User-Vault-management";
export default function Page() {

  return (
    <main className="bg-cyan-600">
        <NavigationBar/>
        <section className="p-4 max-w-6xl mx-auto">
          <UserVault/>
        </section>
        <Footer/>
    </main>
  );
}