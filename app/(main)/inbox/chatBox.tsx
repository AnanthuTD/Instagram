"use client";
import { OtherUserProfile } from "@/utils/Interfaces";
import { UUID } from "crypto";
import React, { useEffect, useRef, useState } from "react";

interface WebSocketData {
	data: string;
}

function chatBox({ recipient }: { recipient: string }) {
	const chatLogRef = useRef<HTMLTextAreaElement>(null);
	const [chatSocket, setChatSocket] = useState<WebSocket | null>(null);
	const [roomName, setRoomName] = useState<string>("");
	

	useEffect(() => {
		const socket = new WebSocket(
			`ws://localhost:8000/ws/chat/${recipient}/`
		);

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
		<>
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
			<input type="text" id="chat-message-input" className="text-black" />
			<button
				id="chat-message-submit"
				onClick={() => handleSendMessage()}
			>
				Send
			</button>
		</>
	);
}

export default chatBox;
