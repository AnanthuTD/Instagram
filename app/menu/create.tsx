import { Dispatch, SetStateAction } from "react";
import { MenuState } from "../Interfaces";
import PictureAndVideo from "../components/create/pictureAndVideo";
interface CreateProps {
	setMenu: Dispatch<
		SetStateAction<MenuState>
	>
	menu: MenuState
}

function create({setMenu, menu}:CreateProps) {
	return (
		<>
			<div
				className="absolute inset-0 flex justify-center items-center"
				style={{ minHeight: "380px", minWidth: "380px" }}
				onClick={() =>
					setMenu({...menu, 'create': false} )
				}
			>
				<div className="aspect-square h-5/6 bg-elevated rounded-xl shadow-md transform transition-all duration-500">
					<div
						className="flex justify-center text-white font-bold p-3 border-b w-full"
						style={{ borderColor: "#3d3d3d" }}
					>
						Create new post
					</div>
					<div
						className="flex w-full justify-center"
						style={{ height: "inherit" }}
					>
						<div className="space-y-3 justify-center flex flex-col items-center">
							<PictureAndVideo fill="white" />
							<p>Drag photos and videos here</p>
							<button className="rounded-lg bg-blue-500 text-white p-2 font-bold text-sm">
								Select from computer
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default create;
