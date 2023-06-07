import React, { useRef } from "react";
import { isImageFile, isVideoFile } from "@/utils/video_or_image";
import { Story } from "@/utils/Interfaces";

function StoriesView({ story }: { story: Story }) {
	const videoRef = useRef<HTMLVideoElement>(null);

	return (
		<>
			<div className="flex justify-center overflow-hidden">
				{isImageFile(story.file) ? (
					<img
						src={`api/${story.file}`}
						alt="not found"
						style={{
							// maxWidth: "max-content",
							maxHeight: "max-content",
						}}
					/>
				) : null}
				{isVideoFile(story.file) ? (
					<video
						src={`api/${story.file}`}
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
		</>
	);
}

export default StoriesView;
