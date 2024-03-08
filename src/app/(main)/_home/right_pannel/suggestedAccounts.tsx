import SeeAll from "./brightBlueButton";
import AccountsSM from "./accounts-sm";
import React from "react";
function suggestedForYou() {
	let array = [1, 2, 3, 4, 5];
	return (
		<>
			<div className="flex">
				<p className="text-sm font-bold text-gray-500">
					Suggested for you
				</p>
				<SeeAll text="See All" color="white" />
			</div>
			{array.map((id) => (
				<AccountsSM key={id} />
			))}

			<div className="my-5 flex">
				<ul className="flex list-none flex-wrap text-xs text-gray-500">
					<li className="cursor-pointer hover:underline">About</li>
					<li className="mx-1">.</li>
					<li className="cursor-pointer hover:underline">Help</li>
					<li className="mx-1">.</li>
					<li className="cursor-pointer hover:underline">Press</li>
					<li className="mx-1">.</li>
					<li className="cursor-pointer hover:underline">API</li>
					<li className="mx-1">.</li>
					<li className="cursor-pointer hover:underline">Jobs</li>
					<li className="mx-1">.</li>
					<li className="cursor-pointer hover:underline">Privacy</li>
					<li className="mx-1">.</li>
					<li className="cursor-pointer hover:underline">Terms</li>
					<li className="mx-1">.</li>
					<li className="cursor-pointer hover:underline">
						Locations
					</li>
					<li className="mx-1">.</li>
					<li className="cursor-pointer hover:underline">Language</li>
					<li className="mx-1">.</li>
					<li className="cursor-pointer hover:underline">English</li>
					<li className="mx-1">.</li>
					<li className="cursor-pointer hover:underline">Meta</li>
					<li className="mx-1">.</li>
					<li className="cursor-pointer hover:underline">Verified</li>
					<li className="mx-1">.</li>
				</ul>
			</div>

			<p className="my-5 text-xs text-gray-500">
				© 2023 INSTAGRAM FROM META
			</p>
		</>
	);
}

export default suggestedForYou;
