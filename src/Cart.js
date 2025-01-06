import React from 'react'

const Cart = () => {
    const cartItems = JSON.parse(localStorage.getItem("itemsInCart"));
    console.log("cartItems", cartItems)
  return (
    <div>
        {
            cartItems.map ((item)=> {
                return (
                    <div style={{border: '2px solid grey' , padding:'10px' , gap:'5px', display:'flex' , width:'400px', flexWrap:'wrap'}}>
                    <div style={{flex:'calc(0 0 33%-5px'}}>
                      <h1>Product : {item.name }</h1>
                      <p>Price : {item.price}</p>
                      <p> Available Quantity : {item.availableQuantity }</p>
        
                    </div>
                  </div>

                );
               
            })
        }
      
    </div>
  )
}

export default Cart
