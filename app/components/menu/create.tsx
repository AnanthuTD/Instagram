import { MenuState } from "@/app/utils/Interfaces";
import { fetchCSRF } from "@/app/utils/fetch_csrf";
import { Dispatch, SetStateAction, useState, useRef, useEffect } from "react";
import SmileIcon from "../posts/smileIcon";
import PictureAndVideo from "../create/pictureAndVideo";
import AvatarUsername from "../avatar_username";
import LocationIcon from "../create/locationIcon";
import Preview from "../create/preview";

interface CreateProps {
	setMenu: Dispatch<SetStateAction<MenuState>>;
	menu: MenuState;
}

function create({ setMenu, menu }: CreateProps) {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const formSubmitRef = useRef<HTMLFormElement | null>(null);
	const elevatedDiv = useRef<HTMLDivElement | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [formData, setFormData] = useState<FormData>(new FormData());
	const [location, setLocation] = useState("");
	const [caption, setCaption] = useState("");
	const [submit, setSubmit] = useState(true);
	const [fileAdded, setFileAdded] = useState(false);
	const [video, setVideo] = useState("");

	const handleClick = () => {
		if (fileInputRef.current) fileInputRef.current.click();
	};

	const handleFileInputChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (event.target.files && event.target.files.length > 0) {
			setSelectedFile(event.target.files[0]);
		}
	};

	useEffect(() => {
		function handleClickOutside(this: Document, ev: MouseEvent) {
			if (
				elevatedDiv &&
				!elevatedDiv.current?.contains(ev.target as Node)
			)
				setMenu({ ...menu, create: false });
		}

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	async function postData() {
		const csrfToken = await fetchCSRF();
		fetch("/api/post", {
			method: "POST",
			body: formData,
			headers: {
				"X-CSRFToken": csrfToken,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Success:", data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}

	useEffect(() => {
		if (selectedFile && !formData.has("file")) {
			setFileAdded(true);
			formData.append("file", selectedFile);
			return;
		}
		if (formData.has("file")) {
			formData.append("caption", caption);
			formData.append("location", location);
			// posting data to server
			postData();
		}
	}, [submit, formData]);

	useEffect(() => {
		if (selectedFile) {
			let reader = new FileReader();
			reader.onload = () => {
				setPreview(reader.result as string);
			};
			reader.readAsDataURL(selectedFile);

			const url = URL.createObjectURL(selectedFile);
			setVideo(url);
		}
	}, [selectedFile]);

	return (
		<>
			<div
				className="absolute inset-0 flex justify-center items-center"
				style={{
					minHeight: "380px",
					minWidth: "380px",
					height: "100%",
					zIndex: 15,
				}}
			>
				<div
					className=" h-5/6 bg-elevated rounded-xl overflow-hidden shadow-md transform transition-all duration-500 p-0"
					ref={elevatedDiv}
				>
					{/* header */}
					<div
						className="flex justify-center text-white font-bold p-3 border-b w-full"
						style={{ borderColor: "#3d3d3d", height: "10%" }}
					>
						<div className="w-1/4"></div>
						<div className="w-2/4 justify-center flex items-center">
							Create new post
						</div>
						<div className="w-1/4 flex justify-end">
							<button
								className="rounded text-blue-500 text-sm p-1"
								onClick={() => setSubmit(!submit)}
							>
								Next
							</button>
						</div>
					</div>
					{/* content */}
					<div className="flex" style={{ height: "90%" }}>
						<div className="aspect-square h-full flex justify-center overflow-hidden">
							{!selectedFile ? (
								<div className="space-y-3 justify-center flex flex-col items-center">
									<PictureAndVideo fill="white" />
									<p>Drag photos and videos here</p>
									<button
										className="rounded-lg bg-blue-500 text-white p-2 font-bold text-sm"
										onClick={handleClick}
									>
										Select from computer
									</button>
									<form
										ref={formSubmitRef}
										className=""
										style={{ visibility: "hidden" }}
										encType="multipart/form-data"
									>
										<input
											ref={fileInputRef}
											type="file"
											name="Select from computer"
											onChange={handleFileInputChange}
										/>
									</form>
								</div>
							) : // preview
							selectedFile && preview ? (
								<Preview
									preview={preview}
									name={selectedFile.name}
									type={selectedFile.type}
								/>
							) : null}
						</div>
						{fileAdded ? (
							<div
								className="p-3 space-y-3 border-l"
								style={{
									borderColor: "#3d3d3d",
								}}
							>
								<AvatarUsername
									height={30}
									width={30}
									className="text-sm font-bold text-white"
								/>
								<textarea
									name="caption"
									id="caption"
									cols={30}
									rows={10}
									placeholder="Write a caption..."
									className="bg-transparent resize-none outline-none"
									required={false}
									onChange={(e) => setCaption(e.target.value)}
								></textarea>
								<SmileIcon width="20" height="20" />
								<div className="flex justify-between">
									<input
										type="text"
										placeholder="Add location"
										className="border-none bg-transparent outline-none"
										onChange={(e) =>
											setLocation(e.target.value)
										}
									/>
									<span>
										<LocationIcon />
									</span>
								</div>
							</div>
						) : null}
					</div>
				</div>
			</div>
		</>
	);
}

export default create;
