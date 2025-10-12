import { useParams, useNavigate } from 'react-router-dom';

const CoursePage = () => {
  const { schoolId, programId, yearId, courseId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container py-5 text-center">
      <h2 className="fw-bold mb-4">Choose Resource Type</h2>
      <div className="row justify-content-center">
        <div className="col-md-4 mb-3">
          <button className="btn btn-outline-success w-100" onClick={() => navigate(`/school/${schoolId}/program/${programId}/year/${yearId}/course/${courseId}/notes`)}>
            📚 Notes
          </button>
        </div>
        <div className="col-md-4 mb-3">
          <button className="btn btn-outline-warning w-100" onClick={() => navigate(`/school/${schoolId}/program/${programId}/year/${yearId}/course/${courseId}/past-papers`)}>
            📄 Past Papers
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
