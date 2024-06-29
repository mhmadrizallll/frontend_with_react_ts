import React, { useState, useEffect } from "react";
import axios from "axios";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in (by checking sessionStorage)
    const token = sessionStorage.getItem("token");
    if (token) {
      handleRoleRedirect();
    }
  }, []);

  const handleRoleRedirect = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        // Decode your JWT token to get user role
        const decodedToken = parseJwt(token);
        const role = decodedToken.role; // Assuming role is stored in token
        if (role === "admin" || role === "superadmin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        // Handle error if token cannot be decoded
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/login",
        {
          username,
          password,
        }
      );

      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (response.status === 200) {
        const token = response.data.token;
        sessionStorage.setItem("token", token);
        handleRoleRedirect(); // Redirect based on role after successful login
      } else {
        setError("Login failed, please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed, please try again.");
    }
  };

  const onSuccess = async (res: CredentialResponse) => {
    const token = res.credential;
    console.log("Google token:", token);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/auth/google",
        {
          token,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const userToken = response.data.token;
      sessionStorage.setItem("token", userToken);
      handleRoleRedirect(); // Redirect based on role after successful login
    } catch (err) {
      console.error("Google login error:", err);
    }
  };

  const onError = () => {
    console.error("Login Failed:");
    setError("Login failed, please try again.");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 flex-col">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div>
            <button
              data-testid="login-btn"
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <GoogleLogin onSuccess={onSuccess} onError={onError} />
    </div>
  );
};

export default LoginPage;

// Function to parse JWT token (example, modify based on your JWT structure)
function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return {};
  }
}
