import React from "react"
import { Link } from "react-router-dom"

export default function ProductCard({ product }) {
  return (
    <div className="card h-100 shadow-sm">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.images[0]}
          className="card-img-top"
          alt={product.title}
          style={{ height: "200px", objectFit: "cover" }}
        />
      </Link>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text text-truncate">{product.description}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <strong>${product.price}</strong>
          <Link to={`/product/${product.id}`} className="btn btn-primary btn-sm">
            View
          </Link>
        </div>
      </div>
    </div>
  )
}
