"use client";
import Image from "next/image";
import React from "react";
import BrightBlueButton from "../right_pannel/brightBlueButton";
interface AccountProps {
	width?: number;
	height?: number;
	user: {
		username: string;
		first_name: string;
		last_name: string;
	};
}
function Account({ width = 40, height = 40, user }: AccountProps) {
	return (
		<>
			<div className="flex my-3 cursor-pointer items-center m-4 justify-between">
				<div className="flex">
					<Image
						src="/images/pro-pic.jpg"
						width={width}
						height={height}
						alt=""
						className="rounded-full"
					/>

					<div style={{ height: "fit-content" }} onClick={() => null}>
						<p className="flex items-center mx-4 text-sm text-primaryText">
							{user.username}
						</p>
						<p
							className="flex items-center mx-4 text-sm "
							style={{ color: "rgb(168 168 168)" }}
						>
							{[user.first_name, user.last_name].join(" ")}
						</p>
					</div>
				</div>
				<div>
					<BrightBlueButton
						text="follow"
						color="white"
						className="bg-brightBlue py-2 px-3 text-regular rounded-md"
					/>
				</div>
			</div>
		</>
	);
}

export default Account;
