"use client";
import React, { useState } from "react";
import Heart from "./heart";

function likes() {
	const [like, setLike] = useState(false);
	return (
		<>
			<div onClick={() => setLike(!like)}>
				<Heart className="cursor-pointer" like={like} />
			</div>
		</>
	);
}

export default likes;
