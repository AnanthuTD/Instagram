import React from "react";

// components
import MenuBar from "../components/home/menu";

// context
import { MenuContextProvider } from "../components/context/menuContext";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<MenuContextProvider>
					<main className="flex min-h-screen flex-row bg-black h-full">
						<div className="w-1/6 p-5 border-r border-border_grey justify-between flex-col flex">
							<MenuBar />
						</div>
						<div className="w-5/6 flex p-5">{children}</div>
					</main>
				</MenuContextProvider>
			</body>
		</html>
	);
}
