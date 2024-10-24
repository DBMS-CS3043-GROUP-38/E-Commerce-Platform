import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Ensure you have this package installed
import './Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Load cart from local storage
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(savedCart);
    }, []);

    // Function to get customer ID and username from the JWT token
    const getUserDetails = () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token); // Decode the token
                return { customerId: decoded.userId, username: decoded.Username }; // Return both ID and Username
            } catch (error) {
                console.error('Invalid token:', error);
                return null; // Return null if token is invalid
            }
        }
        return null; // Return null if no token is found
    };

    const handleBuy = async () => {
        const userDetails = getUserDetails(); // Get user details from the token
        if (!userDetails) {
            alert("No user found. User must be logged in.");
            return; // Prevent further action if user details are not found
        }

        const orderDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format for MySQL
        const routeID = 1; // Example routeID, update according to your logic
        const totalValue = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0); // Calculate total value

        const products = cartItems.map(item => ({
            ProductID: item.id,
            Amount: item.quantity,
        }));

        const orderData = {
            customerID: userDetails.customerId, // Use customer ID
            username: userDetails.username, // Use username for order
            orderDate,
            routeID,
            value: totalValue, // Total order value
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
                setCartItems([]); // Clear the cart after order is successful
                localStorage.removeItem('cart'); // Clear cart from local storage
            } else {
                console.error('Error placing order:', result.message);
            }
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    // Function to remove an item from the cart
    const handleRemoveItem = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update local storage
    };

    // Function to reset the cart
    const handleResetCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart'); // Clear local storage
    };

    // Function to increase quantity of an item
    const handleIncreaseQuantity = (id) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update local storage
    };

    // Function to decrease quantity of an item
    const handleDecreaseQuantity = (id) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === id && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update local storage
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
                <h2>Total: ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</h2>
                <button onClick={handleBuy} disabled={cartItems.length === 0}>Place Order</button>
                <button onClick={handleResetCart}>Reset Cart</button>
            </div>
        </div>
    );
};

export default Cart;
