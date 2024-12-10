import Link from "next/link";

export default function Footer() {
    return ( 
            <footer className="flex flex-col bg-sky-950 p-6 text-white min-w-full justify-center items-center mt-16">
                <p className="font-sans text-start">2024 My Anime Vault</p>
                <div className="flex min-w-full justify-around">
                    <div>
                        <p className="font-sans">Developed by <br/> Simon Luna Patiarroy & <br/> Tien Phap Nguyen</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="font-sans">Look at our GitHub!</p>
                        <Link href="https://github.com/LunaroySimon">https://github.com/LunaroySimon</Link>
                        <Link href="https://github.com/tienphap1405">https://github.com/tienphap1405</Link>
                    </div>
                </div>
            </footer>
    ); 
}
