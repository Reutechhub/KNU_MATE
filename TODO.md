# TODO: Fix API and Page Mismatches + Password Hashing

## Issues Identified
1. **Route Duplication**: `/schools` and `/school/:schoolId` both route to SchoolPage, but SchoolPage requires `schoolId` param.
2. **Missing API Functions**: AdminManage.jsx calls admin endpoints not defined in api.js.
3. **Unused File**: `publicRoutes.js` is duplicate of `public.js` and not used.
4. **Material Upload Bug**: AdminUpload appends 'intakeId' to formData, but Material model only has courseId.
5. **Inconsistent Naming**: Frontend calls `getYears()` but gets intakes.
6. **Password Security**: Passwords stored in plain text, need hashing.

## Plan
- [x] Fix AppRoutes.jsx: Change `/schools` to a dedicated list page or redirect to `/home`.
- [x] Add missing admin API functions in api.js.
- [x] Remove duplicate publicRoutes.js from server.js.
- [x] Fix AdminUpload.jsx: Remove 'intakeId' from formData.
- [x] Rename getYears to getIntakes in ProgramPage.jsx for consistency.
- [x] Implement password hashing with bcryptjs in authController.js and seedUsers.js.

## Followup Steps
- [x] Test routes and API calls.
- [x] Verify backend routes are properly mounted.
- [x] Test password hashing and login functionality.
