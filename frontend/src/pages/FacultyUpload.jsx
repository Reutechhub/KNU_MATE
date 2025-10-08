import { useState } from 'react';
import axios from 'axios';

const FacultyUpload = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [courseId, setCourseId] = useState('');
  const [year, setYear] = useState('');
  const [type, setType] = useState('');
  const [tags, setTags] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    const base64 = await toBase64(file);
    try {
      await axios.post('http://localhost:5000/api/materials/upload', {
        title,
        file: base64,
        courseId,
        year,
        type,
        tags: tags.split(','),
      });
      alert('Upload successful');
    } catch {
      alert('Upload failed');
    }
  };

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Upload Course Material</h2>
      <form onSubmit={handleUpload} className="row g-3">
        <div className="col-md-6">
          <input type="text" className="form-control" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div className="col-md-6">
          <input type="file" className="form-control" onChange={e => setFile(e.target.files[0])} required />
        </div>
        <div className="col-md-4">
          <input type="text" className="form-control" placeholder="Course ID" value={courseId} onChange={e => setCourseId(e.target.value)} required />
        </div>
        <div className="col-md-4">
          <input type="text" className="form-control" placeholder="Year" value={year} onChange={e => setYear(e.target.value)} required />
        </div>
        <div className="col-md-4">
          <input type="text" className="form-control" placeholder="Type (e.g. notes, exam)" value={type} onChange={e => setType(e.target.value)} required />
        </div>
        <div className="col-md-12">
          <input type="text" className="form-control" placeholder="Tags (comma-separated)" value={tags} onChange={e => setTags(e.target.value)} />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-success w-100">Upload Material</button>
        </div>
      </form>
    </div>
  );
};

export default FacultyUpload;
