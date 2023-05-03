import Cookies from "js-cookie";
import React, { useEffect, useRef, Dispatch, SetStateAction, useState } from "react";

function settings({
	setSettings,settings
}: {
	setSettings: Dispatch<SetStateAction<boolean>>;
	settings:boolean
}) {
	// useState
	const [cancel, setCancel] = useState(false)

	// ref
	const elevatedDiv = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		function handleClickOutside(this: Document, ev: MouseEvent) {
			if (
				elevatedDiv &&
				!elevatedDiv.current?.contains(ev.target as Node)
			)
				{setSettings(false)}
		
		}

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		if(cancel)
			setSettings(false);
	},[cancel])

	function logout() {
		fetch('api/accounts/logout/')
		window.location.reload();
		Cookies.remove('csrftoken')
		Cookies.remove('user')
	}

	return (
		<>
			<div
				className="absolute inset-0 flex justify-center items-center bg-blackBlur"
				style={{
					minHeight: "380px",
					minWidth: "380px",
					height: "100%",
					zIndex: 15,
				}}
			>
				<div
					className="w-1/5 bg-elevated rounded-xl overflow-hidden shadow-md"
					
					ref={elevatedDiv}
				>
					<div className="text-primaryText text-sm flex justify-center items-center cursor-pointer p-3 border-b border-border_grey">Apps and Websites</div>
					<div className="text-primaryText text-sm flex justify-center items-center cursor-pointer p-3 border-b border-border_grey">QR Code</div>
					<div className="text-primaryText text-sm flex justify-center items-center cursor-pointer p-3 border-b border-border_grey">Notification</div>
					<div className="text-primaryText text-sm flex justify-center items-center cursor-pointer p-3 border-b border-border_grey">Settings and Privacy</div>
					<div className="text-primaryText text-sm flex justify-center items-center cursor-pointer p-3 border-b border-border_grey">Supervision</div>
					<div className="text-primaryText text-sm flex justify-center items-center cursor-pointer p-3 border-b border-border_grey" onClick={()=>logout()}>Log Out</div>
					<div className="text-primaryText text-sm flex justify-center items-center cursor-pointer p-3" onClick={()=>setCancel(true)}>Cancel</div>
				</div>
			</div>
		</>
	);
}

export default settings;
