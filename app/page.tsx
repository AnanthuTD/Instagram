"use client";
import SideBar from "./side_bar";
import Stories from "./stories";
import Login from "./login";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
// import { log } from "console";

export default function Home(userData: object) {
    const [user, setuser] = useState<string | undefined>(undefined);
    const [loding, setLoding] = useState(true)
    
    useEffect(() => {
        if(user)
            setLoding(false)
        let cookieuser = Cookies.get('user')
        setuser(cookieuser)
        const fetchUser = async () => {
            const response = await fetch("api/accounts/login/");
            const data = await response.json();
            setuser(data);
            Cookies.set("user", JSON.stringify(data));
        }

        if (!user) {
            fetchUser();
        }
    }, [user]);

    if(!user && loding) {
        return <div>Loding</div>
    }
    else if (user) {
        return (
            <main className="flex min-h-screen flex-row bg-black">
                <div className="w-1/6 p-5 border-r border-side_bar_border">
                    <SideBar />
                </div>
                <div className="w-5/6 p-5">
                    <Stories />
                </div>
            </main>
        );
    } else {
        return (
            <main className="bg-white flex min-h-screen flex-row justify-center">
                <Login setUser={setuser} />
            </main>
        );
    }
}
