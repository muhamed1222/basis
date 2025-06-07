import type { RouteObject } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import StandardPageLayout from '../layouts/StandardPageLayout';
import HomePage from '../pages/HomePage';
import AuthPage from '../pages/AuthPage';
import DashboardPage from '../pages/DashboardPage';
import EditorPage from '../pages/EditorPage';
import PublicProfilePage from '../pages/PublicProfilePage';
import AccountSettingsPage from '../pages/AccountSettingsPage';
import BillingPage from '../pages/BillingPage';
import AnalyticsPage from '../pages/AnalyticsPage';
import SupportPage from '../pages/SupportPage';
import AdminPage from '../pages/AdminPage';
import LegalPage from '../pages/LegalPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'auth', element: <AuthPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'editor', element: <EditorPage /> },
      { path: 'public-profile', element: <PublicProfilePage /> },
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
