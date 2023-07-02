"use client";

import React from "react";
import StoriesPosts from "./_home/Stories&Posts";
import Account_suggestion from "./_home/right_pannel/accountSuggestion";
import { useUserContext } from "@/app/components/context/userContext";

function Page() {
	// context
	const { user } = useUserContext();

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

	if (user) {
		return homeComponent;
	} else return null;
}

export default Page;
