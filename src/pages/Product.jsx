import React, { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { fetchProductById } from "../api/products"
import { CartContext } from "../context/CartContext"

export default function Product() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)

  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await fetchProductById(id)
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  function handleAddToCart() {
    addToCart(product, quantity)
    alert("Added to cart!")
  }

  if (loading) return <p>Loading product...</p>
  if (error) return <p className="text-danger">{error}</p>
  if (!product) return <p>Product not found.</p>

  return (
    <div className="row">
      <div className="col-md-6">
        <img
          src={product.images[0]}
          alt={product.title}
          className="img-fluid rounded"
        />
      </div>
      <div className="col-md-6">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <h4>${product.price}</h4>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            className="form-control w-25"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
        <button className="btn btn-primary" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}
