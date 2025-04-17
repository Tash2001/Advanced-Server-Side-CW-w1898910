import { useState } from "react";
import { login } from "../api";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Step 1: Login
      const res = await login(form);
      const token = res.data.token;
      localStorage.setItem('token', token);

      // Step 2: Generate API Key
      const keyRes = await fetch('http://localhost:5000/users/generate-key', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const keyData = await keyRes.json();
      if (keyRes.ok) {
        localStorage.setItem('apiKey', keyData.apiKey);
      } else {
        console.warn('API key generation failed:', keyData.message || keyData.error);
      }

      onLogin();
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label className="form-label">Email</label>
        <input
          name="email"
          className="form-control"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Password</label>
        <input
          name="password"
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
        />
      </div>

      <div className="text-center mt-5 pt-2 btn-class">
        <button className="btn btn-glow w-100" type="submit">
          Login
        </button>
      </div>

      <p className="text-center mt-3 text-danger">{error}</p>
    </form>
  );
}
