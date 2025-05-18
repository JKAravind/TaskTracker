import React, { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    country: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.name || !formData.country) {
      setError("Please fill in all fields.");
      return;
    }
    
    setError("");

    console.log("Registering user:", formData);

    setFormData({
      email: "",
      password: "",
      name: "",
      country: "",
    });
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
        name="name"
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

      <button type="submit">Register</button>
    </form>
  );
}
