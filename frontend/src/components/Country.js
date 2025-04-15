import { useState } from "react";
import { fetchCountry } from "../api";

export default function Country(){
    const [country, setCountry] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async () =>{
        try{
            const token = localStorage.getItem('token');
            const res = await fetchCountry(country,token);
            setResult(res.data);
            setError('');

        }catch(err){
            setError('Invalid token or country not found');
            setResult(null);
        
        }
    };

    return(
        <div>
            <h2>Search Country</h2>
            <input value={country} onChange={(e) => setCountry(e.target.value)}/>
            <button onClick={handleSearch}>Search</button>
            {error && <p>{error}</p>}
            {result && (
                <div>
                    <h3>{result.name}</h3>
                    <p>Capital: {result.capital}</p>
                    <p>Currency: {result.currencies}</p>
                    <p>Languages: {result.languages}</p>
                    <img src={result.flag} alt="Flag" width={100}/>                   
                </div>
            )}
        </div>
    );
}