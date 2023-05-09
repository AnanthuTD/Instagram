import Image from "next/image";
import { useContext } from "react";
import React from "react";
import { UserContextProvider, useUserContext } from "./context/userContext";

interface AvatarUsernameProps{
    height:number;
    width:number;
   className:string
}

function AvatarUsername({height=60,width=60, className=''}:AvatarUsernameProps) {
    const {user} = useUserContext()
    let username = user?.username
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
