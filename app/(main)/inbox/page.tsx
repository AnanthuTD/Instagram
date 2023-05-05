import CreateMessage from "../../components/message/create";
import DropDown from "../../components/message/dropdown";
import AccountMessage from "../../components/message/accountMessage";
import React from "react";

function messages() {
	return (
		<div className="w-full flex justify-center bg-_grey p-5">
			<div className="w-3/5 rounded bg-black flex border border-border_grey">
				<div className="w-2/5 border-r border-border_grey">
          {/* top */}
					<div className="w-full flex border-b border-border_grey">
            <div className="w-1/6"></div>
						<div className="flex w-4/6 justify-center gap-1 p-4 font-bold">
							<span>username</span>
							<DropDown className="" stroke="white"/>
						</div>
            <div className="w-1/6 flex items-center">

            <CreateMessage stroke="white" className="cursor-pointer"/>
            </div>
					</div>
          {/* users */}
          < AccountMessage width={60} height={60}/>
				</div>

				<div className="w-3/5"></div>
			</div>
		</div>
	);
}

export default messages;
