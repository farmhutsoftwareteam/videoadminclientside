import React, { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Index = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
    console.log('------starting to log in --------', userName);
    try {
      const response = await fetch('https://hstvvideoapp.azurewebsites.net/api/users/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: userName, password: password }),
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.set('token', data.token, { expires: 7 });
        router.push("/videos"); // Navigate to the 'videos' screen
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error or server is unreachable");
    } finally {
      setIsLoading(false); // This will stop the loading state after the request is completed
    }
  };

  return (
    <div className="flex h-screen bg-black justify-center items-center">
      <div className="text-left w-full px-4 md:w-1/3">
        <h1 className="text-white text-2xl mb-4">Sign In To Proceed</h1>
        <div className="mt-3">
          <div className="mb-4">
            <label className="block text-white mb-2 text-left" htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              placeholder="Enter your username"
              className="w-full p-2 bg-black text-white border border-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2 text-left" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your Password"
              className="w-full p-2 bg-black text-white border border-white"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            onClick={handleLogin}
            className="mt-4 bg-white text-black py-2 px-4 w-full md:w-auto"
            disabled={isLoading}
          >
            {isLoading ? 'Loading ...' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;