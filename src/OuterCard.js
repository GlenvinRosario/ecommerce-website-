import React from 'react'
import ITEMS from './constants/Items'
import Card from './Card'
import {useNavigate} from 'react-router-dom'

const OuterCard = () => {
    const navigate = useNavigate();

    const handleCart = () => {
        navigate("/cart")
    }
  return (
    <div>
        <button onClick={handleCart}>Cart </button>
        {
      ITEMS.map((item) => {
        return (
          <>
            <Card id={item.id} name={item.name} price={item.price} availableQuantity={item.availableQuantity} />
          </>
        )
      })
      }
      
    </div>
  )
}

export default OuterCard
