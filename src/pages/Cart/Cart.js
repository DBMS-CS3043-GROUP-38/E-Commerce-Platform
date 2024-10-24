import React, { useState, useEffect } from 'react';
import './Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || []; // Load cart from local storage
        setCartItems(savedCart);
    }, []);

    const handleBuy = async () => {
        const customerID = 1; // Example customerID, set dynamically based on your logic
        const orderDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format for MySQL
        const routeID = 1; // Example routeID, update according to your logic
        const totalValue = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0); // Calculate total value

        const products = cartItems.map(item => ({
            ProductID: item.id,
            Amount: item.quantity,
        }));

        const orderData = {
            customerID,
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

    const handleRemoveItem = (itemId) => {
        const updatedCart = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update local storage
    };

    const handleResetCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart'); // Clear cart from local storage
    };

    const handleIncreaseQuantity = (itemId) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === itemId) {
                return { ...item, quantity: item.quantity + 1 }; // Increase quantity
            }
            return item;
        });
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update local storage
    };

    const handleDecreaseQuantity = (itemId) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === itemId) {
                const newQuantity = item.quantity > 1 ? item.quantity - 1 : 1; // Decrease quantity, minimum 1
                return { ...item, quantity: newQuantity };
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
                            <div className="quantity-controls">
                                <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                            </div>
                            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                        </div>
                    ))
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
            {cartItems.length > 0 && (
                <div>
                    <button onClick={handleResetCart} className="reset-button">
                        Reset Cart
                    </button>
                    <button onClick={handleBuy} className="buy-button">
                        Buy Now
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
