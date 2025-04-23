import { useState } from "react";
import { login } from "../api";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({});
  };

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
      if (err.response?.data?.errors) {
        const newFieldErrors = {};
        err.response.data.errors.forEach((e) => {
          newFieldErrors[e.path] = e.msg;
        });
        setFieldErrors(newFieldErrors);
      } else {
        setError(err.response?.data?.message || 'Login failed');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label className="form-label">Email</label>
        <input
          name="email"
          className={`form-control ${fieldErrors.email ? 'is-invalid' : ''}`}
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
        />
        {fieldErrors.email && <div className="invalid-feedback">{fieldErrors.email}</div>}
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Password</label>
        <input
          name="password"
          type="password"
          className={`form-control ${fieldErrors.password ? 'is-invalid' : ''}`}
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
        />
        {fieldErrors.password && <div className="invalid-feedback">{fieldErrors.password}</div>}
      </div>

      <div className="text-center mt-5 pt-2 btn-class">
        <button className="btn btn-glow w-100" type="submit">
          Login
        </button>
        {error && <p className="text-danger text-center mt-3">{error}</p>}
      </div>

    </form>
  );
}
