"use client";
import CreateMessage from "../../components/message/create";
import DropDown from "../../components/message/dropdown";
import AccountMessage from "../../components/message/accountMessage";
import React, { useEffect, useRef, useState } from "react";
import ChatBox from "./chatBox";
import { useSearchParams } from "next/navigation";
import { OtherUserProfile } from "@/utils/Interfaces";


function messages() {
	const searchParams = useSearchParams();
	const id_user = searchParams.get("id_user");

	const [profile, setProfile] = useState<OtherUserProfile | undefined>();

	useEffect(() => {
		async function fetchProfile() {
			const Response = await fetch(
				`/api/accounts/get_profile/${id_user}/`
			);
			let data = await Response.json();
			if (data.status) setProfile(data.profile);
		}
		if (id_user) fetchProfile();
	}, []);

	return (
		<div className="w-full flex justify-center bg-_grey p-5">
			<div className="w-3/5 rounded bg-black flex border border-border_grey">
				<div className="w-2/5 border-r border-border_grey">
					{/* top */}
					<div className="w-full flex border-b border-border_grey">
						<div className="w-1/6"></div>
						<div className="flex w-4/6 justify-center gap-1 p-4 font-bold">
							<span>username</span>
							<DropDown className="" stroke="white" />
						</div>
						<div className="w-1/6 flex items-center">
							<CreateMessage
								stroke="white"
								className="cursor-pointer"
							/>
						</div>
					</div>
					{/* users */}
					<AccountMessage width={60} height={60} />
				</div>

				<div className="w-3/5">
					{profile?.username ? <ChatBox recipient={profile?.username} /> : null}
				</div>
			</div>
		</div>
	);
}

export default messages;
