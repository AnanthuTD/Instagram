"use client";
import CreateMessage from "./_components/create";
import DropDown from "./_components/dropdown";
import AccountMessage from "./_components/accountMessage";
import React, { useEffect, useRef, useState } from "react";
import ChatBox from "./_components/chatBox";
import { useSearchParams } from "next/navigation";
import { OtherUserProfile } from "@/utils/Interfaces";
import { useUserContext } from "@/app/components/context/userContext";
import ArrowLeft from "@/app/components/icons/ArrowLeft";
import axios from "@/axios";

interface conversations {
	username: string;
	profile_img: URL;
	last_message: string;
}

function Messages() {
	const searchParams = useSearchParams();
	const id_user = searchParams.get("id_user");

	// context
	const { user } = useUserContext();

	const [profile, setProfile] = useState<OtherUserProfile | undefined>();
	const [conversations, setConversations] = useState<conversations[] | []>([]);
	const [selectedChat, setSelectedChat] = useState("");

	const conversationsRef = useRef<HTMLDivElement>(null);
	const chatsRef = useRef<HTMLDivElement>(null);
	const boxRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		async function fetchProfile() {
			try {
				const response = await axios.get(
					`/api/accounts/get_profile/${id_user}/`
				);
				const data = response.data;

				if (data.status) {
					setProfile(data.profile);
				}
			} catch (error) {
				console.error("Error during Axios request:", error);
				// Handle the error here
			}
		}

		if (id_user) {
			fetchProfile();
		}
	}, [id_user]);

	useEffect(() => {
		if (profile) {
			setConversations([
				{
					username: profile.username,
					profile_img: profile.profile_img,
					last_message: "",
				},
			]);
		}
		if ((!profile && !id_user) || profile) {
			axios
				.get("/api/chat/conversations/")
				.then((response: { data: any; }) => {
					const responseData = response.data;
					let temp_conversations = responseData.conversations;
					let found_index = temp_conversations.findIndex(
						(conversation: { username: any; }) => conversation.username === profile?.username
					);
					if (found_index !== -1) {
						let found_conversation = temp_conversations[found_index];
						temp_conversations.splice(found_index, 1);
						setConversations([found_conversation, ...temp_conversations]);
					} else {
						setConversations((prevConversation) => [
							...prevConversation,
							...temp_conversations,
						]);
					}
					setSelectedChat(
						profile?.username || responseData.conversations[0]?.username
					);
				})
				.catch((error: any) => {
					console.error("Error during Axios request:", error);
					// Handle the error here
				});
		}
	}, [profile]);

	useEffect(() => {
		function updateContentHeight() {
			if (
				!boxRef.current?.clientHeight ||
				!titleRef.current?.clientHeight ||
				!contentRef.current?.clientHeight
			)
				return;
			contentRef.current.style.height = `${
				boxRef.current.clientHeight - titleRef.current.clientHeight
			}px`;
			observer.observe(boxRef.current);
		}

		if (!boxRef.current?.clientHeight) return;
		const observer = new ResizeObserver((entries) => {
			updateContentHeight();
		});

		observer.observe(boxRef.current);

		window.addEventListener("resize", updateContentHeight);

		// Cleanup function to disconnect the observer
		return () => {
			observer.disconnect();
		};
	}, [contentRef.current]); // trigger useEffect when this exist

	function updateVisibility() {
		if (!chatsRef.current || !conversationsRef.current) return;
		if (getComputedStyle(chatsRef.current).display === "none") {
			chatsRef.current.style.display = "block";
			conversationsRef.current.style.display = "none";
		}
	}

	function handleBack() {
		if (!conversationsRef.current) return;

		if (conversationsRef.current.style.display !== "none") {
			history.back();
		} else if (
			chatsRef.current &&
			getComputedStyle(chatsRef.current).display !== "none"
		) {
			chatsRef.current.style.display = "none";
			conversationsRef.current.style.display = "block";
		}
	}

	useEffect(() => {
		window.addEventListener("resize", updateVisibility);
	}, []);

	return (
		<div
			className="relative flex w-full flex-col overflow-hidden rounded bg-black"
			ref={boxRef}>
			{/* top */}
			<div className="flex border-b border-border_grey" ref={titleRef}>
				<div className="flex w-1/6 items-center justify-center">
					{/* <Link href={"/inbox"} className="lg:hidden"> */}
					<ArrowLeft className="lg:hidden" onClick={handleBack} />{" "}
					{/* </Link> */}
				</div>
				<div className="flex w-4/6 justify-center gap-1 p-4 font-bold">
					<span>{user?.username}</span>
					<DropDown className="" stroke="white" />
				</div>
				<div className="flex w-1/6 items-center">
					<CreateMessage stroke="white" className="cursor-pointer" />
				</div>
			</div>
			<div className="flex" ref={contentRef}>
				<div
					className="w-full border-r border-border_grey lg:w-2/5"
					ref={conversationsRef}>
					{/* users */}
					<div className="h-full overflow-y-auto">
						{conversations.map((user: { username: React.Key | null | undefined; profile_img: URL; last_message: string | undefined; }, index: any) => (
							<>
								<AccountMessage
									username={user.username}
									profile_img={user.profile_img}
									last_message={user.last_message}
									setSelectChat={setSelectedChat}
									width={60}
									height={60}
									key={user.username}
									onClick={updateVisibility}
								/>
							</>
						))}
					</div>
				</div>

				<div className="hidden h-full w-full lg:block lg:w-3/5" ref={chatsRef}>
					{selectedChat ? <ChatBox recipient={selectedChat} /> : null}
				</div>
			</div>
		</div>
	);
}

export default Messages;
