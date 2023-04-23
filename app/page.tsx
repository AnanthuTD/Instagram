"use client";
import SideBar from "./side_bar";
import Stories from "./stories";
import Login from "./login";
import Signup from "./signup/page";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Account_suggestion from "./components/accountSuggestion";

export default function Home(userData: object) {
    const [user, setuser] = useState<object | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [signup, setSignup] = useState(false);

    useEffect(() => {
        if (user) {
            console.log("user true");
            Cookies.set("user", JSON.stringify(user));
            setLoading(false);
            setSignup(false);
        } else {
            let cookieuser: object | undefined = undefined;
            const userCookie = Cookies.get("user");

            if (userCookie !== undefined) {
                try {
                    cookieuser = JSON.parse(userCookie);
                } catch (error) {
                    cookieuser = undefined;
                }
            }

            setuser(cookieuser);
        }

        setLoading(false);

        const fetchUser = async () => {
            const response = await fetch("api/accounts/login/");
            const data = await response.json();
            if (data.status) {
                setuser(data.user);
                Cookies.set("user", JSON.stringify(data.user));
            }
        };

        if (!user) {
            fetchUser();
        }
    }, [user]);

    if (!user && loading) {
        return <div>Loding</div>;
    } else if (user) {
        return (
            <main className="flex min-h-screen flex-row bg-black">
                <div className="w-1/6 p-5 border-r border-side_bar_border">
                    <SideBar />
                </div>
                <div className="w-3/6 p-5">
                    <Stories />
                </div>
                <div className="w-2/6 p-5">
                    <Account_suggestion />
                </div>
            </main>
        );
    } else if (signup) {
        return (
            <main className="bg-white flex min-h-screen flex-row justify-center">
                <Signup setUser={setuser} />
            </main>
        );
    } else {
        return (
            <main className="bg-white flex min-h-screen flex-row justify-center">
                <Login setUser={setuser} setSignup={setSignup} />
            </main>
        );
    }
}
