import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSchools } from '../services/api';

const Landing = () => {
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    getSchools().then(res => setSchools(res.data)).catch(() => setSchools([]));
  }, []);

  return (
    <div className="container py-5">
      <header className="text-center mb-5">
        <h1 className="fw-bold display-5">KNU MATE</h1>
        <p className="lead text-muted">Explore academic resources by school, type, and year.</p>
      </header>

      <div className="row g-4">
        {schools.map(school => (
          <div key={school._id} className="col-md-6 col-lg-3">
            <div
              className={`card h-100 border-primary cursor-pointer`}
              onClick={() => navigate(`/school/${school._id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-body text-center">
                <h5 className={`card-title text-primary`}>🎓 {school.name}</h5>
                <p className="card-text">Click to explore notes and past papers.</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Landing;
