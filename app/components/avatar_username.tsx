import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

interface AvatarUsernameProps{
    height:number;
    width:number;
   className:string
}

function AvatarUsername({height,width, className}:AvatarUsernameProps) {
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

AvatarUsername.defaultProps = {
    width: 60,
    height: 60,
    className:''
}

export default AvatarUsername;
