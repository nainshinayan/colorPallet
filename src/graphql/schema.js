import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    cartItems: [CartItems]
  }

  extend type Query {
    savedPalette: [SavedPalette]
  }

  extend type Mutation {
    addToCart(color: color!): [CartItems]
  }

  extend type Mutation {
    removeFromCart(color: color!): [CartItems]
  }

  extend type Mutation {
    savePalette(id: id!, name: name!, colors:colors!): [SavedPalette]
  }

  extend type Mutation {
    removeSavedPalette(name: Name!): [SavedPalette]
  }

`;
