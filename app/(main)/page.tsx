"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StoriesPosts from "../components/home/Stories&Posts";
import Account_suggestion from "../components/right_pannel/accountSuggestion";
import { useUserContext } from "../components/context/userContext";

function Page() {
	// context
	const { user, setUser } = useUserContext();

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
