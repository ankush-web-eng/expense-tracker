import { useSession } from "next-auth/react";
import DarkModeSwitch from "./ui/DarkModeSwitch";

export default function Navbar () {

    const {data: session} = useSession();
    const username = session?.user?.username;
    return (
        <div className=" flex py-1 pt-4 md:pt-8 md:pb-12 pb-6 justify-between items-center">
            <div className="px-2 flex">
                {/* <img src="" alt="User" /> */}
                <span className="font-extrabold text-3xl font-serif">{username}</span>
            </div>
            <div className="flex justify-center md:mx-5 px-2"><DarkModeSwitch /></div>
        </div>
    )
}