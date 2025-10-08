import axios from 'axios';

const base = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : 'http://localhost:5000';
const API = axios.create({
  baseURL: `${base}/api`,
});

export const getSchools = () => API.get('/schools');
export const getPrograms = (schoolId) => {
  if (schoolId) return API.get(`/programs?schoolId=${schoolId}`);
  return API.get('/programs');
};
export const getCourses = (programId) => {
  if (programId) return API.get(`/courses?programId=${programId}`);
  return API.get('/courses');
};
export const getMaterials = (courseId, type, year) => {
  const params = new URLSearchParams();
  if (courseId) params.append('courseId', courseId);
  if (type) params.append('type', type);
  if (year) params.append('year', year);
  const qs = params.toString();
  return qs ? API.get(`/materials?${qs}`) : API.get('/materials');
};

export const uploadMaterial = (formData, config = {}) => API.post('/admin/materials/upload', formData, config);
export const addSchool = (payload, config) => API.post('/admin/schools', payload, config);
export const addProgram = (payload, config) => API.post('/admin/programs', payload, config);
export const addCourse = (payload, config) => API.post('/admin/courses', payload, config);
