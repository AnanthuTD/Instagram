"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UserState} from "../../../utils/Interfaces"
import { fetchCSRF} from "../../../utils/fetch_csrf"
import {useUserContext}  from "../../components/context/userContext"


function settings() {
	// useState
	const [bio, setBio] = useState("");
	const [website, setWebsite] = useState("");
	const [gender, setGender] = useState("");

	// context
	const { user, setUser } = useUserContext();

	async function handleSubmit(): Promise<void> {
		const csrfToken = await fetchCSRF();
		const Response = await fetch("api/accounts/profile/", {
			headers: {
				"content-type": "application/json",
				"X-CSRFToken": csrfToken as string,
			},
			method: "post",
			body: JSON.stringify({
				website: website,
				bio: bio,
				gender: gender,
			}),
		});
		let data = await Response.json();
		if (data.status && user) {
			let newUser: UserState = {
				...user,
				bio: bio,
				gender: gender,
				website: website,
			};
			setUser(newUser);
		}
	}

	useEffect(() => {
		if (!user) return;
		setBio(user.bio);
		setWebsite(user.website);
		setGender(user.gender);
	}, []);

	return (
		<>
			<main className="h-full w-full">
				<div className="w-full" style={{ height: "10%" }}>
					<span className="text-white font-bold text-2xl">
						Settings
					</span>
				</div>
				<div className="w-full h-full flex justify-center items-center">
					<div className="h-4/5 flex flex-col justify-center items-center w-5/12">
						<div className="w-full h-full space-y-10">
							<div className="text-2xl w-full h-fit p-3">
								<div className="w-1/5 flex justify-end">
									Edit profile
								</div>
							</div>
							<div>
								<div className="flex space-x-10">
									<div className="w-1/5 flex justify-end">
										<Image
											src="/images/pro-pic.jpg"
											width={40}
											height={40}
											alt=""
											className="rounded-full aspect-square"
											style={{
												height: "40px",
												width: "40px",
											}}
										/>
									</div>
									<div className="w-3/5">
										<p className="flex items-center text-sm">
											username
										</p>
										<button className="bg-transparent text-brightBlue">
											Change profile photo
										</button>
									</div>
								</div>
								<div className="mt-5 space-y-3">
									<div className="flex space-x-10">
										<aside className="w-1/5 flex justify-end">
											<label
												htmlFor="website"
												className="font-extrabold"
											>
												Website
											</label>
										</aside>
										<div className="w-3/5">
											<input
												className="bg-transparent border rounded w-full p-1"
												type="url"
												name="website"
												id=""
												placeholder="website"
												onChange={(e) =>
													setWebsite(e.target.value)
												}
												value={website}
											/>
										</div>
									</div>
									<div className="flex space-x-10">
										<aside className="w-1/5 flex justify-end">
											<label
												htmlFor="bio"
												className="font-extrabold"
											>
												Bio
											</label>
										</aside>
										<div className="w-3/5">
											<textarea
												className="bg-transparent border rounded w-full p-1"
												name="bio"
												id=""
												placeholder="Bio"
												onChange={(e) =>
													setBio(e.target.value)
												}
												value={bio}
											/>
										</div>
									</div>
									<div className="flex space-x-10">
										<aside className="w-1/5 flex justify-end">
											<label
												htmlFor="website"
												className="font-extrabold"
											>
												Gender
											</label>
										</aside>
										<div className="w-3/5">
											<input
												className="bg-transparent border rounded w-full p-1"
												type="text"
												name="gender"
												id=""
												placeholder="Gender"
												onChange={(e) =>
													setGender(e.target.value)
												}
												value={gender}
											/>
										</div>
									</div>
									<div className="flex space-x-10">
										<aside className="w-1/5 flex justify-end"></aside>
										<div className="w-3/5">
											<button
												type="submit"
												name="profile"
												className="bg-brightBlue text-white rounded-lg px-3"
												onClick={() => handleSubmit()}
											>
												submit
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

export default settings;
