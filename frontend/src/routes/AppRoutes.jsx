import { Routes, Route } from 'react-router-dom';
import SchoolView from '../pages/SchoolView';
import ProgramView from '../pages/ProgramView';
import CourseView from '../pages/CourseView';
import MaterialTypeView from '../pages/MaterialTypeView';
import YearSelectorView from '../pages/YearSelectorView';
import MaterialList from '../pages/MaterialList';
import Landing from '../pages/Landing';
import Home from '../pages/Home';

import AdminUpload from '../pages/AdminUpload';
import AdminLogin from '../pages/AdminLogin';
const AppRoutes = () => (
  
  <Routes>
   
  <Route path="/admin/login" element={<AdminLogin />} />
  {/* Alias for hidden admin login */}
  <Route path="/admin-login" element={<AdminLogin />} />
  <Route path="/admin/upload" element={<AdminUpload />} />

  <Route path="/" element={<Landing />} />
  <Route path="/home" element={<Home />} />
  <Route path="/schools" element={<SchoolView />} />
    <Route path="/school/:schoolId" element={<ProgramView />} />
    <Route path="/school/:schoolId/program/:programId" element={<CourseView />} />
    <Route path="/school/:schoolId/program/:programId/course/:courseId" element={<MaterialTypeView />} />
    <Route path="/school/:schoolId/program/:programId/course/:courseId/notes" element={<MaterialList type="notes" />} />
    <Route path="/school/:schoolId/program/:programId/course/:courseId/papers" element={<YearSelectorView />} />
    <Route path="/school/:schoolId/program/:programId/course/:courseId/papers/:year" element={<MaterialList type="papers" />} />
  </Routes>
);

export default AppRoutes