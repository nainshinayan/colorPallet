import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {InMemoryCache,ApolloClient,ApolloProvider } from '@apollo/client';
//import { ApolloProvider } from '@apollo/react-hooks';
import { persistCache } from 'apollo3-cache-persist';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { GET_CART_ITEMS, GET_SAVED_PALETTE } from './graphql/queries';


const cache = new InMemoryCache();

const init = async () => {
  await persistCache({
    cache,
    storage: window.localStorage
  });


  const client = new ApolloClient({
    uri: "https://colourlovers-graphql-api.herokuapp.com/graphql",
    cache,
    typeDefs,
    resolvers
  });


  try {
    cache.readQuery({
      query: GET_CART_ITEMS
    });
  } catch (error) {
    cache.writeQuery({
      query: GET_CART_ITEMS,
      data: {
        colorCart: []
      }
    });
  }

  try {
    cache.readQuery({
      query: GET_SAVED_PALETTE
    });
  } catch (error) {
    cache.writeQuery({
      query: GET_SAVED_PALETTE,
      data: {
        savedPalette: []
      }
    });
  }

  const ColorMarket = () => (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );

  ReactDOM.render(<ColorMarket/>, document.getElementById('root'));
};
init();
reportWebVitals();