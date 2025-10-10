import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const AdminNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'rgba(255, 255, 255, 0.75)',
    padding: '0.5rem 1rem',
  };

  const activeLinkStyle = {
    ...linkStyle,
    color: '#fff',
    fontWeight: 'bold',
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/admin/manage">KNU MATE - Admin</NavLink>
        <div className="d-flex align-items-center">
          <NavLink to="/admin/manage" style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}>Manage</NavLink>
          <NavLink to="/admin/upload" style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}>Upload</NavLink>
          <button onClick={handleLogout} className="btn btn-outline-danger ms-3">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;