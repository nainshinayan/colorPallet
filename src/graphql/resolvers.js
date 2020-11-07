import { GET_CART_ITEMS, GET_SAVED_PALETTE } from './queries';

export const resolvers = {
  Mutation: {
    addToCart: (_, args, { cache }) => {

      let color = { ...args.colorInfo };
      color.id = Date.now();
      const { colorCart } = cache.readQuery({
        query: GET_CART_ITEMS
      });
      const data = { colorCart: [...colorCart, color] };
      cache.writeQuery({ query: GET_CART_ITEMS, data });
      return data.colorCart;
    },
    removeFromCart: (_, args, { cache }) => {
      let removeColorInfo = args.colorInfo;
      const { colorCart } = cache.readQuery({
        query: GET_CART_ITEMS
      });

      let firstOccurenceFound = false;
      let newItems = colorCart.filter(function (color) {
        if (!firstOccurenceFound) {
          if (color.id != removeColorInfo.id) {
            return color;
          } else {
            firstOccurenceFound = true;
          }
        } else { return color }
      });

      const data = { colorCart: newItems };
      cache.writeQuery({ query: GET_CART_ITEMS, data });


      return data.colorCart;
    },
    savePalette: (_, args, { cache }) => {

      const { savedPalette } = cache.readQuery({
        query: GET_SAVED_PALETTE
      });

      let newPalette = {
        id: args.id,
        name: args.name,
        colors: args.colors
      };

      const data = { savedPalette: [...savedPalette, newPalette] };
      cache.writeQuery({ query: GET_SAVED_PALETTE, data });
      return data.savedPalette;
    },

    removeSavedPalette: (_, args, { cache }) => {

      const { savedPalette } = cache.readQuery({
        query: GET_SAVED_PALETTE
      });
      let newPalette = savedPalette.filter(eachPalette => eachPalette.name != args.name)
      const data = { savedPalette: newPalette }
      cache.writeQuery({ query: GET_SAVED_PALETTE, data });

      return data.savedPalette;
    }
  }
};