import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCourses } from '../services/api';

const CourseView = () => {
  const { schoolId, programId } = useParams();
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCourses(programId).then(res => setCourses(res.data));
  }, [programId]);

  return (
    <div className="container py-5 text-center">
      <h2 className="fw-bold mb-4">Courses</h2>
      <div className="row justify-content-center">
        {courses.map(course => (
          <div key={course._id} className="col-md-4 mb-3">
            <button className="btn btn-outline-primary w-100" onClick={() => navigate(`/school/${schoolId}/program/${programId}/course/${course._id}`)}>
              {course.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseView;
