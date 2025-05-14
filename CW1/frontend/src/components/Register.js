import { useState } from 'react';
import { register } from '../api';

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setFieldErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const res = await register(form);
            setMessage(res.data.message);
        } catch (err) {
            if (err.response?.data?.errors) {
                const newFieldErrors = {};
                err.response.data.errors.forEach((e) => {
                    newFieldErrors[e.path] = e.msg;
                });
                setFieldErrors(newFieldErrors);
            } else {
                setMessage(err.response?.data?.message || "Registration failed");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3 ">
                <label className="form-label ">Name</label>
                <input
                    name="name"
                    className={`form-control ${fieldErrors.name ? 'is-invalid' : ''}`}
                    placeholder="Enter name"
                    onChange={handleChange}
                />
                {fieldErrors.name && <div className="invalid-feedback">{fieldErrors.name}</div>}
            </div>

            <div className="form-group mb-3 ">
                <label className="form-label">Email</label>
                <input
                    name="email"
                    className={`form-control ${fieldErrors.email ? 'is-invalid' : ''}`}
                    placeholder="Enter email"
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
                    onChange={handleChange}
                />
                {fieldErrors.password && <div className="invalid-feedback">{fieldErrors.password}</div>}

            </div>

            <div className="text-center mt-5 pt-2 btn-class">
                <button className="btn  btn-glow w-100" type="submit">
                    Register
                </button>
                {message && <p className="text-center mt-3 text-info">{message}</p>}

            </div>

        </form>
    );
}