import React, { useEffect, useState } from 'react';
import ITEMS from '../constants/Items';
import Card from './Card';
import Navbar from './Navbar';
import { useProduct } from './context/GlobalContext';


const OuterCard = () => {

  const {productCollection, setProductCollection} = useProduct();
 
  return (
    <>

      <Navbar productCollection={productCollection} setProductCollection={setProductCollection}/>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' , marginTop:'1700px' , marginLeft : '50px'}}>
        {productCollection.map((item) => (
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
