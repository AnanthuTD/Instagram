import React, { useEffect, useState } from "react";
import { PostsInterface } from "../../../utils/Interfaces";
import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import { fetchCSRF } from "../../../utils/fetch_csrf";
import OptionsIcon from "../posts/optionsIcon";
import SaveIcon from "../posts/saveIcon";
import SendIcon from "../posts/sendIcon";
import SmileIcon from "../posts/smileIcon";
import Rings from "../stories/rings";
import CommentIcon from "../posts/commentIcon";
import Heart from "./heart";
import { useUserContext } from "../context/userContext";

function post({ post }: { post: PostsInterface }) {
	const [comment, setComment] = useState("");
	const [like, setLike] = useState(false);
	const [saved, setSaved] = useState(false);
	const [currentPost, setCurrentPost] = useState(post);

	const router = useRouter();
	const { user } = useUserContext();

	function timeDifference(time_stamp: Date): string {
		const dateObj = new Date(time_stamp);
		const currentDate = new Date();

		const differenceYears =
			currentDate.getFullYear() - dateObj.getFullYear();
		if (differenceYears) return differenceYears + "y";

		const differenceMonths = currentDate.getMonth() - dateObj.getMonth();
		if (differenceMonths) return differenceMonths + "m";

		const differenceDays = currentDate.getDate() - dateObj.getDate();
		if (differenceDays) return differenceDays + "d";

		const differenceHours = currentDate.getHours() - dateObj.getHours();
		if (differenceHours) return differenceHours + "h";

		const differenceMins = currentDate.getMinutes() - dateObj.getMinutes();
		if (differenceMins) return differenceMins + "m";

		const differenceSecs = currentDate.getSeconds() - dateObj.getSeconds();
		if (differenceSecs) return differenceSecs + "s";

		return "";
	}

	function getProfile(username: string): void {
		router.push(`/profile/?username=${username}`);
	}

	async function handleLike(post_id: UUID): Promise<void> {
		const csrfToken = await fetchCSRF();

		// like
		if (!like) {
			fetch(`/api/post/${post_id}/like/`, {
				method: "PATCH",
				headers: { "X-csrfToken": csrfToken },
				credentials: "include",
			})
				.then((response) => {
					if (response.ok) {
						return response.json();
					} else {
						throw new Error("Network response was not ok");
					}
				})
				.then((data) => {
					// console.log(data);
					setLike(true);
					currentPost.likes = data.likes;
					// Update the UI to reflect the new like count or display a success message
				})
				.catch((error) => {
					console.error(
						"There was a problem with the fetch operation:",
						error
					);
					// Display an error message to the user
				});
			return;
		}

		// dislike
		fetch(`/api/post/${post_id}/dislike/`, {
			method: "PATCH",
			headers: { "X-csrfToken": csrfToken },
			credentials: "include",
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error("Network response was not ok");
				}
			})
			.then((data) => {
				// console.log(data);
				setLike(false);
				currentPost.likes = data.likes;
				// Update the UI to reflect the new like count or display a success message
			})
			.catch((error) => {
				console.error(
					"There was a problem with the fetch operation:",
					error
				);
				// Display an error message to the user
			});
		return;
	}

	useEffect(() => {
		if (currentPost.likes && user) {
			currentPost.likes.includes({
				username: user.username,
				first_name: user.first_name,
				last_name: user.last_name,
			});
			setLike(true);
		}
	}, []);

	return (
		<>
			<div
				className="flex justify-center pt-10"
				key={currentPost.post_id}
			>
				<div className="w-4/6 h-full">
					<div className="aspect-[4/5] w-full">
						<div
							className="flex justify-between items-center"
							style={{ height: "fit-content" }}
						>
							<div className="flex gap-2 items-center">
								<div
									className="flex gap-2 items-center cursor-pointer"
									onClick={() =>
										getProfile(currentPost.username)
									}
								>
									<Rings width={"50px"} />
									<span>{currentPost.username}</span>
								</div>
								<span
									className="rounded-full"
									style={{
										width: "5px",
										height: "5px",
										backgroundColor: "gray",
									}}
								></span>
								<span
									className="text-xs"
									style={{ color: "gray" }}
								>
									{timeDifference(currentPost.time_stamp)}
								</span>
							</div>
							<div className="">
								<OptionsIcon className="cursor-pointer" />
							</div>
						</div>

						{/* post */}
						<div className="overflow-hidden h-full rounded-lg mt-2 flex justify-center">
							<img
								src={`api/media/${currentPost.file}`}
								alt="not found"
								className="h-full"
								style={{
									maxWidth: "max-content",
									maxHeight: "max-content",
								}}
							/>
						</div>
					</div>
					<div className="p-2"></div>
					<footer className="w-full space-y-2">
						<div
							className="flex justify-between items-center"
							style={{ height: "fit-content" }}
						>
							<div className="flex gap-2">
								<div
									onClick={() =>
										handleLike(currentPost.post_id)
									}
								>
									<Heart
										className="cursor-pointer"
										like={like}
									/>
								</div>
								<CommentIcon
									stroke="white"
									className="cursor-pointer"
								/>
								<SendIcon
									stroke="white"
									className="cursor-pointer"
								/>
							</div>
							<div onClick={() => setSaved(!saved)}>
								<SaveIcon
									stroke="white"
									fill={saved ? "white" : "none"}
								/>
							</div>
						</div>

						<div className="flex gap-1 text-sm cursor-pointer">
							{currentPost.likes.length > 0 ? (
								<>
									avatar(3)
									<span>Liked by</span>{" "}
									<span className="font-bold cursor-pointer">
										{currentPost.likes[0].username}
									</span>{" "}
									<span>and</span>
									<span className="font-bold cursor-pointer">
										{currentPost.likes.length - 1} others
									</span>
								</>
							) : (
								<>No Likes</>
							)}
						</div>
						<div className="flex items-center">
							<input
								type="text"
								className="border-none bg-transparent text-sm outline-none w-full"
								placeholder="Add a comment..."
								onChange={(e) => setComment(e.target.value)}
							/>
							<div className="flex gap-2 cursor-pointer">
								{currentPost ? (
									<span className="text-xs font-bold text-brightBlue">
										POST
									</span>
								) : null}
								<SmileIcon />
							</div>
						</div>
					</footer>
				</div>
			</div>
		</>
	);
}

export default post;
