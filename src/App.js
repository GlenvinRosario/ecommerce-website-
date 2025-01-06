import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import OuterCard from './OuterCard'
import Cart from './Cart'

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OuterCard/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
      </Routes>
    </BrowserRouter>
    
      
    </>
  )
}

export default App
