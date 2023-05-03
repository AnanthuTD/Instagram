import React from "react";

interface previewProps {
	preview: string;
	name: string;
	type: string;
}

function preview({ preview, name, type }: previewProps) {
	if (type.startsWith("image/")) {
		return (
			<>
				<img
					src={preview as string}
					alt={`Preview of ${name}`}
					style={{
						maxWidth: "max-content",
						maxHeight: "max-content",
					}}
				/>
			</>
		);
	} else if (type.startsWith("video/")) {
		return (
			<>
				<div className="h-full w-full flex justify-center items-center">
					<span>video support is currently under development</span>
				</div>
			</>
		);
	} else {
		return (
			<>
				<div className="h-full w-full flex justify-center items-center">
					<span>not supported file type</span>
				</div>
			</>
		);
	}
}

export default preview;
