import {useState} from 'react';
import { register } from '../api';

export default function Register(){
    const [form, setForm] = useState({name: '', email:'', password: ''});
    const [message, setMessage] = useState('');

    const handleChange = (e) => setForm({...form , [e.target.name]: e.target.value});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await register(form);
            setMessage(res.data.message);
        }catch(err){
            setMessage(err.response?.data?.message||'Error registering');
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input name="name" placeholder='Name' onChange={handleChange}/>
            <input name='email' placeholder='Email' onChange={handleChange}/>
            <input name='password' type='password' placeholder='Password' onChange={handleChange}/>
            <button type='subit' >Register</button>
            <p> {message}</p>
        </form>
    );
}