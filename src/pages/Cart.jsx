import React, { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext"

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext)
  const navigate = useNavigate()

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  function handleCheckout() {
    navigate("/checkout")
  }

  if (cart.length === 0)
    return (
      <div>
        <h2>Your Cart is Empty</h2>
        <Link to="/" className="btn btn-primary mt-3">
          Go Shopping
        </Link>
      </div>
    )

  return (
    <div>
      <h2>Shopping Cart</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th style={{ width: "100px" }}>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>${item.price}</td>
              <td>{item.quantity}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Total: ${totalPrice.toFixed(2)}</h4>
      <button className="btn btn-success me-2" onClick={handleCheckout}>
        Proceed to Checkout
      </button>
      <button className="btn btn-outline-danger" onClick={clearCart}>
        Clear Cart
      </button>
    </div>
  )
}
