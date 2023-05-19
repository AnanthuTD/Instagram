import React, { useState } from "react";
import { chat } from "../../../utils/Interfaces";
import OptionsPopUp from "./optionsPopUp";
import { fetchCSRF } from "@/utils/fetch_csrf";

function Message({
	position = "right",
	chat,
	displayTime = true,
}: {
	position?: "right" | "left";
	chat: chat;
	displayTime?: boolean;
}) {
	const [options, setOptions] = useState(false);
	const [unmounted, setUnmounted] = useState(false); // State to track if the component should be unmounted

	function getTime(timestamp: Date): React.ReactNode {
		const date = new Date(timestamp);
		return date.toLocaleString("en-IN", {
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		});
	}

	const handleUnsend = async () => {
		const csrfToken = await fetchCSRF();
		fetch("/api/chat/unsend/", {
			method: "DELETE",
			headers: { "X-csrfToken": csrfToken },
			body: JSON.stringify({ id: chat.id }),
		}).then((response) =>
			response.json().then((response) => {
				if (response.status) {
					setOptions(false);
					setUnmounted(true); // Update the state to indicate that the component should be unmounted
				} else {
					alert("Cannot unsend");
				}
			})
		);
	};

	if (unmounted) {
		return null; // Return null to effectively unmount the component
	}

	let classParent=''
	let classChild=''
	if(position==='right'){
		classParent = 'flex-row-reverse'
		classChild = 'items-end'
	}

	return (
		<div
			className={["flex h-fit w-full", classParent].join(" ")}
			onMouseOver={() => setOptions(true)}
			onMouseOut={() => setOptions(false)}
		>
			{/* Message Content */}
			<div className={["m-3 mt-0 flex h-fit w-fit max-w-1/2 flex-col",classChild].join(" ")}>
				<div className="flex w-fit rounded-full px-3 py-2 outline outline-1 outline-border_grey">
					<span
						className="text-md break-normal text-primaryText"
						style={{ overflowWrap: "anywhere" }}
					>
						{chat.message}
					</span>
				</div>
				{displayTime ? (
					<div className="mt-3 flex w-full flex-row-reverse pr-3">
						<span className="h-fit w-fit text-xs text-secondryText">
							{getTime(chat.timestamp)}
						</span>
					</div>
				) : null}
			</div>

			{/* Options Pop-up */}
			{options && (
				<OptionsPopUp>
					<button onClick={handleUnsend}>Unsend</button>
				</OptionsPopUp>
			)}
		</div>
	);
}

export default Message;
