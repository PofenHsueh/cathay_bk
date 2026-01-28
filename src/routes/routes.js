import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

/**
 * 404 / 錯誤頁
 */
const EmptyPage = () => (
  <div>Opps... Something went wrong. Please check your url path again.</div>
);

/**
 * Lazy + Suspense 包裝
 */
const withSuspense = (Component) => (
  <Suspense fallback={<div>Module loading....</div>}>
    <Component />
  </Suspense>
);

/**
 * Lazy page
 */
const Login = lazy(() => import('../pages/Login/Login'));
const Room = lazy(() => import('../pages/Room/Room'));

/**
 * Routes
 */
export const AppRoutes = () => (
  <Routes>
    {/* 預設轉導 */}
    <Route path="/" element={<Navigate to="/login" replace />} />

    {/* Login */}
    <Route path="/login" element={withSuspense(Login)}/>
    <Route path="/room" element={withSuspense(Room)} />

    {/* 404 */}
    <Route path="*" element={<EmptyPage />} />
  </Routes>
);

export default AppRoutes;
