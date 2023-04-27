import Image from "next/image";
import SwitchButton from "./brightBlueButton";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

function accounts() {
    const User = useContext(UserContext)
    let username = User?.username
    return (
        <>
           
                <div className="flex cursor-pointer">
                    <Image
                        src="/images/pro-pic.jpg"
                        width={60}
                        height={60}
                        alt=""
                        className="rounded-full"
                    />
                    <p className="flex items-center mx-4">{username}</p>
                    <SwitchButton text="Switch" />
                </div>
            
        </>
    );
}

export default accounts;
