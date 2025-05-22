import React, { useContext, useState } from "react"
import { CartContext } from "../context/CartContext"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [address, setAddress] = useState("")
  const [message, setMessage] = useState("")

  if (!user) {
    return (
      <div>
        <h2>You must be logged in to checkout</h2>
        <button className="btn btn-primary" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    )
  }

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  function handleOrder() {
    if (!address) {
      setMessage("Please enter a shipping address")
      return
    }
    alert(`Order placed!\nTotal: $${totalPrice.toFixed(2)}\nAddress: ${address}`)
    clearCart()
    navigate("/")
  }

  if (cart.length === 0)
    return (
      <div>
        <h2>Your cart is empty</h2>
      </div>
    )

  return (
    <div>
      <h2>Checkout</h2>
      <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">
          Shipping Address
        </label>
        <textarea
          id="address"
          className="form-control"
          rows="3"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>
      </div>
      {message && <p className="text-danger">{message}</p>}
      <button className="btn btn-success" onClick={handleOrder}>
        Place Order
      </button>
    </div>
  )
}
