import React from "react";
import "./globals.css";
import { UserContextProvider } from "./components/context/userContext";

export const metadata = {
	title: "WowGram",
	description: "Instagram Clone",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<UserContextProvider>{children}</UserContextProvider>
			</body>
		</html>
	);
}
