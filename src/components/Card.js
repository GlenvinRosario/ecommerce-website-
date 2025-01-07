import React from 'react';
import './Card.css';
import { useProduct } from './context/GlobalContext';

const Card = ({ id, name, price, availableQuantity , image }) => {
  const { productCollection, setProductCollection, cartCollection, setCartCollection } = useProduct();

  const addToCard = () => {
    const productItem = productCollection.find((product) => product.id === id);
  
    if (productItem && productItem.availableQuantity > 0) {
  
      const updatedProductCollection = productCollection.map((prod) =>
        prod.id === id
          ? { ...prod, availableQuantity: prod.availableQuantity - 1 }
          : prod
      );
      setProductCollection(updatedProductCollection);
  
      // Update cartCollection
      const existingProduct = cartCollection.find((item) => item.id === id);
  
      if (existingProduct) {

        const updatedCartCollection = cartCollection.map((item) =>
          item.id === id ? { ...item, count: item.count + 1 } : item
        );

        setCartCollection(updatedCartCollection);
      } else {

        const newProduct = { ...productItem, count: 1 };
        setCartCollection([...cartCollection, newProduct]);
      }
    } else {
      console.log('Item out of stock!');
    }
  };
  
  return (
    <div className="card">
      <h1 className="card-title">{name}</h1>
      <img src={image} style={{width: '80px'}} alt="product-image" />
      <p className="card-price">Price: {price}</p>
      <p className={`card-quantity ${availableQuantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
        Available Quantity: {availableQuantity}
      </p>
      {availableQuantity > 0 ? (
        <button className="card-button buy-now" onClick={addToCard}>
          Add to Cart
        </button>
      ) : (
        <button className="card-button out-of-stock" disabled>
          Out of Stock
        </button>
      )}
    </div>
  );
};

export default Card;
