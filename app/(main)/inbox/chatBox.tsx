"use client";

import SmileIcon from "@/app/components/posts/smileIcon";
import React, { useEffect, useRef, useState } from "react";
import { chat } from "../../../utils/Interfaces";
import Message from "./message";

interface WebSocketData {
	data: string;
}

interface ChatBox {
	recipient: string;
	selectedChat: string; // username
}

function chatBox({ recipient, selectedChat }: ChatBox) {
	const chatLogRef = useRef<HTMLDivElement>(null);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const [chatSocket, setChatSocket] = useState<WebSocket | null>(null);
	const [chats, setChats] = useState<chat[]>([]);
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

			const new_message: chat = data.message;
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
	}, [selectedChat]);

	useEffect(() => {
		if (!selectedChat) return;
		fetch(`/api/chat/${selectedChat}/load_messages/`).then((response) => {
			response.json().then((data) => {
				setChats(data.message_list);
				console.log("message_list = ", data.message_list);
			});
		});
	}, [selectedChat]);

	const handleSendMessage = () => {
		if (chatSocket && chatSocket.readyState === WebSocket.OPEN && message) {
			chatSocket.send(JSON.stringify({ message }));
			setMessage("");
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === "Enter") {
			handleSendMessage();
		}
	};

	useEffect(() => {
		if (chatLogRef.current) {
			chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
		}
	}, [chats]);

	useEffect(() => {
		if (textAreaRef && textAreaRef.current) {
			const lineHeight = parseFloat(
				getComputedStyle(textAreaRef.current).lineHeight
			);
			textAreaRef.current.style.maxHeight = lineHeight * 4 + "px";
			const scrollHeight = textAreaRef.current.scrollHeight;
			if (lineHeight * 4 >= scrollHeight)
				textAreaRef.current.style.height = scrollHeight + "px";
			else {
				textAreaRef.current.style.overflowY = "scroll";
			}
		}
	}, [message]);

	return (
		<>
			<div className="flex h-full w-full flex-col justify-between">
				{/* Render chat messages */}

				<div className="h-full overflow-y-auto" ref={chatLogRef}>
					{chats.map((chat, index) => {
						let prevTimestamp: Date;

						if (index === chats.length - 1)
							prevTimestamp = new Date(chats[index].timestamp);
						else
							prevTimestamp = new Date(
								chats[index + 1].timestamp
							);
						const currentTime = new Date(chat.timestamp);

						const DisplayDate =
							prevTimestamp.getDate() !== currentTime.getDate()
								? true
								: false;
						const DisplayTime =
							prevTimestamp.toLocaleString("en-IN", {
								day: "numeric",
								month: "short",
								year: "numeric",
								hour: "numeric",
								minute: "numeric",
							}) !==
							currentTime.toLocaleString("en-IN", {
								day: "numeric",
								month: "short",
								year: "numeric",
								hour: "numeric",
								minute: "numeric",
							})
								? true
								: index === chats.length - 1
								? true
								: false;

						return (
							<>
								{DisplayDate ? (
									<div className="m-3 flex w-full justify-center">
										<span className="text-xs text-secondryText">
											{currentTime.toLocaleString(
												"en-IN",
												{
													day: "numeric",
													month: "short",
													year: "numeric",
													hour: "numeric",
													minute: "numeric",
													hour12: true,
												}
											)}
										</span>
									</div>
								) : null}
								{chat.sender_username !== recipient ? (
									<Message
										chat={chat}
										position="right"
										key={chat.id}
										displayTime={DisplayTime}
									/>
								) : (
									<Message
										chat={chat}
										position="left"
										key={chat.id}
										displayTime={DisplayTime}
									/>
								)}
							</>
						);
					})}
				</div>

				{/* Input field to enter message */}
				<div>
					<div className="m-3 flex items-center justify-between gap-3 rounded-full p-3 outline outline-1 outline-border_grey">
						<div className="flex w-full items-center gap-3">
							<SmileIcon fill="white" width={25} height={25} />
							<textarea
								id="chat-message-input"
								className="w-full resize-none bg-transparent text-sm text-primaryText outline-none"
								onKeyDown={(e) => handleKeyDown(e)}
								onChange={(e) => {
									setMessage(e.target.value);
								}}
								value={message}
								placeholder="Message"
								rows={1}
								ref={textAreaRef}
								style={{ overflowY: "hidden" }}
							/>
						</div>
						{message ? (
							<button
								id="chat-message-submit"
								onClick={() => handleSendMessage()}
								className="text-sm font-bold text-blue-500"
							>
								Send
							</button>
						) : null}
					</div>
				</div>
			</div>
		</>
	);
}

export default chatBox;
