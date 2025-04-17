import { useState } from 'react';
import { register } from '../api';

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await register(form);
            setMessage(res.data.message);
        } catch (err) {
            setMessage(err.response?.data?.message || 'Error registering');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3 ">
                <label className="form-label ">Name</label>
                <input
                    name="name"
                    className="form-control"
                    placeholder="Enter name"
                    onChange={handleChange}
                />
            </div>

            <div className="form-group mb-3 ">
                <label className="form-label">Email</label>
                <input
                    name="email"
                    className="form-control"
                    placeholder="Enter email"
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
                    onChange={handleChange}
                />
            </div>

            <div className="text-center mt-5 pt-2 btn-class">
                <button className="btn  btn-glow w-100" type="submit">
                    Register
                </button>
            </div>

            <p className="text-center mt-3 text-muted">{message}</p>
        </form>
    );
}