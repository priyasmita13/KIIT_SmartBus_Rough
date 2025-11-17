import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

export default function ProfilePage() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMe() {
      try {
        let token = sessionStorage.getItem('accessToken')
        if (!token) {
          // try refresh
          const r = await axios.post(`${API}/api/auth/refresh`, {}, { withCredentials: true })
          token = r.data.accessToken
          sessionStorage.setItem('accessToken', token || '')
          sessionStorage.setItem('user', JSON.stringify(r.data.user))
        }
        const res = await axios.get(`${API}/api/users/me`, { headers: { Authorization: `Bearer ${token}` } })
        setProfile(res.data)
      } catch (err: any) {
        setError(err?.response?.data?.error?.message || 'Failed to load profile')
      }
    }
    fetchMe()
  }, [])

  function logout() {
    axios.post(`${API}/api/auth/logout`, {}, { withCredentials: true }).finally(() => {
      sessionStorage.clear()
      navigate('/')
    })
  }

  return (
    <div style={{ 
      height: '100vh', 
      width: '100vw',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#f5f5f5',
      margin: 0,
      padding: 0
    }}>
      <div style={{ 
        maxWidth: 600, 
        width: '100%',
        background: 'white',
        borderRadius: 8,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div style={{ 
          background: '#007bff',
          color: 'white',
          padding: 20,
          textAlign: 'center'
        }}>
          <h2 style={{ margin: 0, fontSize: 24 }}>My Profile</h2>
        </div>
        
        <div style={{ padding: 30 }}>
          {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: 20 }}>{error}</p>}
          {profile ? (
            <div style={{ 
              background: '#f8f9fa',
              padding: 20,
              borderRadius: 4,
              marginBottom: 30
            }}>
              <pre style={{ 
                margin: 0, 
                fontSize: 14, 
                color: '#333',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}>
                {JSON.stringify(profile, null, 2)}
              </pre>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <p style={{ color: '#666', fontSize: 16 }}>Loading...</p>
            </div>
          )}
          
          <div style={{ 
            display: 'flex', 
            gap: 12, 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button 
              onClick={logout}
              style={{
                padding: '12px 24px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                fontSize: 16,
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
            <Link 
              to="/map"
              style={{
                padding: '12px 24px',
                backgroundColor: '#28a745',
                color: 'white',
                textDecoration: 'none',
                borderRadius: 4,
                fontSize: 16,
                display: 'inline-block'
              }}
            >
              View Map
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}



