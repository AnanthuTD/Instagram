// Import necessary components and libraries
"use client";
import SideBar from "./side_bar";
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
import StoriesPosts from "./Stories&Posts";
import { UserContext } from "./context/userContext";
import { UserState, MenuState } from "./Interfaces";


// Define the Home component
export default function Home() {
	// Define state variables
	const [user, setuser] = useState<UserState | undefined>(undefined);
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
			let cookieuser: UserState | undefined = undefined;
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
			<div className="w-3/5 p-5 flex justify-end">
				<StoriesPosts />
			</div>
			<div className="w-2/5 p-5">
				<Account_suggestion />
			</div>
		</>
	);

	// Render different content depending on the authentication and menu state
	if (!user && loading) {
		return <div>Loding</div>;
	} else if (user) {
		return (
			<UserContext.Provider value={user}>
				<main className="flex min-h-screen flex-row bg-black h-full">
					<div className="w-1/6 p-5 border-r border-side_bar_border justify-between flex-col flex">
						<SideBar menu={menu} setMenu={setMenu} />
					</div>
					<div className="w-5/6 flex p-5">
						{menu.home ? homeComponent : null}
						{menu.profile ? <Profile /> : null}
						{menu.create ? <Create setMenu={setMenu} menu={menu}/> : null}
						{menu.explore ? <Explore /> : null}
						{menu.messages ? <Messages /> : null}
						{menu.notifications ? <Notifications /> : null}
						{menu.reels ? <Reels /> : null}
						{menu.search ? <Search /> : null}
					</div>
				</main>
			</UserContext.Provider>
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
