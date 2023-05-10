"use client";
import { useEffect, useState } from "react";
import CommentIcon from "../posts/commentIcon";
import Like from "../posts/heart";
import OptionsIcon from "../posts/optionsIcon";
import SaveIcon from "../posts/saveIcon";
import SendIcon from "../posts/sendIcon";
import SmileIcon from "../posts/smileIcon";
import Rings from "../stories/rings";
import Stories from "../stories/stories";
import React from "react";
import { useRouter } from "next/navigation";

function StoriesPosts() {
	const [comment, setComment] = useState("");
	const [post, setPost] = useState(false);
	const [like, setLike] = useState(false);
	const [saved, setSaved] = useState(false);
	const [posts, setPosts] = useState<any[] | null>(null);

	const router = useRouter();

	useEffect(() => {
		async function fetchData() {
			const Response = await fetch("/api/post/allPost");
			const Data = await Response.json();
			setPosts(Data.posts);
		}
		fetchData();
	}, []);

	useEffect(() => {
		if (comment) {
			setPost(true);
		} else {
			setPost(false);
		}
	}, [comment]);

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

	return (
		<>
			<div className="" style={{ maxWidth: "685px" }}>
				{/* stories */}
				<div className="" style={{ height: "fit-content" }}>
					<Stories />
				</div>
				{posts?.map((post) => (
					<div
						className="flex justify-center pt-10"
						key={post.post_id}
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
												getProfile(post.username)
											}
										>
											<Rings width={"50px"} />
											<span>{post.username}</span>
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
											{timeDifference(post.time_stamp)}
										</span>
									</div>
									<div className="">
										<OptionsIcon className="cursor-pointer" />
									</div>
								</div>

								{/* post */}
								<div className="overflow-hidden h-full rounded-lg mt-2 flex justify-center">
									<img
										src={`api/media/${post.file}`}
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
										<div onClick={() => setLike(!like)}>
											<Like
												className="cursor-pointer"
												like={like ? true : false}
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
									avatar(3)
									<span>Liked by</span>{" "}
									<span className="font-bold cursor-pointer">
										username
									</span>{" "}
									<span>and</span>
									<span className="font-bold cursor-pointer">
										number others
									</span>
								</div>
								<div className="flex items-center">
									<input
										type="text"
										className="border-none bg-transparent text-sm outline-none w-full"
										placeholder="Add a comment..."
										onChange={(e) =>
											setComment(e.target.value)
										}
									/>
									<div className="flex gap-2 cursor-pointer">
										{post ? (
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
				))}
			</div>
		</>
	);
}

export default StoriesPosts;
