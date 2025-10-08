import { useParams, useNavigate } from 'react-router-dom';

const years = ['2025', '2024', '2023', '2022'];

const PastPapersByYear = () => {
  const { schoolId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container py-5 text-center">
      <h2 className="fw-bold mb-4">Select Year for Past Papers</h2>
      <div className="row justify-content-center">
        {years.map(year => (
          <div key={year} className="col-md-3 mb-3">
            <button className="btn btn-outline-dark w-100" onClick={() => navigate(`/school/${schoolId}/papers/${year}`)}>
              📆 {year}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastPapersByYear;
