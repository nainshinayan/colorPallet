import React from 'react';
import Button from '../components/Button';
import PaletteContainer from '../components/PaletteContainer';
import '../css/ColorsPalettePage.css';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';
import { GET_COLORS } from '../graphql/queries';
import { ADD_TO_CART } from '../graphql/mutations';

const ColorPalettePage = () => {

    const [addToCart] = useMutation(ADD_TO_CART);
    const { loading, error, data,fetchMore } = useQuery(GET_COLORS);

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
    return(
        <>
            <PaletteContainer 
                colorList={data.colors} 
                showDelete={false}
                handleClick={(color)=>{addToCart({variables: {colorInfo:color} })}} 
            />
            <div className= "ButtonContainer">
                <Button handleClick={loadMoreColors}>Load More</Button>
            </div>
        </>
    )
};

export default ColorPalettePage;