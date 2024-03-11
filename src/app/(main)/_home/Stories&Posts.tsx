"use client";
import { useEffect, useState } from "react";
import Post from "./post/post";
import Stories from "./stories/stories";
import React from "react";
import { PostsInterface } from "@/utils/Interfaces";
import axios from "@/lib/axios";

function StoriesPosts() {
	const [posts, setPosts] = useState<PostsInterface[] | undefined>(undefined);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await axios.get("/api/post/allPost");
				const data = response.data;
				setPosts(data.posts);
			} catch (error) {
				console.error("Error during Axios request:", error);
				console.error(
					"An error occurred while fetching data. Please try again later."
				);
			}
		}

		fetchData();
	}, []);

	return (
		<>
			<div className="xl:11/12 w-full lg:w-5/6" style={{ maxWidth: "685px" }}>
				{/* stories */}
				<div className="" style={{ height: "fit-content" }}>
					<Stories />
				</div>
				{posts?.map((post) => (
					<Post post={post} key={post.id} />
				))}
			</div>
		</>
	);
}

export default StoriesPosts;
