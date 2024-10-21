import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/fluxoraSlice';
import './ProductPage.css';

const Fashion = () => {
    const [products, setProducts] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [quantities, setQuantities] = useState({});
    const dispatch = useDispatch();

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
        const imagePath = `/images/fashion/${product.Name}.png`; // Dynamic image path for Fashion products

        dispatch(addToCart({
            id: product.ProductID,
            name: product.Name,
            price: product.Price,
            image: imagePath,
            quantity: quantities[product.ProductID] || 1
        }));

        setSuccessMessage(`Added ${product.Name} to cart!`);
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleQuantityChange = (productID, value) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productID]: value < 1 ? 1 : value
        }));
    };

    return (
        <div className="fashion-page">
            <h1>Fashion Products</h1>
            {successMessage && <div className="success-message">{successMessage}</div>}
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map((product) => {
                        const imagePath = `/images/fashion/${product.Name}.png`; // Dynamic image path for Fashion products

                        return (
                            <div key={product.ProductID} className="product-item">
                                <img id={`image-${product.ProductID}`} src={imagePath} alt={product.Name} className="product-image" />
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
                                <button onClick={() => handleAddToCart(product)}>
                                    Add to Cart
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <p>No fashion products available.</p>
                )}
            </div>
        </div>
    );
};

export default Fashion;
