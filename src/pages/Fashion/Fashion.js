import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../redux/orebiSlice'; // Import the addToCart action
import Breadcrumbs from '../../components/pageProps/Breadcrumbs';
import ShopSideNav from '../../components/pageProps/shopPage/ShopSideNav';
import ProductBanner from '../../components/pageProps/shopPage/ProductBanner';
import Pagination from '../../components/pageProps/shopPage/Pagination';
import './ProductPage.css'; // Importing shared CSS file

// Import images for fashion items
import fashionImage1 from '../../assets/images/fashion/fabrilife-women-tshirt-flora.webp';
import fashionImage2 from '../../assets/images/fashion/images.jpeg';
import fashionImage3 from '../../assets/images/fashion/photo-1565084888279-aca607ecce0c.jpeg';
import fashionImage4 from '../../assets/images/fashion/ed709dbd4d51d77785a7643b57bdda03.jpg';
import fashionImage5 from '../../assets/images/fashion/UyG4=.jpeg';
import fashionImage6 from '../../assets/images/fashion/images (3).jpeg';
import fashionImage7 from '../../assets/images/fashion/images (2).jpeg';
import fashionImage8 from '../../assets/images/fashion/d6d7gqm7l5kvyy4okd3v.webp';
import fashionImage9 from '../../assets/images/fashion/00001-2.jpg';

const Fashion = () => {
    const [quantities, setQuantities] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6); // Adjust the number of items per page

    const dispatch = useDispatch(); // Use dispatch from Redux
    const navigate = useNavigate();

    // Define the fashion items here
    const fashionItems = [
        { id: 1, image: fashionImage1, name: 'T-shirt Flora', price: 10 },
        { id: 2, image: fashionImage2, name: 'Women Top', price: 12 },
        { id: 3, image: fashionImage3, name: 'Men Trousers', price: 15 },
        { id: 4, image: fashionImage4, name: 'T-shirt', price: 10 },
        { id: 5, image: fashionImage5, name: 'Vintage Cap', price: 12 },
        { id: 6, image: fashionImage6, name: 'Men Shirt Classic', price: 15 },
        { id: 7, image: fashionImage7, name: 'Mens Top', price: 10 },
        { id: 8, image: fashionImage8, name: 'Trouser', price: 12 },
        { id: 9, image: fashionImage9, name: 'Casual Slimfit', price: 15 },
    ];

    const handleQuantityChange = (id, quantity) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: quantity
        }));
    };

    const handleAddToCart = (item) => {
        const quantity = quantities[item.id] || 1; // Default to 1 if no quantity specified
        dispatch(addToCart({ id: item.id, name: item.name, price: item.price, quantity })); // Dispatch addToCart action
        setSuccessMessage(`Added ${item.name} to cart successfully!`);
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleGoToCart = () => {
        navigate('/cart');
    };

    // Pagination Logic
    const totalItems = fashionItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Calculate the items to display for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = fashionItems.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="product-page">
            <Breadcrumbs title="Fashion" />
            <button onClick={handleGoToCart} className="go-to-cart-btn">
                Go to Cart
            </button>

            {successMessage && <div className="success-message">{successMessage}</div>}

            <div className="flex gap-10">
                <div className="w-[20%] hidden mdl:inline-flex h-full">
                    <ShopSideNav />
                </div>
                <div className="w-full mdl:w-[80%] flex flex-col gap-10">
                    <ProductBanner />
                    <div className="product-grid">
                        {currentItems.map((item) => (
                            <div key={item.id} className="product-item">
                                <img src={item.image} alt={item.name} />
                                <h3>{item.name}</h3>
                                <p>${item.price}</p>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantities[item.id] || 1}
                                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                                    className="quantity-input"
                                />
                                <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                            </div>
                        ))}
                    </div>
                    {/* Pagination Component */}
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)} 
                    />
                </div>
            </div>
        </div>
    );
};

export default Fashion;
