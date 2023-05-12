import { UUID } from "crypto";
import React, { useEffect, useRef, useState } from "react";
import { Url } from "url";
import Image from "next/image";
import timeDifference from "@/utils/time_difference";

interface commentsInterface {
	id: UUID;
	author: string;
	comment: string;
	time_stamp: Date;
	profile_img: Url;
}

function comments({
	post_id,
	setComments,
}: {
	post_id: UUID;
	setComments: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const elevatedDiv = useRef<HTMLDivElement | null>(null);
	const [currentComments, setCurrentComments] =
		useState<commentsInterface[]>();

	function getComments() {
		fetch(`/api/post/comments/?post_id=${post_id}`, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.status) {
					// comments retrieved successfully, do something with the comment data
					console.log(data.comments);
					setCurrentComments(data.comments);
				} else {
					// error retrieving comments, handle the error
					console.error(data.message);
				}
			})
			.catch((error) => {
				console.error("Error retrieving comments:", error);
			});
	}

	useEffect(() => {
		getComments();
		function handleClickOutside(this: Document, ev: MouseEvent) {
			if (
				elevatedDiv &&
				!elevatedDiv.current?.contains(ev.target as Node)
			) {
				setComments(false);
			}
		}

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<>
			<div
				className="absolute inset-0 flex justify-center items-center bg-blackBlur"
				style={{
					zIndex: 15,
				}}
			>
				<div
					className=" h-4/5 w-1/4 bg-elevated rounded-xl overflow-hidden shadow-md transform transition-all duration-500 p-0"
					ref={elevatedDiv}
				>
					{/* header */}
					<div
						className="flex justify-center text-white font-bold p-3 border-b w-full"
						style={{ borderColor: "#3d3d3d", height: "10%" }}
					>
						<div className="w-1/4"></div>
						<div className="w-2/4 justify-center flex items-center">
							Comments
						</div>
						<div className="w-1/4"></div>
					</div>
					<div>
						{currentComments?.map((comment) => (
							<div className="flex py-2">
								<div className="px-5 flex justify-center items-start ">
									<Image
										src={`/api${comment.profile_img}`}
										alt=""
										className="rounded-full aspect-square"
										width={35}
										height={35}
									/>
								</div>
								<div>
									<span className="text-base">
										<span className="font-bold">{comment.author}</span> {comment.comment}
									</span>
									<footer>
										<span className="text-xs">
											{timeDifference(comment.time_stamp)}
										</span>{" "}
									</footer>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default comments;
