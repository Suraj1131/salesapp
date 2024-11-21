"use client";

import { useState } from "react";
import supabase from "./utils/supabaseClient";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");


  const handleLogin = async () => {
    setError(""); 
    setMessage(""); 
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.error("Login Error:", error);
        setError(error.message); 
      } else {
        console.log("Login Success:", data); 
        setMessage("Login successful!");
        setTimeout(() => {
          router.push("/dashboard/home"); 
        }, 300); 
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  
  const handleCreateUser = async () => {
    setError(""); 
    setMessage(""); 
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        console.error("Signup Error:", error);
        console.error("Detailed Error:", error.details);
        setError(error.message); 
      } else {
        console.log("User created successfully:", data);
        setMessage(
          "User created successfully! Please check your email to confirm your account."
        );
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
      <h1 className="text-2xl font-bold mb-4 text-black">Login / Signup</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded text-black"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-500 mb-4">{message}</p>}
        <button
          onClick={handleLogin}
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 mb-2"
        >
          Login
        </button>
        <button
          onClick={handleCreateUser}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-Blue-600"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default Login;
