import React from 'react';
import Button from '../components/Button';
import PaletteContainer from '../components/PaletteContainer';
import  '../css/CartPage.css';

import { gql, useQuery, } from '@apollo/client';
import { cartItemsVar,savedPaletteVar } from '../cache';


const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

const GET_SAVED_PALETTE = gql`
  query GetSavedPalette {
    savedPalette @client
  }
`;


const CartPage = () => {
    const cartItemsList = useQuery(GET_CART_ITEMS);
    const paletteList = useQuery(GET_SAVED_PALETTE);
    console.log("paletteList",paletteList);
    // if (loading) return 'Loading...';
    // if (error) return `Error! ${error.message}`;

    function savePalette(){
      savedPaletteVar([...savedPaletteVar(), {"demoPalette": cartItemsList.data.cartItems}]);
    }

    function deleteColor(removeColor){
        let firstOccurenceFound = false;
        // //let newItems = [...cartItemsList.data.cartItems].filter(color => color.id != removeColor.id );

        let newItems = [...cartItemsList.data.cartItems].filter(function(color){
            if(!firstOccurenceFound){
              if(color.id != removeColor.id){
                  return color;
              } else{
                firstOccurenceFound = true;
              }
            } else {return color}
        });
        cartItemsVar(newItems);
    }

    return(
        cartItemsList.data?.cartItems?.length ? 
            (<>
                <h3>Your current cart palette</h3>
                <PaletteContainer colorList={cartItemsList.data.cartItems} showDelete={true} handleClick={deleteColor}/>
                <p>Name and save your color palette</p>
                <div className="SavePaletteClass">
                    <input placeholder = "Color Palette Name" type="text"/>
                    <Button handleClick={savePalette} customStyle = "ButtonforCart">Save Palette</Button>
                </div>
                <hr className = "HorizontalLine"/>
            </>)  : (<h3>Your cart is empty! Add palette to your cart.</h3>)
    )

};

export default CartPage;