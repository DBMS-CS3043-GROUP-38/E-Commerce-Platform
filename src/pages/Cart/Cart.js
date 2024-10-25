import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import './Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(savedCart);
    }, []);

    const getUserDetails = () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                return { customerId: decoded.userId, username: decoded.Username };
            } catch (error) {
                console.error('Invalid token:', error);
                return null;
            }
        }
        return null;
    };

    const handleBuy = async () => {
        const userDetails = getUserDetails();
        if (!userDetails) {
            alert("No user found. User must be logged in.");
            return;
        }

        const orderDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const routeID = 1;
        const totalValue = (cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0));

        const products = cartItems.map(item => ({
            ProductID: item.id,
            Amount: item.quantity,
        }));

        const orderData = {
            customerID: userDetails.customerId,
            orderDate,
            routeID,
            value: 0,
            products,
        };

        try {
            const response = await fetch('http://localhost:3000/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            const result = await response.json();
            if (response.ok) {
                console.log('Order placed successfully:', result);
                setCartItems([]);
                localStorage.removeItem('cart');
            } else {
                console.error('Error placing order:', result.message);
            }
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    const handleRemoveItem = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleResetCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    const handleIncreaseQuantity = (id) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1  };
            }
            return item;
        });
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleDecreaseQuantity = (id) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === id && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            <div className="cart-items">
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                            <h3>{item.name}</h3>
                            <p>Price: ${item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                            <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                        </div>
                    ))
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
            <div className="cart-actions">
                <h2>Total: ${cartItems.reduce((acc, item) => acc + ((item.price) * item.quantity), 0)}</h2>
                <button onClick={handleBuy} disabled={cartItems.length === 0}>Place Order</button>
                <button onClick={handleResetCart}>Reset Cart</button>
            </div>
        </div>
    );
};

export default Cart;
