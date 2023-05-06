"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import StoriesPosts from "../components/home/Stories&Posts";
import Account_suggestion from "../components/right_pannel/accountSuggestion";
import { useUserContext } from "../components/context/userContext";

function page() {
	// context
	const { user, setUser } = useUserContext();

	// useState
	const [loading, setLoading] = useState(true);
	// const [signup, setSignup] = useState(false);

	// miscellaneous
	const router = useRouter();

	// Define an effect to handle user authentication
	useEffect(() => {
		if (user) {
			setLoading(false);
			// setSignup(false);
		}

		// Define a function to fetch the user from the backend API
		const fetchUser = async () => {
			const response = await fetch("api/accounts/login/");
			const data = await response.json();
			// Stop loading
			setLoading(false);
			if (data.status) {
				setUser(data.user);
			}
		};

		// If no user object is available, fetch the user from the API
		if (!user) fetchUser();
	}, [user]);

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

	if (loading) {
		return <div>Loding</div>;
	} else if (user) {
		return homeComponent;
	} else {
		router.push('/login')
	}
}

export default page;
