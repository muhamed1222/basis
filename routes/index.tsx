import type { RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from '../layouts/MainLayout';
import StandardPageLayout from '../layouts/StandardPageLayout';
import Loader from '../components/Loader';

// Lazy load pages
const HomePage = lazy(() => import('../pages/HomePage'));
const AuthPage = lazy(() => import('../pages/AuthPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const EditorPage = lazy(() => import('../pages/EditorPage'));
const PublicProfilePage = lazy(() => import('../pages/PublicProfilePage'));
const AccountSettingsPage = lazy(() => import('../pages/AccountSettingsPage'));
const BillingPage = lazy(() => import('../pages/BillingPage'));
const AnalyticsPage = lazy(() => import('../pages/AnalyticsPage'));
const SupportPage = lazy(() => import('../pages/SupportPage'));
const AdminPage = lazy(() => import('../pages/AdminPage'));
const LegalPage = lazy(() => import('../pages/LegalPage'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Suspense fallback={<Loader />}><HomePage /></Suspense> },
      { path: 'auth', element: <Suspense fallback={<Loader />}><AuthPage /></Suspense> },
      { path: 'dashboard', element: <Suspense fallback={<Loader />}><DashboardPage /></Suspense> },
      { path: 'editor', element: <Suspense fallback={<Loader />}><EditorPage /></Suspense> },
      { path: 'public-profile/:slug', element: <Suspense fallback={<Loader />}><PublicProfilePage /></Suspense> },
      { path: 'account', element: <Suspense fallback={<Loader />}><AccountSettingsPage /></Suspense> },
      { path: 'billing', element: <Suspense fallback={<Loader />}><BillingPage /></Suspense> },
      { path: 'analytics', element: <Suspense fallback={<Loader />}><AnalyticsPage /></Suspense> },
      { path: 'support', element: <Suspense fallback={<Loader />}><SupportPage /></Suspense> },
      { path: 'admin', element: <Suspense fallback={<Loader />}><AdminPage /></Suspense> },
      { path: 'legal', element: <Suspense fallback={<Loader />}><LegalPage /></Suspense> },
      { path: '*', element: <StandardPageLayout title="404 - Page Not Found" /> },
    ],
  },
];