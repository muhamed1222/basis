
import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import MainLayout from '../layouts/MainLayout';
import StandardPageLayout from '../layouts/StandardPageLayout';

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
      { index: true, element: <HomePage /> },
      { path: 'auth', element: <AuthPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'editor', element: <EditorPage /> },
      { path: 'public-profile/:slug', element: <PublicProfilePage /> },
      { path: 'account', element: <AccountSettingsPage /> },
      { path: 'billing', element: <BillingPage /> },
      { path: 'analytics', element: <AnalyticsPage /> },
      { path: 'support', element: <SupportPage /> },
      { path: 'admin', element: <AdminPage /> },
      { path: 'legal', element: <LegalPage /> },
      { path: '*', element: <StandardPageLayout title="404 - Page Not Found" /> },
    ],
  },
];
