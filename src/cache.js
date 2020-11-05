import { makeVar,InMemoryCache } from '@apollo/client';

export const cartItemsVar = makeVar([]);
export const savedPaletteVar = makeVar([]);

export const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          cartItems: {
            read() {
              return cartItemsVar();
            }
          }
        }
      }
    },
    typePolicies: {
      Query: {
        fields: {
          savedPalette :{
            read(){
              return savedPaletteVar();
            }
          }

        }
      }
    }
  });