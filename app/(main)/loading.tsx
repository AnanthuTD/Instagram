'use client'
import React, { useEffect } from "react";
import Logo from '../components/svg/logo'

export default function Loading() {
		
	return (
		<div className="flex items-center justify-center h-screen bg-black w-full">
			<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary text-white"></div>
		</div>
	);
}
