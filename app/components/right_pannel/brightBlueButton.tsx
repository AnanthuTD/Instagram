interface SwitchButtonProps {
    text: string;
    color: string;
  }
function SwitchButton({text, color= '#00c2f7'}: SwitchButtonProps){
   /*  if(!color){
        color = '#00c2f7'
    } */
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
