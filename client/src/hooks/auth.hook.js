import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)
  const [userId, setUserId] = useState(null)
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)

  const login = useCallback((jwtToken, id, _firstName, _lastName) => {
    setToken(jwtToken)
    setUserId(id)
    setFirstName(_firstName)
    setLastName(_lastName)

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        token: jwtToken,
        firstName: _firstName,
        lastName: _lastName,
      })
    )
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setFirstName(null)
    setLastName(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    // console.log(data)
    if (data && data.token) {
      login(data.token, data.userId, data.firstName, data.lastName)
    }
    setReady(true)
  }, [login])

  return { login, logout, token, userId, ready, firstName, lastName }
}
