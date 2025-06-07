import React from 'react';
import { Link } from 'react-router-dom';

const StandardPageLayout: React.FC<{
  title: string;
  children?: React.ReactNode;
}> = ({ title, children }) => (
  <div className="main-content-area">
    <h1 className="text-3xl font-bold mb-4 font-pragmatica">{title}</h1>
    {children || <p>Content for {title} will go here.</p>}
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Quick Navigation:</h2>
      <ul className="list-disc list-inside">
        <li>
          <Link to="/" className="text-blue-600 hover:underline">
            Home (Landing)
          </Link>
        </li>
        <li>
          <Link to="/public-profile/demo" className="text-blue-600 hover:underline">
            Public Profile (Current Design)
          </Link>
        </li>
        <li>
          <Link to="/auth" className="text-blue-600 hover:underline">
            Authentication
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="text-blue-600 hover:underline">
            Dashboard
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default StandardPageLayout;
