import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    country: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("he;;l",e)
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.username || !formData.country) {
      setError("Please fill in all fields.");
      return;
    }
    
    setError("");

    try{
      console.log(11111)
      const response = await axios.post("http://192.168.0.151:5000/auth/register", formData)
      setFormData({
        email:"",
        username:"",
        country:"",
        password:""
      })
      alert("Registration successful!");
      console.log("hello")
      navigate("/login")
    }

    catch(err){
      console.log(err)
    setError(err.response?.data?.message || "Something went wrong during registration.");
    }

    console.log("Registering user:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="username"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
        required
      />
      
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" onClick={handleSubmit}>Register</button>
    </form>
  );
}
