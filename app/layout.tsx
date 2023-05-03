import React from "react";
import { MenuContextProvider } from "./components/context/menuContext";
import "./globals.css";

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
            <body><MenuContextProvider>{children}</MenuContextProvider></body>
        </html>
    );
}
