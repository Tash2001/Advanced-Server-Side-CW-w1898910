import { useState } from "react";
import { login } from "../api";

export default function Login({onLogin}){
    const [form, setForm] = useState({email: '' , password:''});
    const [error,setError] = useState('');

    const handleChange = (e)=> setForm({...form, [e.target.name]: e.target.value});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await login(form);
            localStorage.setItem('token',res.data.token);
            onLogin();

        }catch(err){
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input name="email" placeholder="Email" onChange={handleChange}/>
            <input name="password" type="password" placeholder="Password" onChange={handleChange}/>
            <button type="submit">Login</button>
            <p>{error}</p>
        </form>
    );
}