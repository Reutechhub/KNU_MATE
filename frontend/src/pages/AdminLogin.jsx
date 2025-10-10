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
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const apiUrl = import.meta.env.VITE_API_URL; // Read the API URL
      //console.log('API URL:', apiUrl); // Debugging line to check the URL

      // Ensure the URL is constructed correctly
      const res = await axios.post(`${apiUrl}/api/auth/login`, { username, password });
      if (res.data?.user && res.data?.token) {
        login({ ...res.data.user, token: res.data.token });
        navigate('/admin/manage');
      } else if (res.data?.user) {
        // Fallback if token is not directly in res.data but user is
        login(res.data.user);
        navigate('/admin/manage');
      }
      else {
        setError('Invalid login response');
      }
    } catch (err) {
      console.error(err); // Log error for debugging
      setError('Login failed.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow w-100" style={{ maxWidth: '400px' }}>
        <h2 className="mb-4 fw-bold">Hidden Admin Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <input 
          type="text" 
          className="form-control mb-3" 
          placeholder="Admin Username" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          required 
        />
        <div className="input-group mb-3">
          <input 
            type={showPassword ? 'text' : 'password'} 
            className="form-control" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
          />
          <button 
            type="button" 
            className="btn btn-outline-secondary" 
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
