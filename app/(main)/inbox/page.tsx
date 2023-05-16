"use client";
import CreateMessage from "../../components/message/create";
import DropDown from "../../components/message/dropdown";
import AccountMessage from "../../components/message/accountMessage";
import React, { useEffect, useRef, useState } from "react";
import ChatBox from "./chatBox";
import { useSearchParams } from "next/navigation";
import { OtherUserProfile } from "@/utils/Interfaces";

interface conversations {
	username: string;
	profile_img: URL;
	last_message: string;
}

function messages() {
	const searchParams = useSearchParams();
	const id_user = searchParams.get("id_user");

	const [profile, setProfile] = useState<OtherUserProfile | undefined>();
	const [conversations, setConversations] = useState<conversations[] | []>(
		[]
	);
	const [selectedChat, setSelectedChat] = useState("");

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

	useEffect(() => {
		if ((!profile && !id_user) || profile) {
			fetch("/api/chat/conversations/").then((response) => {
				response.json().then((response) => {
					setConversations(response.conversations);
					setSelectedChat(
						profile?.username || response.conversations[0].username
					);
				});
			});
		}
	}, [profile]);

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
					{conversations.map((user) => (
						<AccountMessage
							username={user.username}
							profile_img={user.profile_img}
							last_message={user.last_message}
							setSelectChat={setSelectedChat}
							width={60}
							height={60}
							key={user.username}
						/>
					))}
				</div>

				<div className="w-3/5">
					{selectedChat ? (
						<ChatBox
							recipient={selectedChat}
							selectedChat={selectedChat}
						/>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default messages;
