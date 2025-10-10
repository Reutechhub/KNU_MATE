import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/logo.png" alt="Logo" className="me-2" style={{ height: '40px' }} />
          <span className="fw-bold text-white">KNU MATE</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
