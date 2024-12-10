import Link from "next/link";

export default function Footer() {
    return ( 
            <footer className="flex flex-col bg-sky-950 p-6 text-white min-w-full justify-center items-center mt-16">
                <p className="font-sans text-center text-xl">My Anime Vault 2024</p>
                <p className="font-sans text-center text-lg">Developed by:</p>
                <div className="flex min-w-full justify-around">
                    <div className="flex flex-col">
                        <p className="font-sans italic text-lg text-center"> 
                            Simon Luna Patiarroy
                            <br/>
                            <Link href="https://github.com/LunaroySimon" className="hover:text-blue-300">https://github.com/LunaroySimon </Link>
                            </p>
                    </div>
                    <div className="flex flex-col">
                        <p className="font-sans italic text-lg text-center"> 
                            Tien Phap Nguyen <br/>
                            <Link href="https://github.com/tienphap1405" className="hover:text-blue-300">https://github.com/tienphap1405</Link>
                        </p>
                    </div>
                </div>
            </footer>
    ); 
}
