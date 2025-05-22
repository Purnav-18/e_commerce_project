import React, { createContext, useState, useEffect } from "react"

export const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  function addToCart(product, quantity = 1) {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id)
      if (found) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        return [...prev, { ...product, quantity }]
      }
    })
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  function clearCart() {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
