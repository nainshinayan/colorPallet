import React from 'react';
import TrashIcon from '../resource/TrashIcon.svg';
import '../css/ColorBlock.css';

const ColorBlock = ({colorDetail,handleClick,showDelete}) => {
    let colorCode = "#"+ colorDetail.hex;
    let icon = showDelete 
    ? (<>
            <div className="DeleteIconStyle"><img src={TrashIcon}/></div>
            <div style = {{clear:"both"}}/>
        </>)
    : "";
    function showName(){
        console.log("on hover ",colorDetail.title)
    }

    function hideName(){

    }
    return(
        <>
            <div 
                className="Block" 
                style={{backgroundColor: colorCode}} 
                onClick= {handleClick}
                onMouseEnter={() => showName()}
                onMouseLeave={() => hideName()}>
                    {icon}
                <div className={showDelete ? "NameInCart" : "NameInPalette"}>
                    {colorCode}
                </div>
                {/* <div className={showDelete ? "NameInCart" : "NameInPalette"}>Add {colorDetail.title}</div> */}
            </div>
        </>
    )
}
export default ColorBlock;