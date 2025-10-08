import { useParams, useNavigate } from 'react-router-dom';

const SchoolView = () => {
  const { schoolId } = useParams();
  const navigate = useNavigate();

  const displayName = schoolId ? schoolId.replace(/-/g, ' ') : null;

  return (
    <div className="container py-5 text-center">
      <h2 className="fw-bold mb-4">Explore {displayName ? `${displayName} Materials` : 'Schools'}</h2>
      {displayName ? (
        <div className="row justify-content-center">
          <div className="col-md-4">
            <button className="btn btn-outline-success w-100 mb-3" onClick={() => navigate(`/school/${schoolId}/notes`)}>
              📘 View Notes
            </button>
            <button className="btn btn-outline-primary w-100" onClick={() => navigate(`/school/${schoolId}/papers`)}>
              📄 View Past Papers
            </button>
          </div>
        </div>
      ) : (
        <p className="text-muted">Select a school from the homepage to view its materials.</p>
      )}
    </div>
  );
};

export default SchoolView;
