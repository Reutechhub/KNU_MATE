import { useState, useEffect } from 'react';
import { getAdminSchools, getAdminPrograms, getAdminIntakes, getAdminCourses, getAdminMaterials, deleteSchool, deleteProgram, deleteIntake, deleteCourse, deleteMaterial } from '../services/api';

const AdminManage = () => {
  const [activeTab, setActiveTab] = useState('schools');
  const [schools, setSchools] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [intakes, setIntakes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [schoolsRes, programsRes, intakesRes, coursesRes, materialsRes] = await Promise.all([
        getAdminSchools(),
        getAdminPrograms(),
        getAdminIntakes(),
        getAdminCourses(),
        getAdminMaterials()
      ]);
      setSchools(schoolsRes.data);
      setPrograms(programsRes.data);
      setIntakes(intakesRes.data);
      setCourses(coursesRes.data);
      setMaterials(materialsRes.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch data.');
      setLoading(false);
      console.error('Error fetching data:', err);
    }
  };

  const handleDelete = async (type, id) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      try {
        let deleteFunc;
        switch (type) {
          case 'schools': deleteFunc = deleteSchool; break;
          case 'programs': deleteFunc = deleteProgram; break;
          case 'intakes': deleteFunc = deleteIntake; break;
          case 'courses': deleteFunc = deleteCourse; break;
          case 'materials': deleteFunc = deleteMaterial; break;
          default: throw new Error('Unknown type');
        }
        await deleteFunc(id);
        fetchAll(); // Refresh all lists after deletion
      } catch (err) {
        setError(`Failed to delete ${type}.`);
        console.error(`Error deleting ${type}:`, err);
      }
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  const renderList = (items, type, displayFields) => (
    <ul className="space-y-4">
      {items.length === 0 ? (
        <p className="text-gray-600">No {type} found.</p>
      ) : (
        items.map((item) => (
          <li
            key={item._id}
            className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm"
          >
            <div>
              {displayFields.map(field => (
                <p key={field} className="text-lg font-semibold text-gray-700">{item[field]}</p>
              ))}
              {item.description && <p className="text-sm text-gray-500">{item.description}</p>}
              {item.schoolId && <p className="text-sm text-gray-500">School: {item.schoolId.name}</p>}
              {item.programId && <p className="text-sm text-gray-500">Program: {item.programId.name}</p>}
              {item.intakeId && <p className="text-sm text-gray-500">Intake: {item.intakeId.name}</p>}
              {item.courseId && <p className="text-sm text-gray-500">Course: {item.courseId.name}</p>}
              {item.type && <p className="text-sm text-gray-500">Type: {item.type}</p>}
              {item.year && <p className="text-sm text-gray-500">Year: {item.year}</p>}
            </div>
            <button
              onClick={() => handleDelete(type, item._id)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Delete
            </button>
          </li>
        ))
      )}
    </ul>
  );

  return (
    <div className="bg-gray-100 p-8" style={{ minHeight: 'calc(100vh - 56px)'}}>
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Management</h1>

        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'schools' ? 'active' : ''}`} onClick={() => setActiveTab('schools')}>Schools</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'programs' ? 'active' : ''}`} onClick={() => setActiveTab('programs')}>Programs</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'intakes' ? 'active' : ''}`} onClick={() => setActiveTab('intakes')}>Intakes</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'courses' ? 'active' : ''}`} onClick={() => setActiveTab('courses')}>Courses</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'materials' ? 'active' : ''}`} onClick={() => setActiveTab('materials')}>Materials</button>
          </li>
        </ul>

        <div className="tab-content">
          {activeTab === 'schools' && renderList(schools, 'schools', ['name'])}
          {activeTab === 'programs' && renderList(programs, 'programs', ['name'])}
          {activeTab === 'intakes' && renderList(intakes, 'intakes', ['name'])}
          {activeTab === 'courses' && renderList(courses, 'courses', ['name'])}
          {activeTab === 'materials' && renderList(materials, 'materials', ['title'])}
        </div>
      </div>
    </div>
  );
};

export default AdminManage;
