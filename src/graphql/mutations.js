import gql from 'graphql-tag';

export const ADD_TO_CART = gql`
  mutation AddToCart($colorInfo: color!) {
    addToCart(colorInfo: $colorInfo) @client
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($colorInfo: color!) {
    removeFromCart(colorInfo: $colorInfo) @client
  }
`;


export const SAVE_PALETTE = gql`
  mutation SavePalette($id: id!, $name: name!, $colors:colors!) {
    savePalette(id: $id, name: $name, colors:$colors) @client
  }
`;

export const REMOVE_SAVED_PALETTE = gql`
  mutation RemoveSavedPalette($name: name!) {
    removeSavedPalette(name: $name) @client
  }
`;