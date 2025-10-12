import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMaterials } from '../services/api';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdfjs-worker.min.js`;



const DocumentsPage = ({ type }) => {
  const { courseId, year } = useParams();
  const [materials, setMaterials] = useState([]);
  const [query, setQuery] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);


  useEffect(() => {
    getMaterials(courseId, type, year).then(res => setMaterials(res.data)).catch(() => setMaterials([]));
  }, [courseId, type, year]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const filtered = materials.filter(m => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (m.title || '').toLowerCase().includes(q) || (m.tags || []).join(' ').toLowerCase().includes(q) || (m.course?.name || '').toLowerCase().includes(q);
  });

  // No grouping, just list all materials
  const groups = { 'All Documents': filtered };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center">Available Documents</h2>

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
                      <a href={mat.fileUrl} target="_blank" rel="noreferrer" className="btn btn-primary" download={`${mat.title.replace(/\.pdf$/i, '')}.pdf`}>Download</a>
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
                <div className="modal-body" style={{ minHeight: '70vh', overflowY: 'auto' }}>
                  <Document file={previewUrl} onLoadSuccess={onDocumentLoadSuccess} onLoadError={(error) => console.error('PDF load error:', error)}>
                    <Page pageNumber={pageNumber} width={Math.min(800, window.innerWidth - 100)} />
                  </Document>
                  {numPages && (
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))} disabled={pageNumber <= 1}>
                        Previous
                      </button>
                      <span>Page {pageNumber} of {numPages}</span>
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))} disabled={pageNumber >= numPages}>
                        Next
                      </button>
                    </div>
                  )}
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

export default DocumentsPage;
