import React from "react"
import { Routes, Route } from "react-router-dom"
import MyNavbar from "./Components/MyNavbar"
import Home from "./pages/Home"
import Product from "./Pages/Product"
import Cart from "./Pages/Cart"
import Checkout from "./Pages/Checkout"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"

export default function App() {
  return (
    <>
      <MyNavbar />
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  )
}
