import React from 'react';
import ColorBlock from './ColorBlock';
import '../css/ColorsPalettePage.css';

const PaletteContainer = (props) => {
    let colorsList = props.colorList, 
    showDeleteBlock = props.showDeleteBlock;

    function headerView(){
        return(
        props.showHeader ? (<div className = "Header">{props.listName} - {colorsList?.length} colors</div>) : "" 
        )
    }

    function bodyView(){
        let deleteBlock;
        if(showDeleteBlock){
            deleteBlock = <ColorBlock 
            showDeleteBlock={showDeleteBlock} 
            handleClick={()=>typeof props.handleClick == "function" ? props.handleClick(colorsList) : ()=>{}}
            ></ColorBlock>
        }
        return (
            <>
                <div className="PaletteContainer">
                    {colorsList?.map((color) => <ColorBlock 
                        key = {color.id} 
                        showDelete = {props.showDelete}
                        colorDetail = {color}
                        handleClick={ showDeleteBlock 
                        ? ""
                        : ()=>typeof props.handleClick == "function" ? props.handleClick(color) : ""}/> )
                    }{deleteBlock}
                </div>
                {/* {deleteBlock} */}
            </>
            )
    }

    let headerSection = headerView();
    let bodySection = bodyView();


    return(
        <>
            {headerSection}
            {bodySection}
            <br/>
        </>
    )
}
export default PaletteContainer;
