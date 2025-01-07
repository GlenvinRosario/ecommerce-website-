import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Components.css';
import { useProduct } from './context/GlobalContext';
import ITEMS from '../constants/Items';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [ productPriceValue , setProductPriceValue] = useState();

  const {productCollection, setProductCollection, cartCollection, setCartCollection }= useProduct();
  const[discountApplied , setDiscountApplied]= useState(false)
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
    const productName = event.target.value;
    console.log("productName", productName)
    if(productName.trim() === '' ) {
        setProductCollection(ITEMS)
    }else {
      const filteredProducts = productCollection.filter((product)=> product.name.toLowerCase().includes(productName.toLowerCase()));
      setProductCollection(filteredProducts)
    }
    
  }
  function handlePriceChange(event) {
    const priceBasedProduct = event.target.value;
    setProductPriceValue(priceBasedProduct)
    if(priceBasedProduct) {
      const filteredProducts = ITEMS.filter((product=> product.price>=priceBasedProduct));
      setProductCollection(filteredProducts)
    } else {
      setProductCollection(ITEMS)
    }
  
  }
  function handleLowToHigh () {
    const filteredProducts = [...productCollection].sort((a,b)=> a.price - b.price);
    setProductCollection(filteredProducts)

  }
  function handleHighToLow () {
    const filteredProducts = [...productCollection].sort((a,b)=> b.price - a.price);
    setProductCollection(filteredProducts)
  }

  function handleAlphabet () {
    const filteredProducts = [...productCollection].sort((a,b)=> a.name.localeCompare(b.name) );
    setProductCollection(filteredProducts)
  }
  function handleDiscount () {
    setDiscountApplied(true)
    const discountedProducts = productCollection.map((product)=> ({...product, price : (product.price*0.9)}));
    setProductCollection(discountedProducts)
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
        <button className={discountApplied ? "discount-button-disabled" : "discount-button"}  disabled={discountApplied} onClick={handleDiscount}>Apply 10% Discount</button>
      </span>
      {currentPage==='/' && (
        <div className="button-container">
        <button className="sort-button" onClick={handleLowToHigh}>
          Low to High
        </button>
        <button className="sort-button" onClick={handleHighToLow}>
          High to Low
        </button>
        <button className="sort-button" onClick={handleAlphabet}>
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
