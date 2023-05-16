"use client";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
interface AccountMessageProps {
	width: number;
	height: number;
	profile_img: URL;
	username: string;
	last_message?: string;
	setSelectChat: Dispatch<SetStateAction<string>>;
}
function AccountMessage({
	width = 40,
	height = 40,
	profile_img,
	username,
	last_message,
	setSelectChat,
}: AccountMessageProps) {
	return (
		<>
			<div
				className="flex my-3 cursor-pointer items-center m-4"
				onClick={() => {
					setSelectChat(username);
				}}
			>
				<Image
					priority={true}
					src={"/api" + profile_img}
					width={width}
					height={height}
					alt=""
					className="rounded-full"
				/>

				<div style={{ height: "fit-content" }} onClick={() => null}>
					<p className="flex items-center mx-4 text-sm text-primaryText">
						{username}
					</p>
					<p
						className="flex items-center mx-4 text-sm "
						style={{ color: "rgb(168 168 168)" }}
					>
						{last_message}
					</p>
				</div>
			</div>
		</>
	);
}

export default AccountMessage;
