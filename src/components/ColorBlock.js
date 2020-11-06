import React from 'react';
import TrashIcon from '../resource/TrashIcon.svg';
import '../css/ColorBlock.css';

const ColorBlock = ({colorDetail,handleClick,showDelete, showDeleteBlock}) => {
    let colorCode = colorDetail ? "#"+ colorDetail.hex : "#f1f1f1";
    let icon = showDelete 
    ? (<>
            <div className="DeleteIconStyle"><img src={TrashIcon} alt="X"/></div>
            <div style = {{clear:"both"}}/>
        </>)
    : "";

    let deleteBlock = showDeleteBlock ? <img src={TrashIcon} alt="X"/> : ""

    return(
        <>
            <div 
                className="Block" 
                style={{backgroundColor: colorCode}} 
                onClick= {typeof handleClick == "function" ? handleClick: ()=>{} }>
                    {icon}
                <div className={showDelete ? "NameInCart" : "NameInPalette"}>
                    {showDeleteBlock ? deleteBlock : colorCode}
                </div>
            </div>
        </>
    )
}
export default ColorBlock;