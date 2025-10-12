import axios from 'axios';

const base = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : 'http://localhost:5000';
export const API = axios.create({
  baseURL: `${base}/api`,
});

// Add a request interceptor to include the token in the headers
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const getSchools = () => API.get('/schools');
export const getPrograms = (schoolId) => {
  if (schoolId) return API.get(`/programs?schoolId=${schoolId}`);
  return API.get('/programs');
};
export const getYears = (programId) => {
  if (programId) return API.get(`/intakes?programId=${programId}`);
  return API.get('/intakes');
};
export const getIntakes = (programId) => {
  if (programId) return API.get(`/intakes?programId=${programId}`);
  return API.get('/intakes');
};
export const getCourses = (intakeId) => {
  if (intakeId) return API.get(`/courses?intakeId=${intakeId}`);
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
export const addIntake = (payload, config) => API.post('/admin/intakes', payload, config);
export const addCourse = (payload, config) => API.post('/admin/courses', payload, config); // Ensure backend expects intakeId in payload

// Admin management endpoints
export const getAdminSchools = () => API.get('/admin/schools');
export const getAdminPrograms = () => API.get('/admin/programs');
export const getAdminIntakes = () => API.get('/admin/intakes');
export const getAdminCourses = () => API.get('/admin/courses');
export const getAdminMaterials = () => API.get('/admin/materials');

export const deleteSchool = (id) => API.delete(`/admin/schools/${id}`);
export const deleteProgram = (id) => API.delete(`/admin/programs/${id}`);
export const deleteIntake = (id) => API.delete(`/admin/intakes/${id}`);
export const deleteCourse = (id) => API.delete(`/admin/courses/${id}`);
export const deleteMaterial = (id) => API.delete(`/admin/materials/${id}`);

export default API;
