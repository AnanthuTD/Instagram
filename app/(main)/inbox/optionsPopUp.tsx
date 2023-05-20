import React from "react";
import { Popover } from "@headlessui/react";
import OptionsIcon from "../../components/posts/optionsIcon";

function OptionsPopup({children, height=''}:{children:React.ReactNode, height:String}) {
	

	return (
		<>
			<Popover className="relative flex">
				<div className={["flex items-center mx-3 mt-0"].join(' ')} style={{height:`${height}`}}>
					<Popover.Button className="h-fit outline-none">
						<OptionsIcon />
					</Popover.Button>
				</div>

				<Popover.Panel className="absolute z-10 right-5">
					<div className="text-xs font-bold rounded-full backdrop-blur-sm p-2">
						{children}
					</div>
				</Popover.Panel>
			</Popover>
		</>
	);
}

export default OptionsPopup;
