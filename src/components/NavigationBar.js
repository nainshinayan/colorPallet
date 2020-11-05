import React from 'react';
import {NavLink } from 'react-router-dom'; 
import '../css/NavigationBar.css';
import CartIcon from '../resource/CartIcon.svg';
import NewEngenLogo from '../resource/NewEngen-Logo.svg';
import { gql, useQuery, } from '@apollo/client';

const GET_CART_COUNT = gql`
  query GetCartItems {
    cartItems @client
  }
`;

const NavigationBar = () => {
    const { data } = useQuery(GET_CART_COUNT);

    return (
        <div className = "NavigationBar">
            <NavLink to="/"><img src={NewEngenLogo}/></NavLink>
            <NavLink to="/Cart">
                <img src={CartIcon}/>
                    <span className="CartCount">{data?.cartItems? data.cartItems.length : 0}</span></NavLink>
        </div>
    )

}
export default NavigationBar;