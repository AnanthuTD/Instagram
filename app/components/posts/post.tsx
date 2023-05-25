import React, { useEffect, useRef, useState } from "react";
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
import Likes from "../posts/likes";
import Comments from "../posts/comments";
import Heart from "./heart";
import { useUserContext } from "../context/userContext";
import timeDifference from "@/utils/time_difference";
import { isImageFile, isVideoFile } from "@/utils/video_or_image";

function post({ post }: { post: PostsInterface }) {
	const [comment, setComment] = useState("");
	const [like, setLike] = useState(false);
	const [saved, setSaved] = useState(false);
	const [currentPost, setCurrentPost] = useState(post);
	const [likes, setLikes] = useState(false);
	const [comments, setComments] = useState(false);
	const [playVideo, setPlayVideo] = useState(false);

	const router = useRouter();
	const { user } = useUserContext();

	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (videoRef.current) {
			if (playVideo) videoRef.current.play();
			else videoRef.current.pause();
		}
	}, [playVideo]);

	useEffect(() => {
		if (!videoRef.current) return;
		const handleScroll = () => {
			if (videoRef.current) {
				if (container) {
					const rect = videoRef.current.getBoundingClientRect();
					const containerRect = container.getBoundingClientRect();
					const center = container.offsetHeight / 2;
					const elementTop =
						rect.top - containerRect.top + rect.height / 2;
					const isCentered =
						Math.abs(center - elementTop) <
						container.offsetHeight / 4;
					setPlayVideo(isCentered);
				}
			}
		};

		const container = videoRef.current.closest(
			"#main_scrollable"
		) as HTMLElement;

		if (container) {
			container.addEventListener("scroll", handleScroll);
		}

		return () => {
			if (container) {
				container.removeEventListener("scroll", handleScroll);
			}
		};
	}, []);

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
			const found = currentPost.likes.find(
				(obj) => obj.username === user?.username
			);

			if (found) {
				setLike(true);
			}
		}
	}, []);

	const handlePostComment = async () => {
		if (!comment) return;
		const csrfToken = await fetchCSRF();
		const response = await fetch("/api/post/comments/", {
			method: "POST",
			headers: { "X-csrfToken": csrfToken },
			body: JSON.stringify({
				comment: comment,
				post_id: currentPost.id,
			}),
		});
		if (response.status) {
			setComment("");
		}
	};

	return (
		<>
			<div
				className="flex justify-center pt-10"
				key={currentPost.id}
				/* onMouseOver={() => setPlayVideo(true)}
				onMouseOut={() => setPlayVideo(false)} */
			>
				<div className="h-full w-4/6">
					<div className="aspect-[4/5] w-full">
						<div
							className="flex items-center justify-between"
							style={{ height: "fit-content" }}
						>
							<div className="flex items-center gap-2">
								<div
									className="flex cursor-pointer items-center gap-2"
									onClick={() =>
										getProfile(currentPost.username)
									}
								>
									<Rings width={"50px"} />
									<span className="text-primaryText">
										{currentPost.username}
									</span>
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
						<div className="mt-2 flex h-full justify-center overflow-hidden rounded-lg">
							{isImageFile(currentPost.file) ? (
								<img
									src={`api/media/${currentPost.file}`}
									alt="not found"
									className="h-full"
									style={{
										maxWidth: "max-content",
										maxHeight: "max-content",
									}}
								/>
							) : null}
							{isVideoFile(currentPost.file) ? (
								<video
									src={`api/media/${currentPost.file}`}
									controls={false}
									muted={true}
									className="h-full"
									style={{
										maxWidth: "max-content",
										maxHeight: "max-content",
									}}
									ref={videoRef}
								></video>
							) : null}
						</div>
					</div>
					<div className="p-2"></div>
					<footer className="w-full space-y-2">
						<div
							className="flex items-center justify-between"
							style={{ height: "fit-content" }}
						>
							<div className="flex gap-2">
								<div onClick={() => handleLike(currentPost.id)}>
									<Heart
										className="cursor-pointer"
										like={like}
									/>
								</div>
								<div onClick={() => setComments(true)}>
									<CommentIcon
										stroke="white"
										className="cursor-pointer"
									/>
									{comments ? (
										<Comments
											post_id={currentPost.id}
											setComments={setComments}
										/>
									) : null}
								</div>
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

						<div className="flex cursor-pointer gap-1 text-sm">
							{currentPost.likes.length > 0 &&
							!(
								currentPost.likes.find(
									(obj) => obj.username === user?.username
								) && currentPost.likes.length === 1
							) ? (
								<>
									avatar(3)
									<span>Liked by</span>{" "}
									<span className="cursor-pointer font-bold">
										{currentPost.likes[0].username}
									</span>{" "}
									<span>and</span>
									<span
										className="cursor-pointer font-bold"
										onClick={() => {
											setLikes(true);
										}}
									>
										{currentPost.likes.length - 1} others
										{likes ? (
											<Likes
												setLikes={setLikes}
												users={currentPost.likes}
											/>
										) : null}
									</span>
								</>
							) : currentPost.likes.length === 0 ? (
								<>No Likes</>
							) : null}
						</div>
						<div className="flex items-center">
							<input
								type="text"
								className="w-full border-none bg-transparent text-sm outline-none"
								placeholder="Add a comment..."
								onChange={(e) => setComment(e.target.value)}
								value={comment}
							/>
							<div className="flex cursor-pointer gap-2">
								{comment ? (
									<span
										className="text-xs font-bold text-brightBlue"
										onClick={() => handlePostComment()}
									>
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
