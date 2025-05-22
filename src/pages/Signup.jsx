import React, { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"

export default function Signup() {
  const { signup } = useContext(AuthContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    if (password !== confirm) {
      setError("Passwords do not match")
      return
    }
    signup(email, password)
    navigate("/")
  }

  return (
    <div className="w-50 mx-auto">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-danger">{error}</p>}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            id="email"
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm" className="form-label">
            Confirm Password
          </label>
          <input
            id="confirm"
            type="password"
            className="form-control"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
        <p className="mt-3">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  )
}
