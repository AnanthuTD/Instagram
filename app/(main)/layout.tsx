import React from "react";

// components
import MenuBar from "../components/home/menu";

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
		<main className="flex min-h-screen flex-row bg-black min-h-screen">
			<UserContextProvider>
				<MenuContextProvider>
					<ChatContextProvider>
						<div className="w-1/6 p-5 border-r border-border_grey justify-between flex-col flex h-screen">
							<MenuBar />
						</div>
						<div className="w-5/6 flex p-5 overflow-y-auto h-screen">
							{children}
						</div>
					</ChatContextProvider>
				</MenuContextProvider>
			</UserContextProvider>
		</main>
	);
}
