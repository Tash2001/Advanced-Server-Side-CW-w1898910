import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminPanel(){

    const [logs, setLogs] = useState([]);
    const[error,setError] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(()=>{
        axios.get('http://localhost:5000/admin/logs',{
            headers: {Authorization:`Bearer ${token}`}
        }).then((res)=>{
            setLogs(res.data);
        
        }).catch((err)=>{
            setError(err.response?.data?.message || 'Error loading logs');
        });
    }, []);

    return(
        <div className="container">
            <h2 className="mt-4">API Usage logs</h2>
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
                    {logs.map((log)=>(
                        <tr key={log.id}>
                            <td>{log.email}</td>
                            <td>{log.endpoint}</td>
                            <td>{new Date(log.accessed_at).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}