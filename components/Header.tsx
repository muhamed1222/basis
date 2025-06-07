import React from 'react';
import { Link } from 'react-router-dom';
import { BasisLogoParts, DesktopViewIcon, MobileViewIcon } from './icons/IconComponents';

export const Header: React.FC = () => {
  const [isDesktopViewActive, setIsDesktopViewActive] = React.useState(true);
  // In a real app, view active state might be tied to current route or global state

  return (
    <header className="bg-[#EEEEEE] py-2">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[44px]">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center p-[4px] bg-[#EEEEEE] rounded-[12px] space-x-2">
            <div className="flex items-center gap-[1.71px] px-[4px] py-[3px]">
              <BasisLogoParts />
            </div>
            <span className="font-pragmatica text-black text-[25px] font-[630] leading-[25px]">Basis</span>
          </Link>

          {/* Center: View Icons (Functionality context might change with routing) */}
          <div className="flex items-center space-x-1">
            <button
              aria-label="Desktop view"
              aria-pressed={isDesktopViewActive}
              onClick={() => setIsDesktopViewActive(true)} // This is local state, might need to affect layout globally if functional
              className={`p-[8px] rounded-[8px] transition-colors ${
                isDesktopViewActive 
                  ? 'bg-black text-white' 
                  : 'text-black hover:bg-gray-200'
              }`}
            >
              <DesktopViewIcon className="w-[16px] h-[17px]" />
            </button>
            <button
              aria-label="Mobile view"
              aria-pressed={!isDesktopViewActive}
              onClick={() => setIsDesktopViewActive(false)}
              className={`p-[8px] rounded-[8px] transition-colors ${
                !isDesktopViewActive 
                  ? 'bg-black text-white' 
                  : 'text-black hover:bg-gray-200'
              }`}
            >
              <MobileViewIcon className="w-[17px] h-[17px]" />
            </button>
          </div>

          {/* Right: Auth Buttons */}
          <div className="bg-[#F0F0F0] rounded-[12px] p-[8px] flex items-center space-x-1 outline outline-1 outline-[rgba(255,255,255,0.08)]">
            {/* These should ideally link to /auth or trigger auth modals */}
            <Link to="/auth?action=login" className="px-[11px] py-[5px] text-sm font-semibold text-black bg-[rgba(0,0,0,0.10)] hover:bg-[rgba(0,0,0,0.15)] rounded-[8px] transition-colors leading-[20px]">
              Войти
            </Link>
            <Link to="/auth?action=signup" className="px-[11px] py-[5px] text-sm font-semibold text-black bg-[rgba(0,0,0,0.10)] hover:bg-[rgba(0,0,0,0.15)] rounded-[8px] transition-colors leading-[20px]">
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};