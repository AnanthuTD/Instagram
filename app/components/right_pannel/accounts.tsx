"use client";
import Image from "next/image";
import SwitchButton from "./brightBlueButton";
import { useContext } from "react";
import React from "react";
import { useUserContext } from "../context/userContext";

function accounts() {
	const userContext = useUserContext()
    
	const {user} = userContext 
	let username = user?.username;
	return (
		<>
			<div className="flex cursor-pointer">
				<Image
					src="/images/pro-pic.jpg"
					width={60}
					height={60}
					alt=""
					className="rounded-full"
				/>
				<p className="flex items-center mx-4">{username}</p>
				<SwitchButton text="Switch" />
			</div>
		</>
	);
}

export default accounts;
