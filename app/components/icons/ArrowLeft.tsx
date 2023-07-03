import React from "react";
import { SvgProps } from "../../../utils/Interfaces";
interface ArrowLeft extends SvgProps {
	onClick?: () => void;
}
function ArrowLeft({
	stroke = "currentColor",
	fill = "none",
	className = "",
	onClick,
}: ArrowLeft) {
	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className={["h-6 w-6", className].join(" ")}
				onClick={() => (onClick ? onClick() : null)}>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
				/>
			</svg>
		</>
	);
}

export default ArrowLeft;
