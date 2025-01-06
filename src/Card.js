import React from 'react'
import ITEMS from './constants/Items'

const Card = ({id , name , price , availableQuantity}) => {

    const addToCard = (itemId) => {

        
        const productItem = ITEMS.find ((product)=> product.id === itemId);
        console.log("productItem", productItem)
        if(productItem.availableQuantity>0) {
            productItem.availableQuantity -= 1;
        }
        
        const oldData = JSON.parse(localStorage.getItem("itemsInCart" )) || [];
        const currentData = oldData.find((product)=> product.id === itemId)
        const newData = [...oldData , productItem]
        localStorage.setItem("itemsInCart" , JSON.stringify(newData) )
    }
  return (
    <div style={{border: '2px solid grey' , padding:'10px' , gap:'5px', display:'flex' , width:'400px', flexWrap:'wrap'}}>
      <div style={{flex:'calc(0 0 33%-5px'}}>
        <h1>Product : {name }</h1>
        <p>Price : {price}</p>
        <p> Available Quantity : {availableQuantity }</p>
        <button style={{backgroundColor:'lightgreen',  cursor:'pointer'}} onClick={()=>addToCard(id)}>Buy Now</button>
      </div>
    </div>
  )
}

export default Card
