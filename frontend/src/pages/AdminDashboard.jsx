import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/materials')
      .then(res => setMaterials(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/materials/${id}`);
      setMaterials(prev => prev.filter(mat => mat._id !== id));
    } catch {
      alert('Delete failed');
    }
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Admin Dashboard</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Title</th>
              <th>Course</th>
              <th>Year</th>
              <th>Type</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {materials.map(mat => (
              <tr key={mat._id}>
                <td>{mat.title}</td>
                <td>{mat.courseId}</td>
                <td>{mat.year}</td>
                <td>{mat.type}</td>
                <td>{mat.tags.join(', ')}</td>
                <td>
                  <a href={mat.fileUrl} className="btn btn-sm btn-primary me-2" target="_blank" rel="noreferrer">View</a>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(mat._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
