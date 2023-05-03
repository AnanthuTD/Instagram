import SeeAll from "./brightBlueButton";
import AccountsSM from "./accounts-sm";
import React from "react";
function suggestedForYou() {
    let array = [1, 2, 3, 4, 5];
    return (
        <>
            <div className="flex">
                <p className="text-gray-500 text-sm font-bold">
                    Suggested for you
                </p>
                <SeeAll text="See All" color="white" />
            </div>
            {array.map((id) => (
                <AccountsSM key={id}/>
            ))}

            <div className="flex my-5">
                <ul className="list-none flex flex-wrap text-xs text-gray-500">
                    <li className="hover:underline cursor-pointer">About</li>
                    <li className="mx-1">.</li>
                    <li className="hover:underline cursor-pointer">Help</li>
                    <li className="mx-1">.</li>
                    <li className="hover:underline cursor-pointer">Press</li>
                    <li className="mx-1">.</li>
                    <li className="hover:underline cursor-pointer">API</li>
                    <li className="mx-1">.</li>
                    <li className="hover:underline cursor-pointer">Jobs</li>
                    <li className="mx-1">.</li>
                    <li className="hover:underline cursor-pointer">Privacy</li>
                    <li className="mx-1">.</li>
                    <li className="hover:underline cursor-pointer">Terms</li>
                    <li className="mx-1">.</li>
                    <li className="hover:underline cursor-pointer">Locations</li>
                    <li className="mx-1">.</li>
                    <li className="hover:underline cursor-pointer">Language</li>
                    <li className="mx-1">.</li>
                    <li className="hover:underline cursor-pointer">English</li>
                    <li className="mx-1">.</li>
                    <li className="hover:underline cursor-pointer">Meta</li>
                    <li className="mx-1">.</li>
                    <li className="hover:underline cursor-pointer">Verified</li>
                    <li className="mx-1">.</li>
                </ul>
            </div>

            <p className="text-xs text-gray-500 my-5">© 2023 INSTAGRAM FROM META</p>
        </>
    );
}

export default suggestedForYou;
