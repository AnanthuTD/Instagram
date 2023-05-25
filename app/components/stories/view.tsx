import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Story } from "@/utils/Interfaces";

interface StoriesView{
    stories: Story[];
    onClose:()=>void;
    file?:string;
}

function Popup({ file, onClose }:StoriesView) {
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
				<div className="flex min-h-screen items-center justify-center">
					<Transition.Child
						as={React.Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
					</Transition.Child>

					<Transition.Child
						as={React.Fragment}
						enter="ease-out duration-300 transform"
						enterFrom="scale-50 opacity-0"
						enterTo="scale-100 opacity-100"
						leave="ease-in duration-200 transform"
						leaveFrom="scale-100 opacity-100"
						leaveTo="scale-50 opacity-0"
					>
						<div className="max-w-full rounded-lg bg-white p-4">
							<button
								className="absolute right-0 top-0 m-4 text-gray-500 hover:text-gray-700"
								onClick={handleClose}
							>
								Close
							</button>

							{/* Render the file based on the fileUrl */}
							{file && (
								<div className="flex items-center justify-center">
									{file.endsWith(".jpg") ||
									file.endsWith(".png") ? (
										<img
											src={file}
											alt="Image"
											className="max-h-full"
										/>
									) : file.endsWith(".mp4") ? (
										<video
											src={file}
											controls
											className="max-h-full"
										></video>
									) : (
										<p>Unsupported file format</p>
									)}
								</div>
							)}
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

export default Popup;
