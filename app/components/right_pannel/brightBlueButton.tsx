interface SwitchButtonProps {
    text: string;
    color: string;
  }
function SwitchButton({text, color}: SwitchButtonProps){
    if(!color){
        color = '#00c2f7'
    }
    return (
        <>
            <button className={`ml-auto text-xs font-bold`} style={{color:color}}>
                {text}
            </button>
        </>
    );
}

export default SwitchButton;
