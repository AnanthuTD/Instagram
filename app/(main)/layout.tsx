import React from "react";
import MenuBar from "@/app/(main)/_menu/menu";

// context
import { MenuContextProvider } from "../components/context/menuContext";
import { UserContextProvider } from "../components/context/userContext";
import { ChatContextProvider } from "../components/context/chatContext";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="flex min-h-screen min-h-screen flex-row bg-black">
			<UserContextProvider>
				<MenuContextProvider>
					<ChatContextProvider>
						<div className="flex h-screen w-1/6 flex-col justify-between border-r border-border_grey p-5">
							<MenuBar />
						</div>
						<div
							className="flex h-screen w-5/6 overflow-y-auto p-5"
							id="main_scrollable">
							{children}
						</div>
					</ChatContextProvider>
				</MenuContextProvider>
			</UserContextProvider>
		</main>
	);
}
