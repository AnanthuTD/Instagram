"use client";
import CreateMessage from "../../components/message/create";
import DropDown from "../../components/message/dropdown";
import AccountMessage from "../../components/message/accountMessage";
import React, { useEffect, useRef, useState } from "react";

/* interface ChatMessage {
	message: string;
} */

interface WebSocketData {
	data: string
}

function messages() {
	const chatLogRef = useRef<HTMLTextAreaElement>(null);
	const [chatSocket, setChatSocket] = useState<WebSocket | null>(null);
	const [roomName, setRoomName] = useState<string>("");

	useEffect(() => {
		// Get the room name from the server
		/* fetch("/api/get_room_name")
			.then((response) => response.json())
			.then((data) => setRoomName(data.roomName)); */

		// Connect to the chat room WebSocket server
		const socket = new WebSocket(`ws://localhost:8000/ws/chat/testRoom/`);

		// Set the WebSocket object to the state
		setChatSocket(socket);

		// Listen for incoming messages from the server
		socket.addEventListener("message", (event: WebSocketData) => {
			const data = JSON.parse(event.data);
			const message = data.message;
			console.log(data);
			
			if (chatLogRef.current) {
				chatLogRef.current.value += `${message}\n`;
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

	const handleSendMessage = () => {
		const messageInput = document.querySelector(
			"#chat-message-input"
		) as HTMLInputElement;
		const message = messageInput.value;
		if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
			chatSocket.send(JSON.stringify({ message }));
			messageInput.value = "";
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleSendMessage();
		}
	};
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
					{/* Render chat messages */}
					<textarea
						id="chat-log"
						rows={10}
						cols={50}
						readOnly
						className="text-black"
						ref={chatLogRef}
					></textarea>

					{/* Input field to enter message */}
					<input
						type="text"
						id="chat-message-input"
						className="text-black"
					/>
					<button
						id="chat-message-submit"
						onClick={() => handleSendMessage()}
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
}

export default messages;
