import { useEffect, useState } from 'react';
import { getMaterials } from '../services/api';

const Home = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    getMaterials().then(res => setMaterials(res.data)).catch(err => console.error(err));
  }, []);

  return (
    <div className="container py-4">
      <h1 className="mb-4 fw-bold">Academic Resources</h1>
      <div className="row">
        {materials.map(mat => (
          <div key={mat._id} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{mat.title}</h5>
                <p className="card-text">{mat.year} • {mat.type}</p>
                <a href={mat.fileUrl} className="btn btn-primary" target="_blank" rel="noreferrer">Download</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
