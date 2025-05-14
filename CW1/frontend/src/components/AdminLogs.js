import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminPanel() {

    const [logs, setLogs] = useState([]);
    const [error, setError] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get('http://localhost:5000/admin/logs', {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            setLogs(res.data);

        }).catch((err) => {
            setError(err.response?.data?.message || 'Error loading logs');
        });
    }, []);

    const [apiKeys, setApiKeys] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch('http://localhost:5000/admin/keys', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setApiKeys(data))
            .catch(err => console.error('Error fetching API keys:', err));
    }, []);


    return (
        <div className="container">
            <h2 className="form-heading mb-4">API Usage logs</h2>
            {error && <p className="text-danger">{error}</p>}
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>User Email</th>
                        <th>Endpoint</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr key={log.id}>
                            <td>{log.email}</td>
                            <td>{log.endpoint}</td>
                            <td>{new Date(log.accessed_at).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h4 className="form-heading mb-4"> API Keys</h4>
            <table className="table table-bordered table-sm mt-3">
                <thead className="table-light">
                    <tr>
                        <th>Email</th>
                        <th>API Key</th>
                        <th>Usage Count</th>
                        <th>Last Used</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                {apiKeys.map((item) => (
                        <tr key={item.api_key}>
                            <td>{item.email}</td>
                            <td style={{ color: 'crimson' }}>{item.api_key}</td>
                            <td>{item.usage_count}</td>
                            <td>{item.last_used ? new Date(item.last_used).toLocaleString() : 'Never Used'}</td>
                            <td>{new Date(item.created_at).toLocaleString()}</td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>

        </div>
    );
}