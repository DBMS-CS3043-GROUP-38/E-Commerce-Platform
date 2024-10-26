import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [routes, setRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(savedCart);
    }, []);

    useEffect(() => {
        // Fetch cities when component loads
        fetch('http://localhost:3000/api/cities')
            .then(response => response.json())
            .then(data => setCities(data))
            .catch(error => console.error('Error fetching cities:', error));
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

    const handleCitySelect = async (city) => {
        setSelectedCity(city);
        setRoutes([]); // Clear previous routes
        setSelectedRoute(null); // Reset selected route

        try {
            const response = await fetch(`http://localhost:3000/api/getroutes?city=${city}`);
            const data = await response.json();
            setRoutes(data);
        } catch (error) {
            console.error('Error fetching routes:', error);
            toast.error("Error fetching routes.");
        }
    };

    const handleRouteSelect = (routeID) => {
        setSelectedRoute(routeID);
        toast.info(`Route ID ${routeID} selected.`);
    };

    const handleBuy = async () => {
        const userDetails = getUserDetails();
        if (!userDetails) {
            toast.error("No user found. User must be logged in.");
            return;
        }

        if (!selectedRoute) {
            toast.error("Please select a route.");
            return;
        }

        const orderDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const products = cartItems.map(item => ({
            ProductID: item.id,
            Amount: item.quantity,
        }));

        const orderData = {
            customerID: userDetails.customerId,
            orderDate,
            routeID: selectedRoute,
            value: 0, // You may want to calculate the total value based on the cart items
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
                toast.success("Order placed successfully!");
            } else {
                console.error('Error placing order:', result.message);
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error("Error placing order.");
        }
    };

    const handleRemoveItem = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        toast.info("Item removed from cart.");
    };

    const handleResetCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
        toast.info("Cart has been reset.");
    };

    const handleIncreaseQuantity = (id) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
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
            <ToastContainer />
            <h1>Your Cart</h1>
            
            <div>
                <label htmlFor="city-select">Select City:</label>
                <select id="city-select" value={selectedCity} onChange={(e) => handleCitySelect(e.target.value)}>
                    <option value="">Choose a city</option>
                    {cities.map(city => (
                        <option key={city.City} value={city.City}>{city.City}</option>
                    ))}
                </select>
            </div>

            {selectedCity && routes.length > 0 && (
                <div>
                    <h3>Available Routes:</h3>
                    <ul>
                        {routes.map(route => (
                            <li key={route.RouteID}>
                                <button onClick={() => handleRouteSelect(route.RouteID)}>
                                    {`Route ${route.RouteID}: ${route.Description}`}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

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
                <h2>Total: ${cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)}</h2>
                <button onClick={handleBuy} disabled={cartItems.length === 0}>Place Order</button>
                <button onClick={handleResetCart}>Reset Cart</button>
            </div>
        </div>
    );
};

export default Cart;
