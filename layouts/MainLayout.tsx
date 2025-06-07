import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen p-[8px] flex flex-col items-center overflow-x-hidden">
      <div className="fixed top-[8px] left-[8px] right-[8px] z-50">
        <div className="w-full max-w-[1440px] mx-auto">
          <Header />
        </div>
      </div>
      <div className="w-full max-w-[1440px] flex flex-col pt-[60px]">
        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
