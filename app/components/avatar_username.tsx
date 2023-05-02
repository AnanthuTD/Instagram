import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

interface AvatarUsernameProps{
    height:number;
    width:number;
   className:string
}

function AvatarUsername({height=60,width=60, className=''}:AvatarUsernameProps) {
    const User = useContext(UserContext)
    let username = User?.username
    return (
        <>
           
                <div className="flex cursor-pointer">
                    <Image
                        src="/images/pro-pic.jpg"
                        width={width}
                        height={height}
                        alt=""
                        className="rounded-full"
                    />
                    <p className={`flex items-center mx-4 ${className}`}>{username}</p>
                   
                </div>
            
        </>
    );
}

export default AvatarUsername;
