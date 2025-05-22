const BASE_URL = "https://api.escuelajs.co/api/v1"

export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/products`)
  if (!res.ok) throw new Error("Failed to fetch products")
  return res.json()
}

export async function fetchProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`)
  if (!res.ok) throw new Error("Failed to fetch product")
  return res.json()
}

export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/categories`)
  if (!res.ok) throw new Error("Failed to fetch categories")
  return res.json()
}
