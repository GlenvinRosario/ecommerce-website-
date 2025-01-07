import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Cart from './components/Cart'
import OuterCard from './components/OuterCard'
import LoginPage from './components/Login'
import RegisterPage from './components/Register'
import { ProductProvider } from './components/context/GlobalContext'

const App = () => {
  return (
    <>
    <ProductProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OuterCard/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/register" element={<RegisterPage/>}></Route>
      </Routes>
    </BrowserRouter>
    </ProductProvider>
      
    </>
  )
}

export default App;