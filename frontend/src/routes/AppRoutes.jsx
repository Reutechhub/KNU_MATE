import { Routes, Route } from 'react-router-dom';
import SchoolView from '../pages/SchoolView'; // Correct
import ProgramView from '../pages/ProgramView'; // Correct
import IntakeView from '../pages/IntakeView'; // Corrected path
import CourseView from '../pages/CourseView';
import MaterialTypeView from '../pages/MaterialTypeView';
import YearSelectorView from '../pages/YearSelectorView';
import MaterialList from '../pages/MaterialList';
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
  <Route path="/schools" element={<SchoolView />} />
  <Route path="/school/:schoolId" element={<ProgramView />} />
  <Route path="/school/:schoolId/program/:programId" element={<IntakeView />} />
  <Route path="/school/:schoolId/program/:programId/intake/:intakeId" element={<CourseView />} />
  <Route path="/school/:schoolId/program/:programId/intake/:intakeId/course/:courseId" element={<MaterialTypeView />} />
  <Route path="/school/:schoolId/program/:programId/intake/:intakeId/course/:courseId/notes" element={<MaterialList type="notes" />} />
  <Route path="/school/:schoolId/program/:programId/intake/:intakeId/course/:courseId/papers" element={<YearSelectorView />} />
  <Route path="/school/:schoolId/program/:programId/intake/:intakeId/course/:courseId/papers/:year" element={<MaterialList type="papers" />} />
  </Routes>
);

export default AppRoutes
