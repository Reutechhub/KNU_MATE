import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const RequireAuth = ({ role, children }) => {
  const { user } = useAuth();
  if (!user || user.role !== role) return <Navigate to="/" />;
  return children;
};

export default RequireAuth;
