import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMaterials } from '../services/api';

const MaterialList = ({ type }) => {
  const { courseId, year } = useParams();
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    getMaterials(courseId, type, year).then(res => setMaterials(res.data));
  }, [courseId, type, year]);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center">Materials ({type} {year})</h2>
      <div className="row">
        {materials.map(mat => (
          <div key={mat._id} className="col-md-6 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{mat.title}</h5>
                <p className="card-text">{mat.tags.join(', ')}</p>
                <a href={mat.fileUrl} target="_blank" rel="noreferrer" className="btn btn-outline-primary">Download PDF</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaterialList;
