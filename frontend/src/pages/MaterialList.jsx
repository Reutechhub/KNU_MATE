import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMaterials } from '../services/api';

const yearBucket = (y) => {
  const yearNum = parseInt(y, 10);
  if (isNaN(yearNum)) return 'Other';
  if (yearNum <= 1 || yearNum <= 2001) return 'First Year';
  // If your year values are actual years (e.g., 2000), map them by offset from course start.
  // We'll use a simple heuristic: earliest years -> First, then Second, Third, Fourth.
  if (yearNum <= 2002) return 'Second Year';
  if (yearNum <= 2003) return 'Third Year';
  return 'Fourth Year';
};

const MaterialList = ({ type }) => {
  const { courseId, year } = useParams();
  const [materials, setMaterials] = useState([]);
  const [query, setQuery] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    getMaterials(courseId, type, year).then(res => setMaterials(res.data)).catch(() => setMaterials([]));
  }, [courseId, type, year]);

  const filtered = materials.filter(m => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (m.title || '').toLowerCase().includes(q) || (m.tags || []).join(' ').toLowerCase().includes(q) || (m.course?.name || '').toLowerCase().includes(q);
  });

  // Group by year bucket
  const groups = filtered.reduce((acc, m) => {
    const bucket = yearBucket(m.year);
    (acc[bucket] = acc[bucket] || []).push(m);
    return acc;
  }, {});

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center">Materials ({type} {year})</h2>

      <div className="row mb-4">
        <div className="col-md-6 offset-md-3">
          <input value={query} onChange={e => setQuery(e.target.value)} className="form-control" placeholder="Search by title, tag or course" />
        </div>
      </div>

      {Object.keys(groups).length === 0 && (
        <p className="text-center text-muted">No materials found.</p>
      )}

      {Object.entries(groups).map(([bucket, items]) => (
        <div key={bucket} className="mb-4">
          <h4 className="mb-3">{bucket} ({items.length})</h4>
          <div className="row">
            {items.map(mat => (
              <div key={mat._id} className="col-md-6 mb-3">
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{mat.title}</h5>
                    <p className="card-text text-muted">{mat.course?.name} • {mat.year} • {mat.type}</p>
                    <div className="mt-auto d-flex gap-2">
                      <button className="btn btn-outline-secondary" onClick={() => setPreviewUrl(mat.fileUrl)}>View</button>
                      <a href={mat.fileUrl} target="_blank" rel="noreferrer" className="btn btn-primary">Download</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Modal preview */}
      {previewUrl && (
        <>
          <div className="modal-backdrop show" onClick={() => setPreviewUrl(null)}></div>
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-xl" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Preview</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setPreviewUrl(null)}></button>
                </div>
                <div className="modal-body" style={{ minHeight: '70vh' }}>
                  <embed src={previewUrl} type="application/pdf" width="100%" height="70vh" />
                </div>
                <div className="modal-footer">
                  <a href={previewUrl} target="_blank" rel="noreferrer" className="btn btn-primary">Open in new tab</a>
                  <button type="button" className="btn btn-secondary" onClick={() => setPreviewUrl(null)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MaterialList;
