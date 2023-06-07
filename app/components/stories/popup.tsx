import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Story } from "@/utils/Interfaces";
import StoriesSlide from "./storySlide";

interface StoriesView {
	stories: Story[];
	onClose: () => void;
	file?: string;
}

function Popup({ stories, onClose }: StoriesView) {
	const [isOpen, setIsOpen] = useState(true);

	const handleClose = () => {
		setIsOpen(false);
		onClose();
	};

	return (
		<Transition.Root show={isOpen} as={React.Fragment}>
			<Dialog
				as="div"
				className="fixed inset-0 z-50 overflow-y-auto"
				onClose={handleClose}
			>
				{/* The backdrop, rendered as a fixed sibling to the panel container */}
				<div className="fixed inset-0 bg-black" aria-hidden="true" />

				{/* Full-screen container to center the panel */}
				<div className="fixed inset-0 flex items-center justify-center p-4">
					<Dialog.Panel className="flex h-full items-center">
						<button
							className="text-white absolute right-0 top-0 m-4 rounded p-1 outline outline-2 outline-red-700 hover:bg-red-700 hover:text-white"
							onClick={handleClose}
						>
							Close
						</button>
						<StoriesSlide stories={stories} />
					</Dialog.Panel>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

export default Popup;
