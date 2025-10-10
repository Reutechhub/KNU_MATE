import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getIntakes } from '../services/api';

const IntakeView = () => {
  const [intakes, setIntakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { schoolId, programId } = useParams();

  useEffect(() => {
    const fetchIntakes = async () => {
      try {
        setLoading(true);
        setError(null);
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), 35000)
        );
        const response = await Promise.race([getIntakes(programId), timeoutPromise]);
        setIntakes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch intakes", error);
        setError(error.message === 'Timeout' ? "Refresh or check your connectivity" : "Failed to fetch intakes");
        setLoading(false);
      }
    };

    fetchIntakes();
  }, [programId]);

  if (error) {
    return (
      <div className="text-center p-5">
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center p-5 d-flex flex-column align-items-center">
        <img src="/logo.png" alt="Logo" className="mb-3" style={{ width: '50px', height: '50px' }} />
        <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted">Processing...</p>
      </div>
    );
  }

  return (
    <div className="bg-light" style={{ minHeight: 'calc(100vh - 56px)'}}>
      <div className="container py-4 py-sm-5">
        <h1 className="h2 fw-bold text-dark mb-4">Select Intake</h1>
        <div className="row g-3">
          {intakes.map((intake) => (
            <div key={intake._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <Link to={`/school/${schoolId}/program/${programId}/intake/${intake._id}`} className="text-decoration-none">
                <div className="card h-100 shadow-sm hover-shadow">
                  <div className="card-body p-4 d-flex align-items-center justify-content-center"><h2 className="h5 fw-semibold text-dark mb-0">{intake.name}</h2></div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntakeView;