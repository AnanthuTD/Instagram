"use client";

import SettingsIcon from "../../components/svg/settings";
import { useEffect, useState } from "react";
import Posts from "../../components/profile/posts";
import Saved from "../../components/profile/saved";
import Tagged from "../../components/profile/tagged";
import SettingsPopUp from "../../components/profile/settings";
import { useUserContext } from "../../components/context/userContext";
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { UserState } from "@/utils/Interfaces";
import { fetchCSRF } from "@/utils/fetch_csrf";

function profile() {
	// useStates
	const [post, setPost] = useState(true);
	const [saved, setSaved] = useState(false);
	const [tagged, setTagged] = useState(false);
	const [settings, setSettings] = useState(false);
	const [profile, setProfile] = useState<UserState | undefined>();
	const [loading, setLoading] = useState(true);

	// context
	const { user, setUser } = useUserContext();

	let username = useSearchParams().get("username") || "";

	async function fetchProfile() {
		const Response = await fetch(`/api/accounts/get_profile/${username}/`);
		let data = await Response.json();
		if (data.status) setProfile(data.profile);
	}

	useEffect(() => {
		if (username) fetchProfile();
		else setProfile(user);
	}, []);

	useEffect(() => {
		if (profile) setLoading(false);
	}, [profile]);

	const PostStyle = {
		color: post ? "white" : "gray",
		borderTopColor: post ? "white" : "",
		borderTop: post ? "solid 0.1px" : "",
		cursor: "pointer",
		padding: "10px",
	};
	const SavedStyle = {
		color: saved ? "white" : "gray",
		borderTopColor: tagged ? "white" : "",
		borderTop: saved ? "solid 0.1px" : "",
		cursor: "pointer",
		padding: "10px",
	};
	const TaggedStyle = {
		color: tagged ? "white" : "gray",
		borderTopColor: saved ? "white" : "",
		borderTop: tagged ? "solid 0.1px" : "",
		cursor: "pointer",
		padding: "10px",
	};

	async function follow() {
		if (!profile?.id_user) return;
		const csrfToken = await fetchCSRF();
		const response = await fetch(`/api/accounts/follow/`, {
			method: "PUT",
			headers: { "X-csrfToken": csrfToken },
			body: JSON.stringify({
				id_user: profile?.id_user,
			}),
		});
		let data = await response.json();
		console.log(data);
		if (data.status) {
			fetchProfile();
			if (data.user) {
				setUser(data.user);
			}
		}
	}

	async function unfollow() {
		if (!profile?.id_user) return;
		const csrfToken = await fetchCSRF();
		const response = await fetch(
			`/api/accounts/${profile.id_user}/follow/`,
			{
				method: "DELETE",
				headers: { "X-csrfToken": csrfToken },
				body: JSON.stringify({}),
			}
		);
		let data = await response.json();
		console.log(data);
		if (data.status) {
			fetchProfile();
			if (data.user) {
				setUser(data.user);
			}
		}
	}

	function message() {
		alert("Message not defined");
	}

	if (loading) {
		return <div>loading</div>;
	} else if (profile)
		return (
			<div className="flex w-full bg-black justify-center">
				<div
					className="flex bg-black w-full"
					style={{ minWidth: "600px", maxWidth: "1000px" }}
				>
					<div className="w-full" style={{}}>
						{/* top */}
						<div className="flex gap-10 m-10">
							<div style={{ marginInline: "4.5rem" }}>
								<img
									alt=""
									src={"api/media/default_profile.png"}
									width={130}
									height={130}
									className="rounded-full cursor-pointer"
								/>
							</div>
							<div className="space-y-5">
								<div className="flex gap-5 items-center">
									<p className="m-0 text-xl font-medium">
										{profile.username}
									</p>

									{user?.id_user === profile.id_user ? (
										<>
											<Link
												type="button"
												href={"/settings"}
												className="bg-white rounded-md text-black text-sm font-bold py-1 px-4 cursor-pointer"
											>
												Edit profile
											</Link>
											<div
												style={{ width: "30px" }}
												onClick={() =>
													setSettings(true)
												}
											>
												<SettingsIcon className="cursor-pointer" />
												{settings ? (
													<SettingsPopUp
														settings={settings}
														setSettings={
															setSettings
														}
													/>
												) : null}
											</div>
										</>
									) : (
										<>
											{!user?.following.includes(
												profile.id_user
											) ? (
												<button
													type="button"
													onClick={() => follow()}
													className="bg-white rounded-md text-black text-sm font-bold py-1 px-4 cursor-pointer"
												>
													Follow
												</button>
											) : (
												<button
													type="button"
													onClick={() => unfollow()}
													className="bg-white rounded-md text-black text-sm font-bold py-1 px-4 cursor-pointer"
												>
													Unfollow
												</button>
											)}
											<button
												type="button"
												onClick={() => message()}
												className="bg-white rounded-md text-black text-sm font-bold py-1 px-4 cursor-pointer"
											>
												Message
											</button>
										</>
									)}
								</div>
								<div className="flex gap-10">
									<span>
										<span className="font-bold">
											{profile.post_count}
										</span>{" "}
										post
									</span>
									<span className="cursor-pointer">
										<span className="font-bold">
											{profile.followers?.length}
										</span>{" "}
										followers
									</span>
									<span className="cursor-pointer">
										<span className="font-bold">
											{profile.following?.length}
										</span>{" "}
										following
									</span>
								</div>
								<div>
									<p className="font-bold">
										{profile.first_name +
											" " +
											profile.last_name}
									</p>
									<p className="text-sm">
										{profile.first_name}
									</p>
								</div>
							</div>
						</div>
						<hr className="" style={{ borderColor: "#363837" }} />
						{/* bottom */}
						<div>
							<div
								className="flex w-full justify-center"
								style={{ height: "fit-content" }}
							>
								<div className="flex gap-12 text-sm">
									<div
										style={PostStyle}
										onClick={() => {
											setPost(true);
											setSaved(false);
											setTagged(false);
										}}
									>
										POSTS
									</div>
									<div
										style={SavedStyle}
										onClick={() => {
											setPost(false);
											setSaved(true);
											setTagged(false);
										}}
									>
										SAVED
									</div>
									<div
										style={TaggedStyle}
										onClick={() => {
											setPost(false);
											setSaved(false);
											setTagged(true);
										}}
									>
										TAGGED
									</div>
								</div>
							</div>
							<div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 justify-between w-full">
								{post ? <Posts /> : null}
								{saved ? <Saved /> : null}
								{tagged ? <Tagged /> : null}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
}

export default profile;
