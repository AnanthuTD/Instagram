import React, { useState } from "react";
import StoriesView from "./storiesView";
import { Story } from "@/utils/Interfaces";

interface SlideProps {
	stories: Story[];
}

const StorySlide = ({ stories }: SlideProps) => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const previousSlide = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		setCurrentSlide((prevSlide) =>
			prevSlide === 0 ? stories.length - 1 : prevSlide - 1
		);
	};

	const nextSlide = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		setCurrentSlide((prevSlide) =>
			prevSlide === stories.length - 1 ? 0 : prevSlide + 1
		);
	};

	const currentStory = stories[currentSlide];
	const previousStory = currentSlide === 0 ? null : stories[currentSlide - 1];
	const nextStory =
		currentSlide === null ? stories[0] : stories[currentSlide + 1];

	return (
		<div className="flex h-full items-center justify-between p-5">
			<button
				className="rounded bg-gray-200 px-4 py-2 text-gray-700"
				onClick={previousSlide}
			>
				Previous
			</button>
			<div className="flex h-full w-full gap-3 overflow-x-scroll">
				<div className="h-full w-1/3">
					{previousStory ? (
						<div className="flex h-full w-full items-center justify-center rounded-lg bg-elevated p-2">
							<div className="overflow-hidden rounded bg-elevated">
								<StoriesView story={previousStory} />
							</div>
						</div>
					) : null}
				</div>
				<div className="flex h-full w-1/3 items-center justify-center rounded-lg bg-elevated p-2">
					<div className="overflow-hidden rounded bg-elevated">
						<StoriesView story={currentStory} />
					</div>
				</div>
				<div className="h-full w-1/3">
					{nextStory ? (
						<div className="flex h-full w-full items-center justify-center rounded-lg bg-elevated p-2">
							<div className="overflow-hidden rounded bg-elevated">
								<StoriesView story={nextStory} />
							</div>
						</div>
					) : null}
				</div>
			</div>
			<button
				className="rounded bg-gray-200 px-4 py-2 text-gray-700"
				onClick={nextSlide}
			>
				Next
			</button>
		</div>
	);
};

export default StorySlide;
