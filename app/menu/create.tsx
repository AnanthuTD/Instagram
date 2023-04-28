import { Dispatch, SetStateAction, useState, useRef, useEffect } from "react";
import { MenuState } from "../Interfaces";
import PictureAndVideo from "../components/create/pictureAndVideo";
import { NullLiteral } from "typescript";
interface CreateProps {
	setMenu: Dispatch<SetStateAction<MenuState>>;
	menu: MenuState;
}

function create({ setMenu, menu }: CreateProps) {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const formSubmitRef = useRef<HTMLFormElement | null>(null);
	const elevatedDiv = useRef<HTMLDivElement | null>(null);

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
		if (formSubmitRef.current) {
			let file = new FormData(formSubmitRef.current)
		}
	};

	return (
		<>
			<div
				className="absolute inset-0 flex justify-center items-center"
				style={{ minHeight: "380px", minWidth: "380px" }}
			>
				<div
					className="aspect-square h-5/6 bg-elevated rounded-xl shadow-md transform transition-all duration-500"
					ref={elevatedDiv}
				>
					<div
						className="flex justify-center text-white font-bold p-3 border-b w-full"
						style={{ borderColor: "#3d3d3d" }}
					>
						<div className="w-1/4"></div>
						<div className="w-2/4 justify-center flex">
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
					<div
						className="flex w-full justify-center"
						style={{ height: "inherit" }}
					>
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
								action=""
								method="post"
								ref={formSubmitRef}
								encType="multipart/form-data"
							>
								<input
									ref={fileInputRef}
									type="file"
									className="hidden"
									name="Select from computer"
									onChange={handleFileInputChange}
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default create;
