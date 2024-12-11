"use client";

import Link from "next/link";
import { useUserAuth } from "../authentication/auth-context";

export default function NavigationBar() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const login = async () => {
    await gitHubSignIn();
  };

  const logout = async () => {
    await firebaseSignOut();
  };

  return (
    <div className="flex justify-center bg-sky-950 p-6 text-white min-w-full mb-8">
      <div className="flex w-2/3 justify-between items-center">
        <Link
          href="/"
          className="flex text-2xl font-bold font-sans text-amber-500"
        >
          <img src="../favicon.ico" alt="logo Image" className="h-9 w-9 mr-2" />
          My Anime Vault
        </Link>
        <div className="flex space-x-10">
          <Link href="/" className="hover:underline font-sans text-blue-300">
            Home
          </Link>
          <Link
            href="/animeList"
            className="hover:underline font-sans text-blue-300"
          >
            Anime List
          </Link>
          <Link href="/UserVault" className="hover:underline font-sans text-blue-300">
            My Vault
          </Link>
        </div>
        <div className="flex items-center justify-center">
          {user ? (
            <button
              onClick={logout}
              className="flex items-center hover:underline font-sans font-semibold text-blue-300"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={login}
              className="flex items-center hover:underline font-sans font-semibold text-amber-500"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
