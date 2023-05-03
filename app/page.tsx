"use client";

import MenuBar from "./components/home/menu";
import Login from "./components/authentications/login";
import Signup from "./components/authentications/signup";
import { useState, useEffect } from "react";
import Account_suggestion from "./components/right_pannel/accountSuggestion";
import Profile from "./components/menu/profile";
import StoriesPosts from "./components/home/Stories&Posts";
import { UserContext } from "./context/userContext";
import { UserState, MenuState } from "./utils/Interfaces";
import Create from "./components/menu/create";
import Explore from "./components/menu/explore";
import Messages from "./components/menu/messages";
import Notifications from "./components/menu/notifications";
import Reels from "./components/menu/reels";
import Search from "./components/menu/search";

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
		if (user) {
			setLoading(false);
			setSignup(false);
		}

		// Stop loading
		setLoading(false);

		// Define a function to fetch the user from the backend API
		const fetchUser = async () => {
			const response = await fetch("api/accounts/login/");
			const data = await response.json();
			if (data.status) {
				setuser(data.user);
			}
		};

		// If no user object is available, fetch the user from the API
		if (!user) fetchUser();
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
						<MenuBar menu={menu} setMenu={setMenu} />
					</div>
					<div className="w-5/6 flex p-5">
						{menu.home ? homeComponent : null}
						{menu.profile ? <Profile /> : null}
						{menu.create ? (
							<Create setMenu={setMenu} menu={menu} />
						) : null}
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
				<Signup setUser={setuser} setSignup={setSignup} />
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
