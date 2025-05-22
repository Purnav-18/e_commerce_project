import React, { createContext, useState } from "react"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  )

  function login(email, password) {
    const fakeUser = { email }
    setUser(fakeUser)
    localStorage.setItem("user", JSON.stringify(fakeUser))
  }

  function logout() {
    setUser(null)
    localStorage.removeItem("user")
  }

  function signup(email, password) {
    const fakeUser = { email }
    setUser(fakeUser)
    localStorage.setItem("user", JSON.stringify(fakeUser))
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  )
}
