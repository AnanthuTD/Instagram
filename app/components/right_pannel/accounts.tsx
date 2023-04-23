import Image from "next/image";
import SwitchButton from "./brightBlueButton";

function accounts() {
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
                    <p className="flex items-center mx-4">username</p>
                    <SwitchButton text="Switch" color="brightBlue"/>
                </div>
            
        </>
    );
}

export default accounts;
