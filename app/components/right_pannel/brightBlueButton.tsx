import React from "react";

interface SwitchButtonProps {
    text?: string;
    color?: string;
  }
function SwitchButton({text="", color='#00c2f7'}: SwitchButtonProps){
    return (
        <>
            <button className={`ml-auto text-xs font-bold`} style={{color:color}}>
                {text}
            </button>
        </>
    );
}


export default SwitchButton;
