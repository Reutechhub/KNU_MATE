import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPrograms } from '../services/api';

const SchoolPage = () => {
  const { schoolId } = useParams();
  const [programs, setPrograms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPrograms(schoolId).then(res => setPrograms(res.data));
  }, [schoolId]);

  return (
    <div className="container py-5 text-center">
      <h2 className="fw-bold mb-4">Programs in School</h2>
      <div className="row justify-content-center">
        {programs.map(program => (
          <div key={program._id} className="col-md-4 mb-3">
            <button className="btn btn-outline-dark w-100" onClick={() => navigate(`/school/${schoolId}/program/${program._id}`)}>
              {program.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchoolPage;
