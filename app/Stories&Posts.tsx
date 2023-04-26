import { ChangeEvent, useEffect, useState } from "react";
import CommentIcon from "./components/posts/commentIcon";
import Like from "./components/posts/heart";
import OptionsIcon from "./components/posts/optionsIcon";
import SaveIcon from "./components/posts/saveIcon";
import SendIcon from "./components/posts/sendIcon";
import SmileIcon from "./components/posts/smileIcon";
import Rings from "./components/stories/rings";
import Stories from "./components/stories/stories";

function StoriesPosts() {
	const [comment, setComment] = useState("");
	const [post, setPost] = useState(false);
	const [like, setLike] = useState(false);
	const [saved, setSaved] = useState(false);

	useEffect(() => {
		if (comment) {
			setPost(true);
		} else {
			setPost(false);
		}
	}, [comment]);

	return (
		<>
			<div className="" style={{ maxWidth: "685px" }}>
				<div className="" style={{ height: "fit-content" }}>
					<Stories />
				</div>
				<div className="flex justify-center h-full pt-10">
					<div className="w-4/6 h-full">
						<div className="aspect-[4/5] w-full">
							<div
								className="flex justify-between items-center"
								style={{ height: "fit-content" }}
							>
								<div className="flex gap-2 items-center">
									<div className="flex gap-2 items-center cursor-pointer">
										<Rings width={"50px"} />
										<span>username</span>
									</div>
									<span
										className="rounded-full"
										style={{
											width: "5px",
											height: "5px",
											backgroundColor: "gray",
										}}
									></span>
									<span style={{ color: "gray" }}>time</span>
								</div>
								<div className="">
									<OptionsIcon />
								</div>
							</div>

							{/* post */}
							<img
								src="/images/pro-pic.jpg"
								alt="not found"
								className="w-full h-full rounded mt-2"
							/>
						</div>
						<div className="p-2"></div>
						<footer className="w-full space-y-2">
							<div
								className="flex justify-between items-center"
								style={{ height: "fit-content" }}
							>
								<div className="flex gap-2">
									<div onClick={() => setLike(!like)}>
										<Like
											className="cursor-pointer"
											like={like ? true : false}
										/>
									</div>
									<CommentIcon
										stroke="white"
										className="cursor-pointer"
									/>
									<SendIcon
										stroke="white"
										className="cursor-pointer"
									/>
								</div>
								<div onClick={()=>setSaved(!saved)}>
									<SaveIcon
										stroke='white'
										fill={saved ? "white" : "none"}
									/>
								</div>
							</div>
							<div className="flex gap-1 text-sm cursor-pointer">
								avatar(3)
								<span>Liked by</span>{" "}
								<span className="font-bold cursor-pointer">
									username
								</span>{" "}
								<span>and</span>
								<span className="font-bold cursor-pointer">
									number others
								</span>
							</div>
							<div className="flex items-center">
								<input
									type="text"
									className="border-none bg-transparent text-sm outline-none w-full"
									placeholder="Add a comment..."
									onChange={(e) => setComment(e.target.value)}
								/>
								<div className="flex gap-2 cursor-pointer">
									{post ? (
										<span className="text-xs font-bold text-brightBlue">
											POST
										</span>
									) : null}
									<SmileIcon />
								</div>
							</div>
						</footer>
					</div>
				</div>
			</div>
		</>
	);
}

export default StoriesPosts;
