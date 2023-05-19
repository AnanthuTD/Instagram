import React, { useState } from "react";
import { Popover } from "@headlessui/react";
import OptionsIcon from "../../components/posts/optionsIcon";

function OptionsPopup({children}:{children:React.ReactNode}) {
	

	return (
		<>
			<Popover className="relative flex">
				<div className="flex items-center m-3 mb-7 mt-0">
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
