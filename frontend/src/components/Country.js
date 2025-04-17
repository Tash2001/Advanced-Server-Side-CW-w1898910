import { useState } from "react";
import { fetchCountry } from "../api";

export default function Country() {
  const [country, setCountry] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    setResult(null);

    const token = localStorage.getItem('token');
    const apiKey = localStorage.getItem('apiKey');

    if (!token || !apiKey) {
      setError(' Missing token or API key. Please login again.');
      return;
    }

    try {
      const res = await fetchCountry(country, token, apiKey);
      setResult(res.data);
    } catch (err) {
      console.error('Error fetching country:', err);
      const backendError = err.response?.data?.error || err.response?.data?.message;
      setError(backendError || ' Invalid country or authorization failed');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="form-heading mb-4"> Search Country Info</h2>

      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <input
            className="form-control mb-3"
            placeholder="Enter country name"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <button className="btn btn-glow w-100" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {error && (
        <p className="text-center text-danger mt-3" style={{ fontWeight: "500" }}>
          {error}
        </p>
      )}

      {result && (
        <div
          className="card mt-5 mx-auto p-4 text-white"
          style={{
            maxWidth: "600px",
            background: "linear-gradient(to right, #1f4037, #99f2c8)",
            border: "none",
            borderRadius: "20px"
          }}
        >
          <h3 className="mb-3" style={{ fontWeight: "700" }}>{result.name}</h3>
          <p><strong>Capital:</strong> {result.capital}</p>
          <p><strong>Currency:</strong> {result.currencies}</p>
          <p><strong>Languages:</strong> {result.languages}</p>
          <img
            src={result.flag}
            alt="Flag"
            style={{ width: "120px", borderRadius: "8px", marginTop: "10px" }}
          />
        </div>
      )}
    </div>
  );
}
