import Image from "next/image";
import SettingsIcon from "../svg/settings";
import { useState } from "react";
import Posts from "../profile/posts";
import Saved from "../profile/saved";
import Tagged from "../profile/tagged";
import SettingsPopUp from "../profile/settings";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import React from "react";


function profile() {
	// useStates
	const [post, setPost] = useState(true);
	const [saved, setSaved] = useState(false);
	const [tagged, setTagged] = useState(false);
	const [settings, setSettings] = useState(false)

	// context
	const User = useContext(UserContext);

	let username = User?.username || ""
	let last_name = User?.last_name || ""
	let first_name = User?.first_name || ""
	let full_name = first_name+" "+last_name

	const PostStyle = {
		color: post ? "white" : "gray",
		borderTopColor: post ? "white" : '',
		borderTop: post ? "solid 0.1px" : '',
		cursor: "pointer",
		padding: "10px",
	};
	const SavedStyle = {
		color: saved ? "white" : "gray",
		borderTopColor: tagged ? "white" : '',
		borderTop: saved ? "solid 0.1px" : '',
		cursor: "pointer",
		padding: "10px",
	};
	const TaggedStyle = {
		color: tagged ? "white" : "gray",
		borderTopColor: saved ? "white" : '',
		borderTop: tagged ? "solid 0.1px" : '',
		cursor: "pointer",
		padding: "10px",
	};

	return (
		<div className="flex w-full bg-black justify-center">
			<div
				className="flex bg-black w-full"
				style={{ minWidth: "600px", maxWidth: "1000px" }}
			>
				<div className="w-full" style={{}}>
					{/* top */}
					<div className="flex gap-10 m-10">
						<div style={{ marginInline: "4.5rem" }}>
							<Image
								alt=""
								src={"/images/pro-pic.jpg"}
								width={130}
								height={130}
								className="rounded-full cursor-pointer"
							/>
						</div>
						<div className="space-y-5">
							<div className="flex gap-5 items-center">
								<p className="m-0 text-xl font-medium">
									{username}
								</p>
								<button className="bg-white rounded-md text-black text-sm font-bold py-1 px-4 cursor-pointer">
									Edit profile
								</button>
								<div style={{ width: "30px" }} onClick={()=>setSettings(true)}>
									<SettingsIcon className='cursor-pointer'/>
									{settings?<SettingsPopUp settings={settings} setSettings={setSettings}/>:null}
								</div>
							</div>

							<div className="flex gap-10">
								<span>
									<span className="font-bold">1</span> post
								</span>
								<span className="cursor-pointer">
									<span className="font-bold">179</span>{" "}
									followers
								</span>
								<span className="cursor-pointer">
									<span className="font-bold">187</span>{" "}
									following
								</span>
							</div>

							<div>
								<p className="font-bold">{full_name}</p>
								<p className="text-sm">{first_name}</p>
							</div>
						</div>
					</div>
					<hr className="" style={{ borderColor: "#363837" }} />
					{/* bottom */}
					<div>
						<div
							className="flex w-full justify-center"
							style={{ height: "fit-content" }}
						>
							<div className="flex gap-12 text-sm">
								<div
									style={PostStyle}
									onClick={() => {
										setPost(true);
										setSaved(false);
										setTagged(false);
									}}
								>
									POSTS
								</div>
								<div
									style={SavedStyle}
									onClick={() => {
										setPost(false);
										setSaved(true);
										setTagged(false);
									}}
								>
									SAVED
								</div>
								<div
									style={TaggedStyle}
									onClick={() => {
										setPost(false);
										setSaved(false);
										setTagged(true);
									}}
								>
									TAGGED
								</div>
							</div>
						</div>
						<div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 justify-between w-full">
							{post ? <Posts /> : null}
							{saved ? <Saved /> : null}
							{tagged ? <Tagged /> : null}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default profile;
