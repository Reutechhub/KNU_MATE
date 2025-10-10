import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getIntakes } from '../services/api';
import Header from '../components/Header';

const IntakeView = () => {
  const [intakes, setIntakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { schoolId, programId } = useParams();

  useEffect(() => {
    const fetchIntakes = async () => {
      try {
        setLoading(true);
        const response = await getIntakes(programId);
        setIntakes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch intakes", error);
        setLoading(false);
      }
    };

    fetchIntakes();
  }, [programId]);

  if (loading) {
    return <div className="text-center p-5">Loading intakes...</div>;
  }

  return (
    <div className="bg-light" style={{ minHeight: 'calc(100vh - 56px)'}}>
      <Header />
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