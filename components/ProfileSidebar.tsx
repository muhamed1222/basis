import React from 'react';
import { BasisBSolidIcon } from './icons/IconComponents';

export const ProfileSidebar: React.FC = () => {
  return (
    // The design implies the sidebar is part of a larger white content area.
    // Widths are from design: flex: 1 1 0; max-width: 484px;
    // The parent container <MainContentLayout> will handle padding.
    <aside className="w-full md:max-w-[484px] md:flex-shrink-0 space-y-[32px] py-4 md:py-0"> {/* Adjusted padding for consistency */}
      {/* Profile Image Section */}
      <div className="w-[184px] h-[184px] bg-[#23C0FF] rounded-[10px] flex items-center justify-center overflow-hidden shadow-md">
        {/* The design shows a complex B graphic. Using BasisBSolidIcon. */}
        <BasisBSolidIcon className="w-[92px] h-[130px] text-black" innercolor="#23C0FF" />
      </div>
      
      {/* Profile Text Section */}
      <div className="space-y-[16px]">
        <h1 className="font-pragmatica text-black text-[60px] font-[750] leading-[56px]">
          Your name goes here
        </h1>
        <p className="text-[#565656] text-[20px] font-normal leading-[28px]">
          Hipster ipsum tattooed brunch I'm baby. Stumptown chicken I'm bruh big raw jomo. Hot fit literally kitsch fanny tilde celiac tote. Single-origin forage raw neutra kombucha.
        </p>
      </div>
    </aside>
  );
};
