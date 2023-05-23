
import Image from "next/image";
import React from "react";
import { fetchCSRF } from "@/utils/fetch_csrf";
import { useUserContext } from "../context/userContext";
import { UUID } from "crypto";
interface AccountProps {
	width?: number;
	height?: number;
	user: {
		username: string;
		first_name: string;
		last_name: string;
		profile_img: string;
		id_user: UUID;
	};
}
function Account({ width = 40, height = 40, user }: AccountProps) {
	// context
	const { user: currentUser, setUser } = useUserContext();

	async function follow() {
		if (!user?.id_user) return;
		const csrfToken = await fetchCSRF();
		const response = await fetch(`/api/accounts/follow/`, {
			method: "PUT",
			headers: { "X-csrfToken": csrfToken },
			body: JSON.stringify({
				id_user: user?.id_user,
			}),
		});
		let data = await response.json();
		if (data.status) {
			if (data.user) {
				setUser(data.user);
			}
		}
	}

	async function unfollow() {
		if (!user?.id_user) return;
		const csrfToken = await fetchCSRF();
		const response = await fetch(
			`/api/accounts/${user.id_user}/follow/`,
			{
				method: "DELETE",
				headers: { "X-csrfToken": csrfToken },
				body: JSON.stringify({}),
			}
		);
		let data = await response.json();
		if (data.status) {
			if (data.user) {
				setUser(data.user);
			}
		}
	}
	
	return (
		<>
			<div className="flex my-3 cursor-pointer items-center m-4 justify-between">
				<div className="flex">
					<img
						src={`/api/media/${user.profile_img}`}
						width={width}
						height={height}
						alt=""
						className="rounded-full"
					/>

					<div style={{ height: "fit-content" }} onClick={() => null}>
						<p className="flex items-center mx-4 text-sm text-primaryText">
							{user.username}
						</p>
						<p
							className="flex items-center mx-4 text-sm "
							style={{ color: "rgb(168 168 168)" }}
						>
							{[user.first_name, user.last_name].join(" ")}
						</p>
					</div>
				</div>
				<div>
					{!currentUser?.following.includes(user.id_user) ? (
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
				</div>
			</div>
		</>
	);
}

export default Account;
