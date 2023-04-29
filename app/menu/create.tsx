import { Dispatch, SetStateAction, useState, useRef, useEffect } from "react";
import { MenuState } from "../Interfaces";
import PictureAndVideo from "../components/create/pictureAndVideo";
import Image from "next/image";
interface CreateProps {
	setMenu: Dispatch<SetStateAction<MenuState>>;
	menu: MenuState;
}

function create({ setMenu, menu }: CreateProps) {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const formSubmitRef = useRef<HTMLFormElement | null>(null);
	const elevatedDiv = useRef<HTMLDivElement | null>(null);
	const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
	const [formData, setFormData] = useState<FormData | null>(null);

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

	const handleSubmit = () => {
		console.log("handleSubmit");
		
	};

	useEffect(() => {
		if (selectedFile) {
			console.log(selectedFile);

			let reader = new FileReader();
			reader.onload = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(selectedFile);
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
					className="aspect-square h-5/6 bg-elevated rounded-xl shadow-md transform transition-all duration-500 p-0"
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
								onClick={handleSubmit}
							>
								Next
							</button>
						</div>
					</div>
					{/* content */}
					<div
						className="flex w-full justify-center overflow-hidden rounded-b-xl"
						style={{ height: "90%" }}
					>
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
						) : (
							preview && (
								<img
									src={preview as string}
									alt={`Preview of ${selectedFile?.name}`}
									style={{
										maxWidth: "max-content",
										maxHeight: "max-content",
									}}
								/>
							)
						)}
						<div className="w-1/2">1</div> 
					</div>
				</div>
			</div>
		</>
	);
}

export default create;
