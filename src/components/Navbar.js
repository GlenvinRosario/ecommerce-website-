import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Components.css';
import { useProduct } from './context/GlobalContext';
import {useDiscount , useSortLowToHigh , useSortHighToLow , useSortAlpahbeticOrder } from '../services/api/productApi';
import { PRODUCTS_API_URL } from '../services/constants/apiUrls';
import axios from 'axios';
import {debounce } from 'lodash';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  //custom HOOKS
  const applyDiscount = useDiscount();
  const sortLowToHigh = useSortLowToHigh();
  const sortHighToLow = useSortHighToLow();
  const sortByAlphabets = useSortAlpahbeticOrder();

  const [ productPriceValue , setProductPriceValue] = useState();

  const {productCollection, setProductCollection, cartCollection, originalProductCollection }= useProduct();
  const[discountApplied , setDiscountApplied]= useState(false);

  // Get the current page path
  const currentPage = location.pathname;
  

  const handleCart = () => {
    navigate('/cart' );  
  };

  const handleHome = () => {
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleProductNameChange = (event) => {
    const searchProdName = event.target.value;

    const searchProductByName = async () => {
        try {
            const res = await axios.get(`${PRODUCTS_API_URL}/searchProductByName`, {
                params: { searchProdName }  // Use query parameter for search term
            });
            setProductCollection(res?.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Debounced search
    const debouncedSearch = debounce(searchProductByName, 3000);
    debouncedSearch();
};

  function handlePriceChange(event) {
    const priceBasedProduct = event.target.value;
    setProductPriceValue(priceBasedProduct)
    if(priceBasedProduct) {
      const filteredProducts = originalProductCollection.filter((product=> product.price>=priceBasedProduct));
      setProductCollection(filteredProducts)
    } else {
      setProductCollection(originalProductCollection)
    }
  
  }


  return (
    <div className="navbar-container">
      <div>
        <input
          type="text"
          placeholder="Search the Product"
          onChange={(event) => handleProductNameChange(event)}
          className="search-input"
        />
      </div>

      <span>
        <button className={discountApplied ? "discount-button-disabled" : "discount-button"}  disabled={discountApplied} onClick={applyDiscount}>Apply 10% Discount</button>
      </span>
      {currentPage==='/' && (
        <div className="button-container">
        <button className="sort-button" onClick={sortLowToHigh}>
          Low to High
        </button>
        <button className="sort-button" onClick={sortHighToLow}>
          High to Low
        </button>
        <button className="sort-button" onClick={sortByAlphabets}>
          Sort by Alphabetic Order
        </button>
      </div>
      )}
      
      {currentPage==='/' && (
      <div className="price-filter-container">
        <span className="price-text">Filter Based on Price: {productPriceValue}</span>
        <input
          type="range"
          min="100"
          max="500"
          value={productPriceValue}
          onChange={handlePriceChange}
          className="price-slider"
        />
      </div>
      )}

      <section className='button-section'>
      <button className="login-Button" onClick={handleLogin}>
        Login
        <img
          src="/avatar.png"
          alt="login"
          style={{ width: "40px", padding: "4px" }}
        />
      </button>

      {currentPage === '/cart' ? (
        <button onClick={handleHome} className="cart-Button">
          Home
          <img
            src="/home.png"
            alt="home"
            style={{ width: "40px", padding: "4px" }}
          />
        </button>
      ) : (
        <button onClick={handleCart} className="cart-Button">
          Cart
          <img
            src="/cart-image.png"
            alt="image-cart"
            style={{ width: "50px", padding: "4px" }}
          />
          <p>{cartCollection.length}</p>
        </button>
      )}
      </section>
     
    </div>
  );
};

export default Navbar;
