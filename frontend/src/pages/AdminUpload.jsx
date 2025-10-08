import { useEffect, useState } from 'react';
// axios removed: use service helpers in ../services/api
import { useAuth } from '../context/useAuth';
import { getSchools, getPrograms, getCourses, uploadMaterial, addSchool as apiAddSchool, addProgram as apiAddProgram, addCourse as apiAddCourse } from '../services/api';

const AdminUpload = () => {
  const [schools, setSchools] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [type, setType] = useState('notes');
  const [year, setYear] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [showStructure, setShowStructure] = useState(false);

  const { user } = useAuth();

  const authHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    getSchools().then(res => setSchools(res.data)).catch(err => { console.error(err); setSchools([]); });
  }, []);

  useEffect(() => {
    // If a school is selected, fetch programs for it; otherwise fetch all programs
    getPrograms(selectedSchool || undefined).then(res => setPrograms(res.data)).catch(err => { console.error(err); setPrograms([]); });
  }, [selectedSchool]);

  useEffect(() => {
    // If a program is selected, fetch courses for it; otherwise fetch all courses
    getCourses(selectedProgram || undefined).then(res => setCourses(res.data)).catch(err => { console.error(err); setCourses([]); });
  }, [selectedProgram]);

  const handleUpload = async (e) => {
    e.preventDefault();
    // basic client-side validation
    if (!selectedCourse) {
      setMessage('Please select a Course before uploading.');
      return;
    }
    if (!file) {
      setMessage('Please choose a PDF file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('type', type);
    formData.append('year', year);
    formData.append('courseId', selectedCourse);
    formData.append('tags', tags);
    formData.append('file', file);

    try {
      await uploadMaterial(formData, { headers: { ...authHeaders(), 'Content-Type': 'multipart/form-data' } });
      setMessage('Upload successful!');
    } catch (err) {
      console.error('Upload failed', err);
      const serverMsg = err?.response?.data?.error || err?.response?.data?.message || err?.message;
      setMessage(`Upload failed: ${serverMsg}`);
    }
  };

  // Admin helpers to add school/program/course inline
  const addSchool = async (name, description='') => {
    try {
      const res = await apiAddSchool({ name, description }, { headers: authHeaders() });
      // refresh
      const refreshed = await getSchools();
      setSchools(refreshed.data);
      setMessage('School added');
      return res.data;
    } catch (err) {
      console.error(err);
      setMessage('Failed to add school');
    }
  };

  const addProgram = async (name, schoolId) => {
    try {
      const res = await apiAddProgram({ name, schoolId }, { headers: authHeaders() });
      const refreshed = await getPrograms(schoolId);
      setPrograms(refreshed.data);
      setMessage('Program added');
      return res.data;
    } catch (err) {
      console.error(err);
      setMessage('Failed to add program');
    }
  };

  const addCourse = async (name, programId) => {
    try {
      const res = await apiAddCourse({ name, programId }, { headers: authHeaders() });
      const refreshed = await getCourses(programId);
      setCourses(refreshed.data);
      setMessage('Course added');
      return res.data;
    } catch (err) {
      console.error(err);
      setMessage('Failed to add course');
    }
  };

  return (
    <div className="container py-5">
      {!user || user.role !== 'admin' ? (
        <div className="text-center">
          <h4 className="mb-3">Admin access required</h4>
          <p>Please <a href="/admin-login">login as admin</a> to access this page.</p>
        </div>
      ) : (
        <>
          <h2 className="fw-bold mb-4 text-center">Admin Upload Panel</h2>
          <form onSubmit={handleUpload} className="row g-3">
            <div className="col-md-4">
              <label className="form-label">School</label>
              <div className="d-flex align-items-center">
                <select className="form-select me-2" style={{ flex: '1 1 auto', minWidth: 0, maxWidth: 'calc(100% - 260px)' }} value={selectedSchool} onChange={e => setSelectedSchool(e.target.value)}>
                  <option value="">All Schools</option>
                  {Array.isArray(schools) && schools.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                </select>
                <AddInlineSchool onAdd={addSchool} />
              </div>
            </div>

            <div className="col-md-4">
              <label className="form-label">Program</label>
              <div className="d-flex align-items-center">
                <select className="form-select me-2" style={{ flex: '1 1 auto', minWidth: 0, maxWidth: 'calc(100% - 260px)' }} value={selectedProgram} onChange={e => setSelectedProgram(e.target.value)}>
                  <option value="">All Programs</option>
                  {Array.isArray(programs) && programs.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                </select>
                <AddInlineProgram schoolId={selectedSchool} onAdd={addProgram} />
              </div>
            </div>

            <div className="col-md-4">
              <label className="form-label">Course</label>
              <div className="d-flex align-items-center">
                <select className="form-select me-2" style={{ flex: '1 1 auto', minWidth: 0, maxWidth: 'calc(100% - 260px)' }} value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}>
                  <option value="">All Courses</option>
                  {Array.isArray(courses) && courses.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
                <AddInlineCourse programId={selectedProgram} onAdd={addCourse} />
              </div>
            </div>

            <div className="col-md-4">
              <label className="form-label">Material Type</label>
              <select className="form-select" value={type} onChange={e => setType(e.target.value)}>
                <option value="notes">Notes</option>
                <option value="papers">Past Papers</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Year</label>
              <input type="text" className="form-control" value={year} onChange={e => setYear(e.target.value)} />
            </div>

            <div className="col-md-4">
              <label className="form-label">Title</label>
              <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
            </div>

            <div className="col-md-6">
              <label className="form-label">Tags (comma-separated)</label>
              <input type="text" className="form-control" value={tags} onChange={e => setTags(e.target.value)} />
            </div>

            <div className="col-md-6">
              <label className="form-label">PDF File</label>
              <input type="file" className="form-control" accept="application/pdf" onChange={e => setFile(e.target.files[0])} />
            </div>

            <div className="col-12 text-center">
              <button type="submit" className="btn btn-success px-5">Upload</button>
            </div>
          </form>
          {message && <div className="text-center mt-3"><strong>{message}</strong></div>}

          <div className="text-center my-4">
            <button type="button" className="btn btn-outline-secondary" onClick={() => setShowStructure(s => !s)}>
              {showStructure ? 'Hide' : 'Show'} Academic Structure
            </button>
          </div>

          {showStructure && <AcademicStructure schools={schools} programs={programs} courses={courses} />}
        </>
      )}
    </div>
  );
};

export default AdminUpload;

// Small inline components for adding entities
function AddInlineSchool({ onAdd }) {
  const [name, setName] = useState('');
  const [adding, setAdding] = useState(false);

  const submit = async () => {
    if (!name.trim()) return;
    setAdding(true);
    await onAdd(name.trim());
    setName('');
    setAdding(false);
  };

  return (
  <div className="d-flex" style={{ minWidth: 260, flexShrink: 0 }}>
      <input className="form-control form-control-sm me-1" placeholder="+ School" value={name} onChange={e => setName(e.target.value)} style={{ minWidth: 180 }} />
  <button type="button" className="btn btn-sm btn-primary" onClick={submit} disabled={adding}>Add</button>
    </div>
  );
}

function AddInlineProgram({ schoolId, onAdd }) {
  const [name, setName] = useState('');
  const [adding, setAdding] = useState(false);

  const submit = async () => {
    if (!name.trim() || !schoolId) return alert('Select a school first');
    setAdding(true);
    await onAdd(name.trim(), schoolId);
    setName('');
    setAdding(false);
  };

  return (
  <div className="d-flex" style={{ minWidth: 260, flexShrink: 0 }}>
      <input className="form-control form-control-sm me-1" placeholder="+ Program" value={name} onChange={e => setName(e.target.value)} style={{ minWidth: 180 }} />
  <button type="button" className="btn btn-sm btn-primary" onClick={submit} disabled={adding}>Add</button>
    </div>
  );
}

function AddInlineCourse({ programId, onAdd }) {
  const [name, setName] = useState('');
  const [adding, setAdding] = useState(false);

  const submit = async () => {
    if (!name.trim() || !programId) return alert('Select a program first');
    setAdding(true);
    await onAdd(name.trim(), programId);
    setName('');
    setAdding(false);
  };

  return (
  <div className="d-flex" style={{ minWidth: 260, flexShrink: 0 }}>
      <input className="form-control form-control-sm me-1" placeholder="+ Course" value={name} onChange={e => setName(e.target.value)} style={{ minWidth: 180 }} />
  <button type="button" className="btn btn-sm btn-primary" onClick={submit} disabled={adding}>Add</button>
    </div>
  );
}

function AcademicStructure({ schools, programs, courses }) {
  // group programs by schoolId
  const programsBySchool = (programs || []).reduce((acc, p) => {
    const key = p.schoolId || 'unassigned';
    if (!acc[key]) acc[key] = [];
    acc[key].push(p);
    return acc;
  }, {});

  const coursesByProgram = (courses || []).reduce((acc, c) => {
    const key = c.programId || 'unassigned';
    if (!acc[key]) acc[key] = [];
    acc[key].push(c);
    return acc;
  }, {});

  return (
    <div className="card p-3">
      <h5>Academic Structure</h5>
      <div>
        {(Array.isArray(schools) && schools.length > 0) ? (
          schools.map(s => (
            <div key={s._id} className="mb-3">
              <strong>{s.name}</strong>
              <ul className="ms-3">
                {(programsBySchool[s._id] || []).map(p => (
                  <li key={p._id}>
                    {p.name}
                    <ul className="ms-3">
                      {(coursesByProgram[p._id] || []).map(c => <li key={c._id}>{c.name}</li>)}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div>No schools available.</div>
        )}

        {/* show programs without school */}
        {programsBySchool['unassigned'] && programsBySchool['unassigned'].length > 0 && (
          <div className="mt-2">
            <strong>Unassigned Programs</strong>
            <ul className="ms-3">
              {programsBySchool['unassigned'].map(p => (
                <li key={p._id}>
                  {p.name}
                  <ul className="ms-3">
                    {(coursesByProgram[p._id] || []).map(c => <li key={c._id}>{c.name}</li>)}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
