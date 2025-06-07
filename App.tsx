import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import { Header } from './components/Header';

// Import Page Components
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import EditorPage from './pages/EditorPage';
import PublicProfilePage from './pages/PublicProfilePage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import BillingPage from './pages/BillingPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SupportPage from './pages/SupportPage';
import AdminPage from './pages/AdminPage';
import LegalPage from './pages/LegalPage';

// Main layout to include Header and consistent structure
const MainLayout: React.FC = () => {
  return (
    // Outer container with gray background and padding
    <div className="min-h-screen p-[8px] flex flex-col items-center overflow-x-hidden">
      {/* Max width wrapper */}
      <div className="w-full max-w-[1440px] flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col">
          <Outlet /> {/* Child routes will render here */}
        </main>
      </div>
    </div>
  );
};

// Placeholder for pages that don't have the sidebar/bento grid layout
const StandardPageLayout: React.FC<{ title: string; children?: React.ReactNode }> = ({ title, children }) => (
  <div className="main-content-area">
    <h1 className="text-3xl font-bold mb-4 font-pragmatica">{title}</h1>
    {children || <p>Content for {title} will go here.</p>}
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Quick Navigation:</h2>
      <ul className="list-disc list-inside">
        <li><Link to="/" className="text-blue-600 hover:underline">Home (Landing)</Link></li>
        <li><Link to="/public-profile" className="text-blue-600 hover:underline">Public Profile (Current Design)</Link></li>
        <li><Link to="/auth" className="text-blue-600 hover:underline">Authentication</Link></li>
        <li><Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link></li>
        {/* Add more links as needed for testing */}
      </ul>
    </div>
  </div>
);


const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="editor" element={<EditorPage />} />
        <Route path="public-profile" element={<PublicProfilePage />} /> {/* This is the existing detailed page */}
        <Route path="account" element={<AccountSettingsPage />} />
        <Route path="billing" element={<BillingPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="support" সড়কের={<SupportPage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="legal" element={<LegalPage />} />
        <Route path="*" element={<StandardPageLayout title="404 - Page Not Found" />} />
      </Route>
    </Routes>
  );
};

export default App;
export { StandardPageLayout }; // Export for use in other page files
