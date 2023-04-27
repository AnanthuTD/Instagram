interface SwitchButtonProps {
    text: string;
    color: string;
  }
function SwitchButton({text, color}: SwitchButtonProps){
    return (
        <>
            <button className={`ml-auto text-xs font-bold`} style={{color:color}}>
                {text}
            </button>
        </>
    );
}

SwitchButton.defaultProps = {
    color: '#00c2f7'
}

export default SwitchButton;
