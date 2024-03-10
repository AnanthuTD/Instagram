"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useMenuContext } from "@/app/components/context/menuContext";
import { useUserContext } from "@/app/components/context/userContext";
import Logo from "@/app/components/logo";
import Reel from "@/app/components/icons/Reel";
import Search from "@/app/components/icons/Search";
import CreateIcon from "@/app/components/icons/Create";
import Create from "@/app/(main)/_create/create";
import MessageIcon from "@/app/components/icons/Message"
import SearchModal from "./search";

export default function Menu() {
	const { menu, HandleSetMenu } = useMenuContext();
	const { user } = useUserContext();
	const [create, setCreate] = useState(false);
	const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);

	const toggleSearchModal = () => {
		 setIsSearchModalVisible((prev) => !prev);
	};

	return (
		<>
			<div className="text-primaryText lg:pt-5">
				<div className="mb-10 hidden xl:block">
					<Logo />
				</div>
				<div>
					<ul className="text-md flex list-none max-lg:justify-between lg:block lg:space-y-4">
						<li
							onClick={() => HandleSetMenu("home")}
							className="order-1 lg:order-none">
							<Link
								href={"/"}
								className="flex h-8 cursor-pointer items-center space-x-2 rounded-lg px-2 py-6 hover:bg-side_bar_hover">
								<svg
									aria-label="Home"
									className="relative block"
									color="rgb(245, 245, 245)"
									fill="rgb(245, 245, 245)"
									height="24"
									role="img"
									viewBox="0 0 24 24"
									width="24">
									<path
										d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z"
										fill="none"
										stroke="currentColor"
										stroke-linejoin="round"
										stroke-width="2"></path>
								</svg>
								<p
									className={[
										menu.home ? "font-bold" : "",
										"hidden xl:block",
									].join(" ")}>
									Home
								</p>
							</Link>
						</li>
						<li
							onClick={() => HandleSetMenu("search")}
							className="order-2 lg:order-none">
							<div
								onClick={toggleSearchModal}
								className="flex h-8 cursor-pointer items-center space-x-2 rounded-lg px-2 py-6 hover:bg-side_bar_hover">
								<Search />
								<p
									className={[
										menu.search ? "font-bold" : "",
										"hidden xl:block",
									].join(" ")}>
									Search
								</p>
							</div>
						</li>
						<li
							onClick={() => HandleSetMenu("explore")}
							className="hidden lg:block">
							<Link
								href={"/explore"}
								className="flex h-8 cursor-pointer items-center space-x-2 rounded-lg px-2 py-6 hover:bg-side_bar_hover">
								<Image
									height={24}
									width={24}
									src={"/images/compass.svg"}
									alt=""></Image>
								<p
									className={[
										menu.explore ? "font-bold" : "",
										"hidden xl:block",
									].join(" ")}>
									Explore
								</p>
							</Link>
						</li>
						{/* <li
							onClick={() => HandleSetMenu("reels")}
							className="order-4 lg:order-none">
							<Link
								href={"/reel"}
								className="flex h-8 cursor-pointer items-center space-x-2 rounded-lg px-2 py-6 hover:bg-side_bar_hover">
								<Reel />
								<p
									className={[
										menu.reels ? "font-bold" : "",
										"hidden xl:block",
									].join(" ")}>
									Reel
								</p>
							</Link>
						</li> */}
						<li
							onClick={() => HandleSetMenu("messages")}
							className="hidden lg:block">
							<Link
								href={"/inbox"}
								className="flex h-8 cursor-pointer items-center space-x-2 rounded-lg px-2 py-6 hover:bg-side_bar_hover">
								<MessageIcon/>
								<p
									className={[
										menu.messages ? "font-bold" : "",
										"hidden xl:block",
									].join(" ")}>
									Messages
								</p>
							</Link>
						</li>
						{/* <li
							onClick={() => HandleSetMenu("notifications")}
							className="hidden lg:block">
							<Link
								href={"/notification"}
								className="flex h-8 cursor-pointer items-center space-x-2 rounded-lg px-2 py-6 hover:bg-side_bar_hover">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="h-6 w-6">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
									/>
								</svg>
								<p
									className={[
										menu.notifications ? "font-bold" : "",
										"hidden xl:block",
									].join(" ")}>
									Notifications
								</p>
							</Link>
						</li> */}
						<li
							className="order-3 flex h-8 cursor-pointer items-center space-x-2 rounded-lg px-2 py-6 hover:bg-side_bar_hover lg:order-none"
							onClick={() => setCreate(true)}>
							<CreateIcon />
							<p
								className={[
									menu.create ? "font-bold" : "",
									"hidden xl:block",
								].join(" ")}>
								Create
							</p>
							{create ? <Create setCreate={setCreate} /> : null}
						</li>
						<li
							onClick={() => HandleSetMenu("profile")}
							className="order-5 lg:order-none">
							<Link
								href={"/profile"}
								className="flex h-8 cursor-pointer items-center space-x-2 rounded-lg px-2 py-6 hover:bg-side_bar_hover">
								{user ? (
									<Image
										src={`/api${user.profile_img}`}
										width={24}
										height={24}
										alt=""
										className="rounded-full"
									/>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="h-6 w-6">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>
								)}
								<p
									className={[
										menu.profile ? "font-bold" : "",
										"hidden xl:block",
									].join(" ")}>
									Profile
								</p>
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className="hidden max-xl:justify-center lg:flex xl:items-end xl:p-3">
				<button className="inline-flex">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="h-6 w-6">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
					<span className="ml-2 hidden xl:block">More</span>
				</button>
			</div>
			<SearchModal visible={isSearchModalVisible} onClose={toggleSearchModal} />
		</>
	);
}
