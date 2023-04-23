interface SwitchButtonProps {
    text: string;
    color: string;
  }
function SwitchButton({text, color}: SwitchButtonProps){
    return (
        <>
            <button className={`ml-auto text-xs text-${color} font-bold`}>
                {text}
            </button>
        </>
    );
}
SwitchButton.defaultProps = {
    color:'brightBlue',
  };
  
export default SwitchButton;
