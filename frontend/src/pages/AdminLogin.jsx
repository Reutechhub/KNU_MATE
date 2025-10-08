import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import axios from 'axios';

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      if (res.data?.user) {
        login(res.data.user);
        if (res.data.token) localStorage.setItem('token', res.data.token);
        navigate('/admin/upload');
      } else {
        setError('Invalid login response');
      }
    } catch {
      setError('Login failed.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow w-100" style={{ maxWidth: '400px' }}>
        <h2 className="mb-4 fw-bold">Hidden Admin Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <input type="text" className="form-control mb-3" placeholder="Admin Username" value={username} onChange={e => setUsername(e.target.value)} required />
        <input type="password" className="form-control mb-3" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
