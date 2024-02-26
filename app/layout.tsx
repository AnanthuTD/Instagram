import React from "react";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';

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
				<AntdRegistry>{children}</AntdRegistry>
			</body>
		</html>
	);
}
