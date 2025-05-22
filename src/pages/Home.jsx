import React, { useEffect, useState } from "react"
import { fetchProducts, fetchCategories } from "../api/products"
import ProductCard from "../components/ProductCard"

export default function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const cats = await fetchCategories()
        setCategories(cats)
        const prods = await fetchProducts()
        setProducts(prods)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category?.id === selectedCategory)
    : products

  return (
    <div>
      <h1 className="mb-4">Products</h1>
      <div className="mb-3">
        <select
          className="form-select w-auto"
          value={selectedCategory || ""}
          onChange={(e) =>
            setSelectedCategory(e.target.value ? Number(e.target.value) : null)
          }
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      {loading && <p>Loading products...</p>}
      {error && <p className="text-danger">{error}</p>}
      <div className="row g-3">
        {filteredProducts.map((product) => (
          <div className="col-12 col-md-4 col-lg-3" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}
