import React from 'react';
import ColorBlock from './ColorBlock';
import '../css/ColorsPalettePage.css';

/**
 * This component is used in homepage and cartpage to render list of colors, items in cart, and saved palette.
 */
const PaletteContainer = (props) => {
    
    let colorsList = props.colorList, 
    showDeleteBlock = props.showDeleteBlock;

    /**
     * creates headers for items in cart and saved palette
     */
    function headerView(){
        return(
        props.showHeader ? (<div className = "Header">{props.listName} - {colorsList?.length} colors</div>) : "" 
        )
    }
    /**
     * returns color palettewe for list of colors, items in cart, and saved palette.
     */
    function bodyView(){
        let deleteBlock;
        /**
         * renders delete block for saved palette
         */
        if(showDeleteBlock){
            deleteBlock = <ColorBlock 
            showDeleteBlock={showDeleteBlock} 
            handleClick={()=>typeof props.handleClick == "function" ? props.handleClick(colorsList) : ()=>{}}
            ></ColorBlock>
        }
        
        return (
            <>
                <div className={`PaletteContainer ${(!showDeleteBlock && !props.showDelete) ? "onHomePage" : ""}`} >
                    {colorsList?.map((color) => <ColorBlock 
                        key = {color.id} 
                        showDelete = {props.showDelete}
                        colorDetail = {color}
                        handleClick={ showDeleteBlock 
                        ? ""
                        : ()=>typeof props.handleClick == "function" ? props.handleClick(color) : ""}/> )
                    }{deleteBlock}
                </div>
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
