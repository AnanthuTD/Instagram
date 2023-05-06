"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useMenuContext } from "../context/menuContext";
import Logo from "../svg/logo";
import Create from "../create/create";

export default function Menu() {
	const { menu, HandleSetMenu } = useMenuContext();

	const [create, setCreate] = useState(false);

	return (
		<>
			<div className="text-primaryText pt-5 ">
				<div className="mb-10">
					<Logo />
				</div>
				<div>
					<ul className="list-none space-y-4 text-md">
						<li onClick={() => HandleSetMenu("home")}>
							<Link
								href={"/"}
								className="h-8 flex items-center rounded-lg hover:bg-side_bar_hover cursor-pointer py-6 px-2 space-x-2"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
									/>
								</svg>
								<p className={menu.home ? "font-bold" : ""}>
									Home
								</p>
							</Link>
						</li>
						<li onClick={() => HandleSetMenu("search")}>
							<Link
								href={"/search"}
								className="h-8 flex items-center rounded-lg hover:bg-side_bar_hover cursor-pointer py-6 px-2 space-x-2"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
									/>
								</svg>
								<p className={menu.search ? "font-bold" : ""}>
									Search
								</p>
							</Link>
						</li>
						<li onClick={() => HandleSetMenu("explore")}>
							<Link
								href={"/explore"}
								className="h-8 flex items-center rounded-lg hover:bg-side_bar_hover cursor-pointer py-6 px-2 space-x-2"
							>
								<Image
									height={24}
									width={24}
									src={"/images/compass.svg"}
									alt=""
								></Image>
								<p className={menu.explore ? "font-bold" : ""}>
									Explore
								</p>
							</Link>
						</li>
						<li onClick={() => HandleSetMenu("reels")}>
							<Link
								href={"/reel"}
								className="h-8 flex items-center rounded-lg hover:bg-side_bar_hover cursor-pointer py-6 px-2 space-x-2"
							>
								<Image
									height={24}
									width={24}
									src={"/images/reels.svg"}
									alt=""
								></Image>
								<p className={menu.reels ? "font-bold" : ""}>
									Reel
								</p>
							</Link>
						</li>
						<li onClick={() => HandleSetMenu("messages")}>
							<Link
								href={"/inbox"}
								className="h-8 flex items-center rounded-lg hover:bg-side_bar_hover cursor-pointer py-6 px-2 space-x-2"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
									/>
								</svg>
								<p className={menu.messages ? "font-bold" : ""}>
									Messages
								</p>
							</Link>
						</li>
						<li onClick={() => HandleSetMenu("notifications")}>
							<Link
								href={"/notification"}
								className="h-8 flex items-center rounded-lg hover:bg-side_bar_hover cursor-pointer py-6 px-2 space-x-2"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
									/>
								</svg>
								<p
									className={
										menu.notifications ? "font-bold" : ""
									}
								>
									Notifications
								</p>
							</Link>
						</li>
						<li
							className="h-8 flex items-center rounded-lg hover:bg-side_bar_hover cursor-pointer py-6 px-2 space-x-2"
							onClick={() => setCreate(true)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<p className={menu.create ? "font-bold" : ""}>
								Create
							</p>
							{create ? <Create setCreate={setCreate} /> : null}
						</li>
						<li onClick={() => HandleSetMenu("profile")}>
							<Link
								href={"/profile"}
								className="h-8 flex items-center rounded-lg hover:bg-side_bar_hover cursor-pointer py-6 px-2 space-x-2"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
								<p className={menu.profile ? "font-bold" : ""}>
									Profile
								</p>
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className="flex items-end p-3">
				<button className="inline-flex">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
					<span className="ml-2">More</span>
				</button>
			</div>
		</>
	);
}
