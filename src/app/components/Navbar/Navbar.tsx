"use client";

import './Navbar.scss';
import { useState } from 'react';
import Image from 'next/image';
import car from '../../../../public/car.svg';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import { useCart } from '@/app/context/CartProvider';

const Navbar = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cart } = useCart();

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <>
            <nav className='styled-nav'>
                <div className='container'>
                    <h3 className='brand'>MKS</h3>
                    <span className='system'>Sistemas</span>
                </div>
                <div className='container-icon'>
                    <button className='icon' onClick={toggleCart}>
                        <Image src={car} alt="Ícone de carro" width={19} height={18} />
                        <span className="cart-quantity">{totalQuantity > 0 ? totalQuantity : 0}</span>
                    </button>
                </div>
            </nav>
            {isCartOpen && <ShoppingCart toggleCart={toggleCart} />}
        </>
    );
};

export default Navbar;
