import Button from '../components/Button';
import PaletteContainer from '../components/PaletteContainer';
import '../css/ColorsPalettePage.css';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';
import { GET_COLORS } from '../graphql/queries';
import { ADD_TO_CART } from '../graphql/mutations';


const ColorPalettePage = () => {

  /**
   * This useMutation is the mutation method to add the item to the "colorCart" 
   * field when a color block/tile is clicked on home page.
   */
  const [addToCart] = useMutation(ADD_TO_CART);

  /**
   * This fetches response from graphQL server with initial offset set as 0
   * and number of records as 10. FetchMore fn offers offset based pagination for 
   * "loadMore" functionality
   */
  const { loading, error, data, fetchMore } = useQuery(GET_COLORS, {
    variables: {
      offset: 0
    }
  });

  const loadMoreColors = function () {
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

  return (
    <>
      <PaletteContainer style={{ marginTop: "80px" }}
        colorList={data.colors}
        showDelete={false}
        handleClick={(color) => { addToCart({ variables: { colorInfo: color } }) }}
      />
      <div className="ButtonContainer">
        <Button handleClick={loadMoreColors}>Load More</Button>
      </div>
    </>
  )
};

export default ColorPalettePage;