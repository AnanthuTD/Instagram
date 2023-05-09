import React from "react";

// components
import MenuBar from "../components/home/menu";

// context
import { MenuContextProvider } from "../components/context/menuContext";
import { UserContextProvider } from "../components/context/userContext";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="flex min-h-screen flex-row bg-black h-full">
			<UserContextProvider>
				<MenuContextProvider>
					<div className="w-1/6 p-5 border-r border-border_grey justify-between flex-col flex">
						<MenuBar />
					</div>
					<div className="w-5/6 flex p-5">{children}</div>
				</MenuContextProvider>
			</UserContextProvider>
		</main>
	);
}
