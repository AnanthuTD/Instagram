import React from "react";
import { useContext, useEffect, useState } from "react";
import { useUserContext } from "../context/userContext";
import { isImageFile, isVideoFile } from "@/utils/video_or_image";

interface postsInterface {
	status: boolean;
	posts: any[];
}

function posts({ otherUser }: { otherUser: string | undefined }) {
	const [posts, setPosts] = useState<any[]>([]);
	const [data, setData] = useState<postsInterface | null>(null);
	const [initial, setInitial] = useState(true);

	async function fetchData() {
		setInitial(false);
		let url = "/api/post";
		if (otherUser) url = `api/post/${otherUser}/posts/`;
		const Response = await fetch(url, {
			method: "GET",
		});

		let data = await Response.json();

		if (data.status === true) setData(data);
	}

	if (initial) fetchData();

	useEffect(() => {
		if (data?.posts) {
			setPosts(data.posts);
		}
	}, [data]);

	useEffect(() => {
		console.log("currentPost");
	}, []);

	return (
		<>
			{posts
				? posts.map((post) => (
						<div
							key={post.id}
							className="flex aspect-square justify-center overflow-hidden"
						>
							{isImageFile(post.file) ? (
								<img
									src={`api/media/${post?.file}/`}
									alt=""
									style={{
										maxWidth: "fit-content",
										maxHeight: "100%",
									}}
								/>
							) : null}
							{isVideoFile(post.file) ? (
								<video
									src={`api/media/${post.file}`}
									controls={false}
									muted={true}
									className="h-full"
									style={{
										maxWidth: "fit-content",
										maxHeight: "100%", 
									}}
									// ref={videoRef}
								></video>
							) : null}
						</div>
				  ))
				: null}
		</>
	);
}

export default posts;
