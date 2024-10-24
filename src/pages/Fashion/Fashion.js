import React, { useState, useEffect } from 'react';
import './ProductPage.css';

const Fashion = () => {
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/products/Type/Fashion');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        const quantity = quantities[product.ProductID] || 1; // Default to 1 if not set
        const cartItem = { id: product.ProductID, name: product.Name, price: product.Price, quantity };

        // Get the current cart from local storage
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Add or update the item in the cart
        const updatedCart = currentCart.filter(item => item.id !== product.ProductID).concat(cartItem);
        
        // Save the updated cart back to local storage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        alert(`${product.Name} added to cart!`);
    };

    const handleQuantityChange = (productID, value) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productID]: value < 1 ? 1 : value, // Ensure at least 1 quantity
        }));
    };

    return (
        <div className="fashion-page">
            <h1>Fashion Products</h1>
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.ProductID} className="product-item">
                            <img src={`/images/fashion/${product.Name}.png`} alt={product.Name} className="product-image" />
                            <div className="product-info">
                                <h3>{product.Name}</h3>
                                <p>${product.Price}</p>
                            </div>
                            <div className="quantity-selector">
                                <label htmlFor={`quantity-${product.ProductID}`}>Quantity:</label>
                                <input
                                    type="number"
                                    id={`quantity-${product.ProductID}`}
                                    value={quantities[product.ProductID] || 1}
                                    min="1"
                                    onChange={(e) => handleQuantityChange(product.ProductID, e.target.value)}
                                />
                            </div>
                            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                        </div>
                    ))
                ) : (
                    <p>No fashion products available.</p>
                )}
            </div>
        </div>
    );
};

export default Fashion;
