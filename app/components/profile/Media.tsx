import React, { useEffect, useRef } from "react";
import { isImageFile, isVideoFile } from "@/utils/video_or_image";
import { Post } from "@/utils/Interfaces";

function Media({ post }: { post: Post }) {
	const videoRef = useRef<HTMLVideoElement>(null);
	useEffect(() => {
		const videoElement = videoRef.current;

		const handleMouseOver = () => {
			if (videoElement) {
				videoElement.play();
			}
		};

		const handleMouseOut = () => {
			if (videoElement) {
				videoElement.pause();
			}
		};

		if (videoElement) {
			// console.log("in");

			videoElement.addEventListener("mouseover", () =>
				videoElement.play()
			);
			videoElement.addEventListener("mouseout", handleMouseOut);
		}

		return () => {
			if (videoElement) {
				videoElement.removeEventListener("mouseover", handleMouseOver);
				videoElement.removeEventListener("mouseout", handleMouseOut);
			}
		};
	}, []);
	return (
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
					ref={videoRef}
				></video>
			) : null}
		</div>
	);
}

export default Media;
