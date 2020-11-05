import React from 'react';
import ColorBlock from './ColorBlock';
import '../css/ColorBlock.css';

const PaletteContainer = (props) => {
    const colorsList = props.colorList;
    return(
        <div className="PaletteContainer">
                {colorsList?.map((color) => <ColorBlock 
                    key = {color.id} 
                    showDelete = {props.showDelete}
                    colorDetail = {color}
                    handleClick={()=>typeof props.handleClick == "function" ? props.handleClick(color) : ""}/> )}
            </div>
    )
}
export default PaletteContainer;
