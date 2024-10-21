import React, { useState, useEffect } from 'react';
// import './Electronics.css'; // Import CSS file if you have styles

const Electronics = () => {
    const [products, setProducts] = useState([]); // State to hold products
    const [successMessage, setSuccessMessage] = useState(''); // State for success message

    useEffect(() => {
        // Fetch products from the API
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/products/Type/Electronics');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json(); // Parse JSON data
                setProducts(data); // Store fetched products in state
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="electronics-page">
            <h1>Electronics Products</h1>
            {successMessage && <div className="success-message">{successMessage}</div>}
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.ProductID} className="product-item">
                            <h3>{product.Name}</h3> {/* Display product name */}
                            <p>Price: ${product.Price}</p> {/* Display product price */}
                            <button onClick={() => setSuccessMessage(`Added ${product.Name} to cart!`)}>
                                Add to Cart
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>
        </div>
    );
};

export default Electronics;
