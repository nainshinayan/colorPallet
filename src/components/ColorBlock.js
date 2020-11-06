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
    function showName(){
        //console.log("on hover ",colorDetail?.title)
    }

    function hideName(){

    }
    return(
        <>
            <div 
                className="Block" 
                style={{backgroundColor: colorCode}} 
                onClick= {typeof handleClick == "function" ? handleClick: ()=>{} }
                onMouseEnter={() => showName()}
                onMouseLeave={() => hideName()}>
                    {icon}
                <div className={showDelete ? "NameInCart" : "NameInPalette"}>
                    {showDeleteBlock ? deleteBlock : colorCode}
                </div>
                {/* <div className={showDelete ? "NameInCart" : "NameInPalette"}>Add {colorDetail.title}</div> */}
            </div>
        </>
    )
}
export default ColorBlock;