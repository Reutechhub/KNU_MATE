import { Routes, Route } from 'react-router-dom';
import SchoolPage from '../pages/SchoolPage';
import ProgramPage from '../pages/ProgramPage';
import YearPage from '../pages/YearPage';
import CoursePage from '../pages/CoursePage';
import PastPaperYearPage from '../pages/PastPaperYearPage';
import DocumentsPage from '../pages/DocumentsPage';

import Landing from '../pages/Landing';
import Home from '../pages/Home';

import AdminUpload from '../pages/AdminUpload';
import AdminLogin from '../pages/AdminLogin';
import AdminManage from '../pages/AdminManage';
import AdminLayout from './AdminLayout';

const AppRoutes = () => (

  <Routes>

    {/* Admin Routes */}
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin" element={<AdminLayout />}>
      <Route path="manage" element={<AdminManage />} />
      <Route path="upload" element={<AdminUpload />} />
    </Route>

  <Route path="/" element={<Landing />} />
  <Route path="/home" element={<Home />} />
  <Route path="/schools" element={<Home />} />
  <Route path="/school/:schoolId" element={<SchoolPage />} />
  <Route path="/school/:schoolId/program/:programId" element={<ProgramPage />} />
  <Route path="/school/:schoolId/program/:programId/year/:yearId" element={<YearPage />} />
  <Route path="/school/:schoolId/program/:programId/year/:yearId/course/:courseId" element={<CoursePage />} />
  <Route path="/school/:schoolId/program/:programId/year/:yearId/course/:courseId/notes" element={<DocumentsPage type="notes" />} />
  <Route path="/school/:schoolId/program/:programId/year/:yearId/course/:courseId/past-papers" element={<PastPaperYearPage />} />
  <Route path="/school/:schoolId/program/:programId/year/:yearId/course/:courseId/past-papers/:year" element={<DocumentsPage type="past-papers" />} />
  </Routes>
);

export default AppRoutes
