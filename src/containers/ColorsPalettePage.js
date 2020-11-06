import React, {useCallback} from 'react';
import Button from '../components/Button';
import PaletteContainer from '../components/PaletteContainer';
import '../css/ColorsPalettePage.css';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';
import { GET_COLORS } from '../graphql/queries';
import { ADD_TO_CART } from '../graphql/mutations';


const ColorPalettePage = () => {

    const [addToCart] = useMutation(ADD_TO_CART);
    const { loading, error, data, fetchMore } = useQuery(GET_COLORS, {
        variables: {
          offset: 0
        }
      });
      const loadMoreColors = function(){
        fetchMore({
            variables: {
              offset: data?.colors?.length ? data.colors.length : 0
            }
          });
      }


    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>{JSON.stringify(error)}</div>;
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