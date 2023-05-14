import React from "react";
import { useContext, useEffect, useState } from "react";
import { useUserContext } from "../context/userContext";

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

	return (
		<>
			{posts
				? posts.map((post) => (
						<div
							key={post.post_id}
							className="aspect-square flex justify-center overflow-hidden"
						>
							<img
								src={`api/media/${post?.file}/`}
								alt=""
								style={{
									maxWidth: "fit-content",
									maxHeight: "100%",
								}}
							/>
						</div>
				  ))
				: null}
		</>
	);
}

export default posts;
