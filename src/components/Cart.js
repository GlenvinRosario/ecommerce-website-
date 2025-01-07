import React, { useEffect } from 'react';
import './styles/Cart.css';
import Navbar from './Navbar';
import { useProduct } from './context/GlobalContext';
import ITEMS from '../constants/Items';

const Cart = () => {
  const { cartCollection, setCartCollection ,productCollection , setProductCollection } = useProduct();
  
  const totalPrice = cartCollection.reduce((total , currentItem) => total + currentItem.price * currentItem.count, 0)
  useEffect(() => {
    setCartCollection(cartCollection)
  }, [cartCollection]);

  const handleRemove = (itemId) => {
    
    const updatedCartCollection = cartCollection.filter((cartItem) => cartItem.id !== itemId);
    setCartCollection(updatedCartCollection);
    
    const updatedProductCollection = productCollection.map((cartItem) => cartItem.id === itemId ? {...cartItem , availableQuantity: 10 }
    :cartItem);
    setProductCollection(updatedProductCollection)

  };
  const handleDecrement = (itemId) => {
    const updatedCartCollection = cartCollection.map((item)=> item.id === itemId ? {...item, count : item.count>0 ? item.count - 1 : 0}
    : item);
    setCartCollection(updatedCartCollection);
    const updatedProductCollection= productCollection.map((item)=> item.id === itemId ? {...item, availableQuantity: item.availableQuantity+1}
    : item);
    setProductCollection(updatedProductCollection)
  }

  const handleIncrement = (itemId)  => {
    const updatedCartCollection = cartCollection.map((item)=> item.id === itemId ? {...item, count:  item.count < 10? item.count + 1: 10}: item);
    setCartCollection(updatedCartCollection)
    const updatedProductCollection= productCollection.map((item)=> item.id === itemId ? {...item, availableQuantity: item.availableQuantity-1}
    : item);
    setProductCollection(updatedProductCollection)
  }

  const handleClear = () => {
    setCartCollection([]);
    setProductCollection(ITEMS)
  }

  return (
    <div>
      <Navbar />
      <div className="cart-container">
        {cartCollection.length ? (
          <>
            <h1>Your Cart</h1>

            <button className='clear-button' onClick={handleClear}> Clear Cart</button>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartCollection.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.price.toFixed(2)}</td>
                    <td>
                    <button className="quantity-button" onClick={() => handleDecrement(item.id)}>
                        ➖
                      </button>
                      {item.count}
                      <button className="quantity-button" onClick={() => handleIncrement(item.id)}>
                        ➕
                      </button>
                    </td>
                    <td>{(item.price * item.count).toFixed(2)}</td>
                    <td>
                      <button className="remove-button" onClick={() => handleRemove(item.id)}>
                        Remove From Cart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{margin:'15px'}}>
              <span> Total Price : {totalPrice}</span>
            </div>
          </>
        ) : (
          <div className="empty-cart">No Items in Cart</div>
        )}
      </div>
    </div>
  );
};

export default Cart;
