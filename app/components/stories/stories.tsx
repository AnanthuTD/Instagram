import ArrowLeft from "./arrowLeft";
import ArrowRight from "./arrowRight";
import Rings from "./rings";
import { useEffect, useState } from "react";

function Stories() {
	const [scrollLeft, setscrollLeft] = useState(false);
	const [scrollRight, setscrollRight] = useState(false);

	let data = Array(9).fill(null);
	const stories = data.map((_, index) => (
		<>
			<Rings avatar="/images/default_profile.png" />
			<div className="px-2"></div>
		</>
	));

	useEffect(() => {
		if (data.length > 8) {
			setscrollRight(true);
		}
	}, []);

	function handleClickRight() {
		const container = document.getElementById("scroll-container");
		const containerWidth = container?.getBoundingClientRect().width || 0;
		const contentWidth = container?.scrollWidth || 0;
		const scrollAmount = containerWidth / 2;

		if (container && contentWidth - container.scrollLeft > containerWidth) {
			container.scrollBy({ left: scrollAmount, behavior: "smooth" });
			if (scrollLeft !== true) {
				setscrollLeft(true);
			}
			if (contentWidth - container.scrollLeft === contentWidth) {
				setscrollRight(false);
			}
		}
	}

	function handleClickLeft() {
		const container = document.getElementById("scroll-container");
		const containerWidth = container?.getBoundingClientRect().width || 0;
		const contentWidth = container?.scrollWidth || 0;
		const scrollAmount = containerWidth / 2;

		if (container && container.scrollLeft !== 0) {

			container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
			if (scrollRight !== true) {
				setscrollRight(true);
			}

			if (container.scrollLeft + containerWidth >= contentWidth) {
				setscrollLeft(false);
			}
		}
	}

	return (
		<>
			<div
				className="flex relative"
				style={{ height: "fit-content", maxWidth: "685px" }}
			>
				{/* scroll left */}
				{scrollLeft ? (
					<div
						className="flex items-center absolute top-0 bottom-0 left-10 z-10 cursor-pointer"
						onClick={() => {
							handleClickLeft();
						}}
					>
						{data.length > 8 ? <ArrowLeft /> : null}
					</div>
				) : null}
				{/* stories */}
				<div
					className="overflow-x-scroll overflow-y-hidden no-scrollbar pointer-events-auto"
					style={{
						height: "fit-content",
						maxWidth: "685px",
					}}
					id="scroll-container"
				>
					<div className="flex" style={{ height: "fit-content" }}>
						{stories}
						<Rings />
					</div>
				</div>
				{/* more stories... */}
				{scrollRight ? (
					<div
						className="flex items-center absolute top-0 bottom-0 right-10 z-10 cursor-pointer"
						onClick={() => {
							handleClickRight();
						}}
					>
						{data.length > 8 ? <ArrowRight /> : null}
					</div>
				) : null}
			</div>
		</>
	);
}

export default Stories;
