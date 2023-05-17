"use client";
import React, { useEffect } from "react";
import Logo from "./components/svg/logo";

export default function Loading() {
	return (
		<div className="flex items-center justify-center h-screen bg-black w-full">
			<div className="text-white">
				<Logo height={"70px"} width={"380px"} />
			</div>
		</div>
	);
}
