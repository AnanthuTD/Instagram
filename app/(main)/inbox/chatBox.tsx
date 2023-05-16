"use client";

import React, { useEffect, useRef, useState } from "react";
import messages from "./page";

interface WebSocketData {
	data: string;
}

interface ChatBox {
	recipient: string;
	selectedChat: string; // username
}

interface chats {
	message: string;
	timestamp: string;
	sender_username: string;
}

function chatBox({ recipient, selectedChat }: ChatBox) {
	const chatLogRef = useRef<HTMLDivElement>(null);
	const [chatSocket, setChatSocket] = useState<WebSocket | null>(null);
	const [roomName, setRoomName] = useState<string>("");
	const [chats, setChats] = useState<chats[]>([]);
	const [message, setMessage] = useState("");

	useEffect(() => {
		const socket = new WebSocket(
			`ws://localhost:8000/ws/chat/${recipient}/`
		);

		// Set the WebSocket object to the state
		setChatSocket(socket);

		// Listen for incoming messages from the server
		socket.addEventListener("message", (event: WebSocketData) => {
			const data = JSON.parse(event.data);
			if (data.hasOwnProperty("status")) return;

			const new_message: chats = data.message;
			setChats((prevChats) => [...prevChats, new_message]);

			if (chatLogRef.current) {
				chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
			}
		});

		// Log an error if the WebSocket connection is closed
		socket.addEventListener("close", () => {
			console.error("Chat socket closed unexpectedly");
		});

		return () => {
			// Close the WebSocket connection when the component unmounts
			socket.close();
		};
	}, [roomName]);

	useEffect(() => {
		if (!selectedChat) return;
		fetch(`/api/chat/${selectedChat}/load_messages/`).then((response) => {
			response.json().then((data) => {
				setChats(data.message_list);
				// console.log("message_list = ", data.message_list);
			});
		});
	}, [selectedChat]);

	const handleSendMessage = () => {
		if (chatSocket && chatSocket.readyState === WebSocket.OPEN && message) {
			chatSocket.send(JSON.stringify({ message }));
			setMessage("");
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleSendMessage();
		}
	};

	function getTime(timestamp: string): React.ReactNode {
		const date = new Date(timestamp);
		return date.toLocaleString("en-IN", {
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		});
	}

	useEffect(() => {
		if (chatLogRef.current) {
			chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
		}
	}, [chats]);

	return (
		<>
			<div className="h-full w-full flex flex-col justify-between">
				{/* Render chat messages */}

				<div className="h-full overflow-y-auto" ref={chatLogRef}>
					{chats.map((chat) => {
						return (
							<>
								{chat.sender_username === recipient ? (
									<div className="w-full h-fit flex flex-row-reverse">
										<div className="h-fit w-fit m-3">
											<div className="rounded-full outline outline-1 outline-border_grey w-fit flex mb-3">
												<div className="py-3 px-4 w-fit">
													<span className="text-primaryText">
														{chat.message}
													</span>
												</div>
											</div>
											<div className="flex flex-row-reverse pr-3 w-full">
												<span className="text-xs text-secondryText h-fit w-fit">
													{getTime(chat.timestamp)}
												</span>
											</div>
										</div>
									</div>
								) : (
									<div className="w-full h-fit flex">
										<div className="h-fit w-fit m-3">
											<div className="rounded-full outline outline-1 outline-border_grey w-fit flex mb-3">
												<div className="py-3 px-4 w-fit">
													<span className="text-primaryText">
														{chat.message}
													</span>
												</div>
											</div>
											<div className="flex flex-row-reverse pr-3 w-full">
												<span className="text-xs text-secondryText h-fit w-fit">
													{getTime(chat.timestamp)}
												</span>
											</div>
										</div>
									</div>
								)}
							</>
						);
					})}
				</div>

				{/* Input field to enter message */}
				<div>
					<input
						type="text"
						id="chat-message-input"
						className="text-black"
						onKeyDown={(e) => handleKeyDown(e)}
						onChange={(e) => setMessage(e.target.value)}
						value={message}
					/>
					<button
						id="chat-message-submit"
						onClick={() => handleSendMessage()}
					>
						Send
					</button>
				</div>
			</div>
		</>
	);
}

export default chatBox;
