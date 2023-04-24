"use client";

import ArrowRight from "./arrowRight";
import Rings from "./rings";
import {useOverflowContext} from "../../context/scrollContext";
import { useEffect } from "react";

function Stories() {
    const {setOverflowHidden, overflowHidden} = useOverflowContext()

    let data = Array(9).fill(null);
    const stories = data.map((_, index) => (
        <>
            <Rings avatar="/images/default_profile.png" />
            <div className="px-2"></div>
        </>
    ));

    function handleClick() {
        undefined;
    }

    useEffect(() => {
     console.log('overflowHidden : ', overflowHidden);
     
    }, [overflowHidden])
    

    return (
        <>
            <div
                className="flex relative"
                style={{ height: "fit-content", maxWidth: "685px" }}
            >
                {/* scrollable div */}
                <div
                    className="overflow-x-scroll overflow-y-hidden no-scrollbar pointer-events-auto"
                    style={{ height: "fit-content", maxWidth: "685px" }}
                   onMouseEnter={()=>{
                    console.log('focus');
                    
                    setOverflowHidden(true)
                   }}
                   onMouseLeave={()=>{
                    setOverflowHidden(false)
                   }}
                   tabIndex={0} 
                  
                >
                    <div className="flex" style={{ height: "fit-content" }}>
                        {stories}
                        <Rings />
                    </div>
                </div>
                {/* more stories... */}
                <div
                    className="flex items-center absolute top-0 bottom-0 right-10 z-10 cursor-pointer"
                    onClick={() => {
                        handleClick();
                    }}
                >
                    {data.length > 8 ? <ArrowRight /> : null}
                </div>
            </div>
        </>
    );
}

export default Stories;
