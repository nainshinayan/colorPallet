import React, {useRef, useState} from 'react';
import Button from '../components/Button';
import PaletteContainer from '../components/PaletteContainer';
import  '../css/CartPage.css';
import { useQuery, } from '@apollo/client';
import { GET_CART_ITEMS,GET_SAVED_PALETTE } from '../graphql/queries';
import { REMOVE_FROM_CART, SAVE_PALETTE, REMOVE_SAVED_PALETTE } from '../graphql/mutations';
import { useMutation } from '@apollo/react-hooks';


const CartPage = () => {
    const userMessageMap = {
      noMessage : "",
      noName :"Please enter a name!",
      nameExisting : "The name already exists! Please enter another name."
    };
    const [userMessage, updateMessage] = useState(userMessageMap.noMessage);
    const textBoxRef = useRef(null);
    const [removeFromCart] = useMutation(REMOVE_FROM_CART);
    const [savePalette] = useMutation(SAVE_PALETTE);
    const [removeSavedPalette] = useMutation(REMOVE_SAVED_PALETTE);

    const {data,error,loading} = useQuery(GET_CART_ITEMS);
    const savedPalettes = useQuery(GET_SAVED_PALETTE);

    if (loading || savedPalettes.loading) return 'Loading...';
    if (error || savedPalettes.error) return `Error! ${error.message}`;
    
  
    let cartItemsList = data?.colorCart?data.colorCart :[] ;
    let itemView = getItemView(); 
    let savedPaletteList = savedPalettes.data.savedPalette;
    let paletteView = getPaletteView();


  
    function onSavePalette(){

      function trim(value){
          return value.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
      }
      let palleteName = trim(textBoxRef.current.value);
      if(palleteName == ""){ 
        updateMessage(userMessageMap.noName);
      }else{
        for(var i=0; i<savedPaletteList.length ; i++){
            if(savedPaletteList[i].name == palleteName){
              updateMessage(userMessageMap.nameExisting);
              return;
            }
        }
        updateMessage(userMessageMap.noMessage);
        savePalette({variables: {id: Date.now(), name:palleteName, colors:cartItemsList} });
        textBoxRef.current.value ="";
  
      }
    }

    function getItemView(){
      return (
        cartItemsList.length ? 
            (<>
                <h3>Your current cart palette</h3>
                <PaletteContainer 
                  colorList={cartItemsList} 
                  showDelete={true} 
                  handleClick={(color)=>{removeFromCart({variables: {colorInfo:color} })}}/>
                <p className = "Heading">Name and save your color palette</p>
                <div className="SavePaletteClass">
                    <input ref={textBoxRef} placeholder = "Color Palette Name" type="text"/>
                    <Button handleClick={(onSavePalette)} customStyle = "ButtonforCart">Save Palette</Button>
                     <span style={{margin:"10px"}}></span> 
                    <div className = "UserMessage">{userMessage}</div>
                </div>
                <hr className = "HorizontalLine"/>
            </>)  : (<h3>Your cart is empty! Add palette to your cart.</h3>)
        ) 
    }

    function getPaletteView(){
      return (
        savedPaletteList?.length ? 
            (<>
                <h3>Previously saved color palettes</h3>
                {savedPaletteList.map((eachPalette) => {
                  return(
                    <PaletteContainer 
                    key = {eachPalette.id}
                    colorList={eachPalette.colors} 
                    listName = {eachPalette.name}
                    handleClick={(color)=>{removeSavedPalette({variables: {name:eachPalette.name} })}}
                    showDeleteBlock = {true}
                    showHeader = {true}/>
                  )
                })}
            </>)
            : ""
        ) 
    }


    return(
      <>{itemView}
        {paletteView}
      </>
    )

};

export default CartPage;