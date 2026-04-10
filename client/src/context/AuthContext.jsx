import { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axiosClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [role, setRole] = useState(localStorage.getItem('userRole') || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initial load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Assume interceptor deals with token rotations, just check if profile loads
        const currentRole = localStorage.getItem('userRole');
        if (currentRole) {
          const res = await api.get(`/${currentRole}/profile`);
          // user data structure depends on backend API, just using res.data.data mock pattern
          setUser(res.data.data || res.data);
          setRole(currentRole);
        }
      } catch (error) {
        console.error('Session initialization failed:', error);
        localStorage.removeItem('userRole');
        localStorage.removeItem('accessToken');
        setRole(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const loginUser = async (email, password) => {
    const res = await api.post('/login', { email, password });
    const { accessToken, role: userRole } = res.data.data;
    
    // Store core info
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userRole', userRole);
    setRole(userRole);
    
    // Fetch profile immediately after login
    const profileRes = await api.get(`/${userRole}/profile`);
    setUser(profileRes.data.data || profileRes.data);
    
    return { role: userRole };
  };

  const logout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('accessToken');
    setRole(null);
    setUser(null);
  };

  const updateUserProfile = async (newData) => {
    if (!role) return;
    try {
      const res = await api.put(`/${role}/profile`, newData);
      // Update local state after successful PUT
      setUser((prev) => ({ ...prev, ...newData }));
      return res.data;
    } catch (error) {
      console.error('Failed to update profile', error);
      throw error;
    }
  };

  // We should only export what's needed
  return (
    <AuthContext.Provider value={{ role, user, loginUser, logout, updateUserProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
