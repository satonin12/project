import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Loader } from './components/Loader'
import { Navbar } from './components/Navbar/Navbar'
import 'materialize-css'

function App() {
  const { token, login, logout, userId, ready, firstName, lastName } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuthenticated,
        firstName,
        lastName,
      }}
    >
      <Router>
        {isAuthenticated && <Navbar />}
        <div>{routes}</div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
