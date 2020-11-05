import React from 'react';
import Button from '../components/Button';
import PaletteContainer from '../components/PaletteContainer';
import '../css/ColorsPalettePage.css';
import { gql, useQuery,ApolloConsumer } from '@apollo/client';
import { cartItemsVar } from '../cache';


const GET_COLORS = gql`
  query colors($offset: Int) {
    colors(numResults: 10, resultOffset: $offset) {
      id
      title
      hex
    }
  }
`;


const ColorPalettePage = (props) => {
    const { loading, error, data, fetchMore } = useQuery(GET_COLORS, {
        variables: {
            offset: 0,
            limit: 10
          },
    });
    if (loading) return 'Loading...';
   if (error) return `Error! ${error.message}`;


    function loadMoreColors(){
        const currentLength = data.colors.length;
        fetchMore({
            variables: {
              offset: currentLength,
              limit: 10,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return Object.assign({}, prev, {
                    colors: [...prev.colors, ...fetchMoreResult.colors]
                });
            }
        })
    }

    function addColorToCart(color){
        cartItemsVar([...cartItemsVar(), color]);

    }

    return(

        <ApolloConsumer>
        {   () => {
            return(
            <>
            <PaletteContainer 
                colorList={data.colors} 
                showDelete={false}
                handleClick={(colors)=>{addColorToCart(colors)}} 
                />
            <div className= "ButtonContainer">
                <Button handleClick={loadMoreColors}>Load More</Button>
            </div>
        </>
            )
        }}
        </ApolloConsumer>
        
    )

};

export default ColorPalettePage;