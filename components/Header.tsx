import React from 'react';
import { Link } from 'react-router-dom';
import {
  BasisLogoParts,
  DesktopViewIcon,
  MobileViewIcon,
} from './icons/IconComponents';

export const Header: React.FC = () => {
  const [isDesktopViewActive, setIsDesktopViewActive] = React.useState(true);

  return (
    <header className="bg-[#EEEEEE] py-2">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[44px]">
          {/* Left: Logo */}
          <Link
            to="/"
            className="flex items-center p-[4px] bg-[#EEEEEE] rounded-[12px] space-x-2 hover:bg-gray-200 transition-colors"
          >
            <div className="flex items-center gap-[1.71px] px-[4px] py-[3px]">
              <BasisLogoParts />
            </div>
            <span className="font-pragmatica text-black text-[25px] font-[630] leading-[25px]">
              Basis
            </span>
          </Link>

          {/* Center: View Icons */}
          <div className="flex items-center space-x-1 bg-white rounded-[8px] p-[2px] shadow-sm">
            <button
              aria-label="Desktop view"
              aria-pressed={isDesktopViewActive}
              onClick={() => setIsDesktopViewActive(true)}
              className={`p-[8px] rounded-[6px] transition-all duration-200 ${
                isDesktopViewActive
                  ? 'bg-black text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-black'
              }`}
            >
              <DesktopViewIcon className="w-[16px] h-[17px]" />
            </button>
            <button
              aria-label="Mobile view"
              aria-pressed={!isDesktopViewActive}
              onClick={() => setIsDesktopViewActive(false)}
              className={`p-[8px] rounded-[6px] transition-all duration-200 ${
                !isDesktopViewActive
                  ? 'bg-black text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-black'
              }`}
            >
              <MobileViewIcon className="w-[17px] h-[17px]" />
            </button>
          </div>

          {/* Right: Auth Buttons */}
          <div className="bg-[#F0F0F0] rounded-[12px] p-[8px] flex items-center space-x-1 outline outline-1 outline-[rgba(255,255,255,0.08)] shadow-sm">
            <Link
              to="/auth?action=login"
              className="px-[11px] py-[5px] text-sm font-semibold text-black bg-[rgba(0,0,0,0.10)] hover:bg-[rgba(0,0,0,0.15)] rounded-[8px] transition-all duration-200 leading-[20px] hover:shadow-sm"
            >
              Войти
            </Link>
            <Link
              to="/auth?action=signup"
              className="px-[11px] py-[5px] text-sm font-semibold text-black bg-[rgba(0,0,0,0.10)] hover:bg-[rgba(0,0,0,0.15)] rounded-[8px] transition-all duration-200 leading-[20px] hover:shadow-sm"
            >
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
