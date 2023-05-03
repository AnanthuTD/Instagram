import React from "react";

function saved() {
	const Collection = Array(4)
		.fill(null)
		.map(() => {
			return (
				<div className="aspect-square cursor-pointer">
					<div className="rounded bg-white w-full h-full">1</div>
				</div>
			);
		});
	return (
		<>
			<div className="aspect-square" >
				<div className="rounded grid grid-cols-2 w-full bg-white h-full cursor-pointer">
					<div>1</div>
					<div>2</div>
					<div>3</div>
					<div>4</div>
				</div>
			</div>
			{Collection}
		</>
	);
}

export default saved;
