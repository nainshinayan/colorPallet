import gql from 'graphql-tag';


export const GET_COLORS = gql`
  query colors($offset: Int) {
    colors(numResults: 10, resultOffset: $offset) {
      id
      title
      hex
    }
  }
`;



export const GET_CART_ITEMS = gql`
  query getCartItems{
    colorCart @client{
      id
      title
      hex
    }
  }
`;

export const GET_SAVED_PALETTE = gql`
  query getSavedPalette{
    savedPalette @client{
      id
      name
      colors
    }
  }
`;


