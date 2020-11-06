import React from 'react';
import {NavLink } from 'react-router-dom'; 
import '../css/NavigationBar.css';
import CartIcon from '../resource/CartIcon.svg';
import NewEngenLogo from '../resource/NewEngen-Logo.svg';
import { useQuery } from '@apollo/client';
import { GET_CART_ITEMS } from '../graphql/queries';




const NavigationBar = () => {
    const {data} = useQuery(GET_CART_ITEMS);
    let cartCount = data?.colorCart?.length ? data.colorCart.length :0;
    return (
        <div className = "NavigationBar">
            <NavLink to="/"><img className = "Logo" src={NewEngenLogo}/></NavLink>
            <NavLink to="/Cart">
                <img src={CartIcon}/>
                <span className="CartCount">{cartCount}</span>
            </NavLink>
        </div>
    )

}
export default NavigationBar;