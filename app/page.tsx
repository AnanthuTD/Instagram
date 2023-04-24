// Import necessary components and libraries
"use client";
import SideBar from "./side_bar";
import Stories from "./components/stories/stories";
import Login from "./login";
import Signup from "./signup";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Account_suggestion from "./components/right_pannel/accountSuggestion";
import Profile from "./menu/profile";
import Create from "./menu/create";
import Messages from "./menu/messages";
import Notifications from "./menu/notifications";
import Search from "./menu/search";
import Explore from "./menu/explore";
import Reels from "./menu/reels";

// Define a type for the menu state
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

// Define the Home component
export default function Home() {
	// Define state variables
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

	// Define an effect to handle user authentication
	useEffect(() => {
		// If a user object is available, set the user cookie and stop loading
		if (user) {
			console.log("user true");
			Cookies.set("user", JSON.stringify(user));
			setLoading(false);
			setSignup(false);
		} else {
			// If no user object is available, try to get the user cookie
			let cookieuser: object | undefined = undefined;
			const userCookie = Cookies.get("user");

			if (userCookie !== undefined) {
				try {
					cookieuser = JSON.parse(userCookie);
				} catch (error) {
					cookieuser = undefined;
				}
			}

			// Set the user state variable to the cookie user object
			setuser(cookieuser);
		}

		// Stop loading
		setLoading(false);

		// Define a function to fetch the user from the backend API
		const fetchUser = async () => {
			const response = await fetch("api/accounts/login/");
			const data = await response.json();
			if (data.status) {
				setuser(data.user);
				Cookies.set("user", JSON.stringify(data.user));
			}
		};

		// If no user object is available, fetch the user from the API
		if (!user) {
			fetchUser();
		}
	}, [user]);

	// Define the Home component's content
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

	// Render different content depending on the authentication and menu state
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
				{menu.create ? <Create /> : null}
				{menu.explore ? <Explore /> : null}
				{menu.messages ? <Messages /> : null}
				{menu.notifications ? <Notifications /> : null}
				{menu.reels ? <Reels /> : null}
				{menu.search ? <Search /> : null}
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
