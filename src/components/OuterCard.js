import React from 'react';

import Card from './Card';
import Navbar from './Navbar';
import { useProduct } from './context/GlobalContext';


const OuterCard = () => {

  const {productCollection, setProductCollection} = useProduct();

 
  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' , marginTop:'1900px' , marginLeft : '150px'}}>
        {productCollection && productCollection.map((item) => (
          <Card
            key={item.id}
            {...item}
            image = "/general-product.jpg"
            setProductCollection={setProductCollection}
            productCollection={productCollection}
          />
        ))}
      </div>
    </>
  );
};

export default OuterCard;
