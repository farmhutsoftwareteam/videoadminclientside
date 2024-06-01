import "@/styles/globals.css";
import { AuthProvider } from "../contexts/authProvider";
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {

  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  return(
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
  
  
}
