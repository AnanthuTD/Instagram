import React from "react";
import { useEffect, useState } from "react";
import Media from './Media'
import { Post } from "@/utils/Interfaces";
interface postsInterface {
	status: boolean;
	posts: Post[];
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
						<Media post={post}/>
				  ))
				: null}
		</>
	);
}

export default posts;
