import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {InMemoryCache,ApolloClient,ApolloProvider } from '@apollo/client';
import { persistCache } from 'apollo3-cache-persist';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { GET_CART_ITEMS, GET_SAVED_PALETTE } from './graphql/queries';


const cacheConfig = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        colors: {
          keyArgs: false,
          merge(existing =[], incoming){
            if(existing.length && incoming.length && (existing[existing.length-1].__ref == incoming[incoming.length-1].__ref)){
              return existing;
            }
            return[...existing, ...incoming];
          }
        } 
      }
    }
  }
  });

const init = async () => {
  await persistCache({
    cache: cacheConfig,
    storage: window.localStorage
  });


  const client = new ApolloClient({
    uri: "https://colourlovers-graphql-api.herokuapp.com/graphql",
    cache: cacheConfig,
    typeDefs,
    resolvers
  });


  try {
    const cartItemsObj = cacheConfig.readQuery({
      query: GET_CART_ITEMS
    });

    const savedPaletteObj = cacheConfig.readQuery({
      query: GET_SAVED_PALETTE
    });

    if(!cartItemsObj){
      cacheConfig.writeQuery({
        query: GET_CART_ITEMS,
        data: {
          colorCart: []
        }
      })
    } 

    if(!savedPaletteObj){
      cacheConfig.writeQuery({
        query: GET_SAVED_PALETTE,
        data: {
          savedPalette: []
        }
      })
    }
  } catch{}

  const ColorMarket = () => (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );

  ReactDOM.render(<ColorMarket/>, document.getElementById('root'));
};
init();
reportWebVitals();