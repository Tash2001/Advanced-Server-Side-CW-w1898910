import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CountryInfo.css';

const CountryInfo = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5005/api/countries/${encodeURIComponent(name)}`)
      .then(res => setCountry(res.data))
      .catch(() => setError('Country details not found.'));
  }, [name]);

  if (error) return <div className="country-info"><p className="error">{error}</p></div>;

  return (
    <div className="country-info">
      <h2>{country?.name}</h2>
      <img src={country?.flag} alt="Country flag" className="flag" />
      <p><strong>Capital:</strong> {country?.capital}</p>
      <p><strong>Language:</strong>{country?.languages}</p>
      <p><strong>Currency:</strong> {country?.currency}</p>
    </div>
  );
};

export default CountryInfo;
