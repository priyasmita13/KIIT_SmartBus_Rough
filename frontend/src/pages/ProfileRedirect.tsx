import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProfileRedirect() {
  const navigate = useNavigate()

  useEffect(() => {
    const user = sessionStorage.getItem('user')
    if (user) {
      // Redirect all users to Home page (temporary)
      navigate('/')
    } else {
      navigate('/') // redirect to login if no user
    }
  }, [navigate])

  return <div>Redirecting...</div>
}
