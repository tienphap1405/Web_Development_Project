import Link from "next/link";

export default function NavigationBar({loggedIn = false}) {

    return (
        <div className="flex justify-center bg-sky-950 p-6 text-white min-w-full">
            <div className="flex w-2/3 justify-between items-center">
                <Link href="/" className="flex text-2xl font-bold font-sans text-amber-500"><img src="../favicon.ico" alt="logo Image" className="h-9 w-9 mr-2" /> My Anime Vault</Link>
                <div className="flex space-x-10">
                    <Link href="/" className="hover:underline font-sans text-blue-300">Home</Link>
                    <Link href="/animeList" className="hover:underline font-sans text-blue-300">Anime List</Link>
                    <Link href="/favorites" className="hover:underline font-sans text-blue-300">Favorites</Link>
                </div>
                <div className="flex items-center justify-center">
                    {loggedIn ? ( 
                        <button className="flex items-center hover:underline font-sans font-semibold text-blue-300">{/*Potential user profile image here  <img src="../favicon.ico" alt="logo Image" className="w-9 h-9 mr-2"/> */}Logout</button>
                    ) : (
                        <button className="flex items-center hover:underline font-sans font-semibold text-blue-300">Login</button>
                    )}
                </div>
            </div>
        </div>
    );
}

