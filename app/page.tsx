"use client";
import SideBar from "./side_bar";
import Stories from "./components/stories/stories";
import Login from "./login";
import Signup from "./signup";
import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import Account_suggestion from "./components/right_pannel/accountSuggestion";
import Profile from "./menu/profile";

interface MenuState {
    home: boolean;
	profile: boolean;
	create: boolean;
	search: boolean;
	explore: boolean;
	messages: boolean;
	notifications: boolean;
	reels: boolean;
  }

export default function Home(userData: object) {
	const [user, setuser] = useState<object | undefined>(undefined);
	const [loading, setLoading] = useState(true);
	const [signup, setSignup] = useState(false);
	const [menu, setMenu] = useState<MenuState>({
        home: true,
        profile: false,
        create: false,
        search: false,
        explore: false,
        messages: false,
        notifications: false,
        reels: false,
      });

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

	let homeComponent = (
		<>
			<div className="w-3/6 p-5 flex justify-end">
				<Stories />
			</div>
			<div className="w-2/6 p-5">
				<Account_suggestion />
			</div>
		</>
	);

    useEffect(() => {
        console.log(menu);
        
    }, [menu])
    

	if (!user && loading) {
		return <div>Loding</div>;
	} else if (user) {
		return (
			<main className="flex min-h-screen flex-row bg-black">
				<div className="w-1/6 p-5 border-r border-side_bar_border">
					<SideBar menu={menu} setMenu={setMenu} />
				</div>
				{menu.home ? homeComponent : null}
				{menu.profile ? <Profile /> : null}
                
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
