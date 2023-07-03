import React from "react";
import ChatBox from "../../_components/chatBox";

export default function Page({ params }: { params: { username: string } }) {
	const { username } = params;
	return (
		<>
			<ChatBox recipient={username}/>
		</>
	);
}
