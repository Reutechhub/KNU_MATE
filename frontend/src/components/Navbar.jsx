import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span className="badge rounded-pill bg-primary me-2">K</span>
          <span className="fw-bold text-primary">KNU MATE</span>
        </Link>

        <div className="d-flex align-items-center">
          {/* Staff login is hidden from public UI. Admins access via /admin-login */}
          {user && (
            <button className="btn btn-danger" onClick={logout}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
