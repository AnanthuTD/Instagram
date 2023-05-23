import React, { useEffect, useRef, useState } from "react";
import SmileIcon from "@/app/components/posts/smileIcon";
import Message from "./message";
import { chat } from "../../../utils/Interfaces";

interface WebSocketData {
	data: string;
}

interface ChatBoxProps {
	recipient: string;
	selectedChat: string; // username
}

function ChatBox({ recipient, selectedChat }: ChatBoxProps) {
	const chatLogRef = useRef<HTMLDivElement>(null);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const [chatSocket, setChatSocket] = useState<WebSocket | null>(null);
	const [chats, setChats] = useState<chat[]>([]);
	const [message, setMessage] = useState("");

	useEffect(() => {
		const socket = new WebSocket(
			`ws://localhost:8000/ws/chat/${recipient}/`
		);

		setChatSocket(socket);

		socket.addEventListener("message", (event: WebSocketData) => {
			const data = JSON.parse(event.data);
			if (data.hasOwnProperty("status")) return;

			const newMessage: chat = data.message;
			setChats((prevChats) => [...prevChats, newMessage]);

			if (chatLogRef.current) {
				chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
			}
		});

		socket.addEventListener("close", () => {
			console.error("Chat socket closed unexpectedly");
		});

		return () => {
			socket.close();
		};
	}, [selectedChat]);

	useEffect(() => {
		if (!selectedChat) return;
		fetch(`/api/chat/${selectedChat}/load_messages/`)
			.then((response) => response.json())
			.then((data) => {
				setChats(data.message_list);
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
			if (lineHeight * 4 >= scrollHeight) {
				textAreaRef.current.style.height = scrollHeight + "px";
			} else {
				textAreaRef.current.style.overflowY = "scroll";
			}
		}
	}, [message]);

	const shouldDisplayDate = (currentTimestamp: Date, nextTimestamp: Date) => {
		return nextTimestamp.getDate() !== currentTimestamp.getDate();
	};

	const shouldDisplayTime = (
		currentTimestamp: Date,
		nextTimestamp: Date,
		index: number
	) => {
		const currentTimestampString = currentTimestamp.toLocaleString(
			"en-IN",
			{
				day: "numeric",
				month: "short",
				year: "numeric",
				hour: "numeric",
				minute: "numeric",
			}
		);

		const nextTimestampString = nextTimestamp.toLocaleString("en-IN", {
			day: "numeric",
			month: "short",
			year: "numeric",
			hour: "numeric",
			minute: "numeric",
		});

		return (
			currentTimestampString !== nextTimestampString ||
			index === chats.length - 1
		);
	};

	const shouldRoundTopNone = (
		prevTimestamp: Date,
		currentTimestamp: Date,
		prevMessageSenderUsername: string,
		currentMessageSenderUsername: string
	) => {
		const prevTimestampString = prevTimestamp.toLocaleString("en-IN", {
			day: "numeric",
			month: "short",
			year: "numeric",
			hour: "numeric",
			minute: "numeric",
		});

		const currentTimestampString = currentTimestamp.toLocaleString(
			"en-IN",
			{
				day: "numeric",
				month: "short",
				year: "numeric",
				hour: "numeric",
				minute: "numeric",
			}
		);

		return (
			prevTimestampString === currentTimestampString &&
			prevMessageSenderUsername === currentMessageSenderUsername
		);
	};

	return (
		<div className="flex h-full w-full flex-col justify-between">
			<div className="h-full overflow-y-auto" ref={chatLogRef}>
				{chats.map((chat, index) => {
					const currentTime = new Date(chat.timestamp);

					let prevMessage: chat;
					let nextMessage: chat;

					if (index > 0) {
						prevMessage = chats[index - 1];
					} else {
						prevMessage = chat;
					}

					if (index === chats.length - 1) {
						nextMessage = chat;
					} else {
						nextMessage = chats[index + 1];
					}

					const prevTimestamp = new Date(prevMessage.timestamp);
					const nextTimestamp = new Date(nextMessage.timestamp);

					const displayDate = shouldDisplayDate(
						currentTime,
						nextTimestamp
					);
					const displayTime = shouldDisplayTime(
						currentTime,
						nextTimestamp,
						index
					);
					const topNoneRounded = shouldRoundTopNone(
						prevTimestamp,
						currentTime,
						prevMessage.sender_username,
						chat.sender_username
					);

					return (
						<React.Fragment key={chat.id}>
							{displayDate && (
								<div className="m-3 flex w-full justify-center">
									<span className="text-secondaryText text-xs">
										{currentTime.toLocaleString("en-IN", {
											day: "numeric",
											month: "short",
											year: "numeric",
											hour: "numeric",
											minute: "numeric",
											hour12: true,
										})}
									</span>
								</div>
							)}
							<Message
								chat={chat}
								position={
									chat.sender_username === recipient
										? "left"
										: "right"
								}
								key={chat.id}
								displayTime={displayTime}
								topNoneRounded={topNoneRounded}
							/>
						</React.Fragment>
					);
				})}
			</div>

			<div>
				<div className="m-3 flex items-center justify-between gap-3 rounded-full p-3 outline outline-1 outline-border_grey">
					<div className="flex w-full items-center gap-3">
						<SmileIcon fill="white" width={25} height={25} />
						<textarea
							id="chat-message-input"
							className="w-full resize-none bg-transparent text-sm text-primaryText outline-none"
							onKeyDown={handleKeyDown}
							onChange={(e) => setMessage(e.target.value)}
							value={message}
							placeholder="Message"
							rows={1}
							ref={textAreaRef}
							style={{ overflowY: "hidden" }}
						/>
					</div>
					{message && (
						<button
							id="chat-message-submit"
							onClick={handleSendMessage}
							className="text-sm font-bold text-blue-500"
						>
							Send
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default ChatBox;
