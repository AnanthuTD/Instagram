import React from "react";
import ArrowLeft from "./arrowLeft";
import ArrowRight from "./arrowRight";
import Rings from "./rings";
import View from "./popup";
import { useEffect, useState } from "react";
import { Story } from "@/utils/Interfaces";

function Stories() {
	const [scrollLeft, setscrollLeft] = useState(false);
	const [scrollRight, setscrollRight] = useState(false);
	const [stories, setStories] = useState<Story[]>([]);

	const [showPopup, setShowPopup] = useState(false);

	const openPopup = () => {
		// setFileUrl(url);
		setShowPopup(true);
	};

	const closePopup = () => {
		setShowPopup(false);
		// setFileUrl("");
	};

	useEffect(() => {
		if (stories.length > 8) {
			setscrollRight(true);
		}

		async function fetchStories() {
			fetch("api/post/stories/").then((response) =>
				response.json().then((data) => setStories(data.stories))
			);
		}

		fetchStories();
	}, []);

	function handleClickRight() {
		const container = document.getElementById("scroll-container");
		const containerWidth = container?.getBoundingClientRect().width || 0;
		const contentWidth = container?.scrollWidth || 0;
		const scrollAmount = containerWidth / 2;

		if (container && contentWidth - container.scrollLeft > containerWidth) {
			container.scrollBy({ left: scrollAmount, behavior: "smooth" });
			if (scrollLeft !== true) {
				setscrollLeft(true);
			}
			if (contentWidth - container.scrollLeft === contentWidth) {
				setscrollRight(false);
			}
		}
	}

	function handleClickLeft() {
		const container = document.getElementById("scroll-container");
		const containerWidth = container?.getBoundingClientRect().width || 0;
		const contentWidth = container?.scrollWidth || 0;
		const scrollAmount = containerWidth / 2;

		if (container && container.scrollLeft !== 0) {
			container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
			if (scrollRight !== true) {
				setscrollRight(true);
			}

			if (container.scrollLeft + containerWidth >= contentWidth) {
				setscrollLeft(false);
			}
		}
	}

	useEffect(() => {
	 console.log(stories);
	 
	}, [stories])
	

	return (
		<>
			<div
				className="relative flex"
				style={{ height: "fit-content", maxWidth: "685px" }}
			>
				{/* scroll left */}
				{scrollLeft ? (
					<div
						className="absolute bottom-0 left-10 top-0 z-10 flex cursor-pointer items-center"
						onClick={() => {
							handleClickLeft();
						}}
					>
						{stories.length > 8 ? <ArrowLeft /> : null}
					</div>
				) : null}
				{/* stories */}
				<div
					className="overflow-y-hidden overflow-x-scroll no-scrollbar pointer-events-auto"
					style={{
						height: "fit-content",
						maxWidth: "685px",
					}}
					id="scroll-container"
				>
					<div className="flex" style={{ height: "fit-content" }}>
						{stories.length>0 &&
							stories.map((story) => {
								return (
									<React.Fragment key={`RingKey${story.id}`}>
										<Rings
											key={`RingKey${story.id}`}
											avatar={'api/'+story.profile_img}
											onClick={() => openPopup()}
										/>
										<div className="px-2"></div>
									</React.Fragment>
								);
							})}
					</div>
				</div>
				{/* more stories... */}
				{scrollRight ? (
					<div
						className="absolute bottom-0 right-10 top-0 z-10 flex cursor-pointer items-center"
						onClick={() => {
							handleClickRight();
						}}
					>
						{stories.length > 8 ? <ArrowRight /> : null}
					</div>
				) : null}
			</div>
			{/* Render the popup */}
			{showPopup && <View stories={stories} onClose={closePopup} />}
		</>
	);
}

export default Stories;
