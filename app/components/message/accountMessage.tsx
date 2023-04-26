import Image from "next/image";
interface AccountMessageProps {
	width: number;
	height: number;
}
function AccountMessage({ width, height }: AccountMessageProps) {
	return (
		<>
			<div className="flex my-3 cursor-pointer items-center m-4">
				<Image
					src="/images/pro-pic.jpg"
					width={width}
					height={height}
					alt=""
					className="rounded-full"
				/>

				<div style={{ height: "fit-content" }} onClick={()=>null}>
					<p className="flex items-center mx-4 text-sm text-primaryText">username</p>
					<p
						className="flex items-center mx-4 text-sm "
						style={{ color: "rgb(168 168 168)" }}
					>
						Sent you a message
					</p>
				</div>
			</div>
		</>
	);
}
AccountMessage.defaultProps = {
	width: 40,
	height: 40,
};
export default AccountMessage;
