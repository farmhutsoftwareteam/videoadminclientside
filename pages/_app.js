import "@/styles/globals.css";
import { AuthProvider } from "../contexts/authProvider";

export default function App({ Component, pageProps }) {
  return(
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
  
  
}
