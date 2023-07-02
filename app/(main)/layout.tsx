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
		<main className="flex min-h-screen flex-row bg-black">
			<UserContextProvider>
				<MenuContextProvider>
					<ChatContextProvider>
						<div className="flex h-screen flex-col justify-between p-5 xl:w-1/6 xl:border-r xl:border-border_grey">
							<MenuBar />
						</div>
						<div
							className="flex h-screen w-full overflow-y-auto p-5 xl:w-5/6"
							id="main_scrollable">
							{children}
						</div>
					</ChatContextProvider>
				</MenuContextProvider>
			</UserContextProvider>
		</main>
	);
}
