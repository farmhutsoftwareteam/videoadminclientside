import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      // Assuming the token is your criteria for being logged in
      setUser({ token }); // Set user state if token exists

      // Redirect to '/videos' only if on the root page
      if (router.pathname === '/') {
        router.push('/videos');
      }
    } else {
      // Redirect to '/' only if not already there and no token found
      if (router.pathname !== '/') {
        router.push('/');
      }
    }
  }, [router]); // Removed 'user' from dependencies to avoid redirect loop

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);