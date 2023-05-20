import React, { useEffect, useRef, useState } from "react";
import { chat } from "../../../utils/Interfaces";
import OptionsPopUp from "./optionsPopUp";
import { fetchCSRF } from "@/utils/fetch_csrf";

function Message({
	position = "right",
	chat,
	displayTime = true,
	topNoneRounded,
}: {
	position?: "right" | "left";
	chat: chat;
	displayTime?: boolean;
	topNoneRounded: boolean;
}) {
	const [options, setOptions] = useState(false);
	const [unmounted, setUnmounted] = useState(false); // State to track if the component should be unmounted
	const messageContainerRef = useRef<HTMLDivElement | undefined>();
	const messageChildContainerRef = useRef<HTMLDivElement | undefined>();
	const roundedDivRef = useRef<HTMLDivElement | undefined>();
	const [rounded, setRounded] = useState("rounded-full");
	const [popupHeight, setPopupHeight] = useState("");

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

	let classParent = "";
	let classChild = "";
	if (position === "right") {
		classParent = "flex-row-reverse";
		classChild = "items-end";
	}
	let roundedEnd = "";
	if (!displayTime) {
		if(position === "right")roundedEnd = "rounded-ee-none"
		else roundedEnd = "rounded-es-none";
	}
	if (topNoneRounded) {
		if(position === "right")
		roundedEnd = "rounded-se-none";
		else roundedEnd = "rounded-ss-none";
	}

	useEffect(() => {
		if (
			messageContainerRef &&
			messageContainerRef.current &&
			messageChildContainerRef &&
			messageChildContainerRef.current &&
			roundedDivRef &&
			roundedDivRef.current
		) {
			let maxWidth =
				parseFloat(
					getComputedStyle(messageContainerRef.current).width
				) / 2;
			let currentWidth = parseFloat(
				getComputedStyle(messageChildContainerRef.current).width
			);
			if (maxWidth === currentWidth) {
				setRounded("rounded-3xl");
			}
			setPopupHeight(getComputedStyle(roundedDivRef.current).height);
		}
	}, []);

	return (
		<div
			className={["my-2 flex h-fit w-full", classParent].join(" ")}
			onMouseOver={() => setOptions(true)}
			onMouseOut={() => setOptions(false)}
			ref={messageContainerRef as React.RefObject<HTMLDivElement>}
		>
			{/* Message Content */}
			<div
				className={[
					"mt-0 flex h-fit w-fit max-w-1/2 flex-col",
					classChild,
				].join(" ")}
				ref={messageChildContainerRef as React.RefObject<HTMLDivElement>}
			>
				<div
					className={[
						"mx-3 flex w-fit max-w-full px-3 py-2 outline outline-1 outline-border_grey",
						rounded,
						roundedEnd,
					].join(" ")}
					ref={roundedDivRef as React.RefObject<HTMLDivElement>}
				>
					<div
						className={[
							"text-md break-normal text-primaryText",
							
						].join(" ")}
						style={{ overflowWrap: "anywhere" }}
					>
						<p>{chat.message}</p>
					</div>
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
			{options ? (
				<OptionsPopUp height={popupHeight}>
					<button onClick={handleUnsend}>Unsend</button>
				</OptionsPopUp>
			) : null}
		</div>
	);
}

export default Message;
