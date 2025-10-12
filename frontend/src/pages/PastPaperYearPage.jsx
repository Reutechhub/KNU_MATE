import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMaterials } from '../services/api';

const PastPaperYearPage = () => {
  const { schoolId, programId, yearId, courseId } = useParams();
  const navigate = useNavigate();
  const [years, setYears] = useState([]);

  useEffect(() => {
    // Fetch all past papers for this course to get unique years
    getMaterials(courseId, 'past-papers').then(res => {
      const uniqueYears = [...new Set(res.data.map(m => m.year).filter(y => y))].sort((a, b) => b - a);
      setYears(uniqueYears);
    }).catch(() => setYears([]));
  }, [courseId]);

  return (
    <div className="container py-5 text-center">
      <h2 className="fw-bold mb-4">Select Exam Year</h2>
      <div className="row justify-content-center">
        {years.length > 0 ? years.map(year => (
          <div key={year} className="col-md-3 mb-3">
            <button className="btn btn-outline-dark w-100" onClick={() => navigate(`/school/${schoolId}/program/${programId}/year/${yearId}/course/${courseId}/past-papers/${year}`)}>
              📆 {year}
            </button>
          </div>
        )) : (
          <p className="text-muted">No past papers available for this course.</p>
        )}
      </div>
    </div>
  );
};

export default PastPaperYearPage;
