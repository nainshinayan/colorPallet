import React, { useRef, useState } from 'react';
import Button from '../components/Button';
import PaletteContainer from '../components/PaletteContainer';
import '../css/CartPage.css';
import { useQuery, } from '@apollo/client';
import { GET_CART_ITEMS, GET_SAVED_PALETTE } from '../graphql/queries';
import { REMOVE_FROM_CART, SAVE_PALETTE, REMOVE_SAVED_PALETTE } from '../graphql/mutations';
import { useMutation } from '@apollo/react-hooks';

const CartPage = () => {
  /**
   * user message for input validation
   */
  const userMessageMap = {
    noMessage: "",
    noName: "Please enter a name!",
    nameExisting: "The name already exists! Please enter another name."
  };
  const [userMessage, updateMessage] = useState(userMessageMap.noMessage);
  const textBoxRef = useRef(null);
  /**
   * REMOVE_FROM_CART is a mutation called to remove a cart item in the cache
   */
  const [removeFromCart] = useMutation(REMOVE_FROM_CART);
  /**
   * SAVE_PALETTE is a mutation function called to save a palette in the cache 
   */
  const [savePalette] = useMutation(SAVE_PALETTE);
  /**
   * REMOVE_SAVED_PALETTE is a mutation function called to remove a palette in the cache 
   */
  const [removeSavedPalette] = useMutation(REMOVE_SAVED_PALETTE);
  /**
   * query to get cart item(s) from the cache
   */
  const { data, error, loading } = useQuery(GET_CART_ITEMS);
  /**
   * query to get saved palette(s) from the cache
   */
  const savedPalettes = useQuery(GET_SAVED_PALETTE);

  if (loading || savedPalettes.loading) return 'Loading...';
  if (error || savedPalettes.error) return `Error! ${error.message}`;

  let cartItemsList = data?.colorCart ? data.colorCart : [];
  let cartItemView = getCartItemView();
  let savedPaletteList = savedPalettes?.data?.savedPalette;
  let paletteView = getPaletteView();

  /**
   * invoked when save palette is clicked by user
   */
  function onSavePalette() {

    /**
     * user input validation
     */
    function trim(value) {
      return value.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    }
    let paletteName = trim(textBoxRef.current.value);
    if (paletteName == "") {
      updateMessage(userMessageMap.noName);
    } else {
      for (var i = 0; i < savedPaletteList.length; i++) {
        if (savedPaletteList[i].name == paletteName) {
          updateMessage(userMessageMap.nameExisting);
          return;
        }
      }
      updateMessage(userMessageMap.noMessage);
      /**
       * Function to save the palette is invoked if user enters valid name for palette
       */
      savePalette({ variables: { id: Date.now(), name: paletteName, colors: cartItemsList } });
      textBoxRef.current.value = "";

    }
  }

  /**
  * This method returns the upper section of the cart page i.e. the list of items in cart. 
  */
  function getCartItemView() {
    return (
      cartItemsList.length ?
        (<>
          <h3 style={{ marginTop: "80px" }}>Your current cart palette</h3>
          <PaletteContainer
            colorList={cartItemsList}
            showDelete={true}
            handleClick={(color) => { removeFromCart({ variables: { colorInfo: color } }) }} />
          <p className="Heading">Name and save your color palette</p>
          <div className="SavePaletteClass">
            <input ref={textBoxRef} placeholder="Color Palette Name" type="text" />
            <Button handleClick={(onSavePalette)} customStyle="ButtonforCart">Save Palette</Button>
            <span style={{ margin: "10px" }}></span>
            <div className="UserMessage">{userMessage}</div>
          </div>
          <hr className="HorizontalLine" />
        </>) : (<h3 style={{ marginTop: "80px" }}>Your cart is empty! Add palette to your cart.</h3>)
    )
  }

  /**
   * This method returns the bottom section of the cart page i.e. the list of saved color palettes. 
   */
  function getPaletteView() {
    return (
      savedPaletteList?.length ?
        (<>
          {!cartItemsList.length ? <hr className="HorizontalLine" /> : ""}
          <h3>Previously saved color palettes</h3>
          {savedPaletteList.map((eachPalette) => {
            return (
              <PaletteContainer
                key={eachPalette.id}
                colorList={eachPalette.colors}
                listName={eachPalette.name}
                handleClick={(color) => { removeSavedPalette({ variables: { name: eachPalette.name } }) }}
                showDeleteBlock={true}
                showHeader={true} />
            )
          })}
        </>)
        : ""
    )
  }

  return (
    <>{cartItemView}
      {paletteView}
    </>
  )

};

export default CartPage;