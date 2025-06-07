import React from 'react';
import { BentoItem } from '../types';

export const BentoItemCard: React.FC<{ item: BentoItem }> = ({ item }) => {
  const baseCardClass =
    'shadow-[0px_2px_4px_rgba(0,0,0,0.04)] rounded-[8px] outline outline-1 outline-[rgba(0,0,0,0.06)] outline-offset-[-1px] transition-all hover:shadow-lg';
  const paddingClass = 'p-[14px]'; // Common padding from design

  // Smol variant: Icon top, then text
  if (item.variant === 'smol_icon_text_vertical') {
    return (
      <div
        className={`${baseCardClass} ${item.gridClass || ''} ${paddingClass} flex flex-col justify-between space-y-[8px] bg-[#EBEBEB] w-[175px] h-[175px]`} // Fixed size from design (147+14+14)
      >
        {item.icon && (
          <div
            className={`p-[8px] ${item.iconBgClass || 'bg-[#3E3E3E]'} rounded-[6px] w-[40px] h-[40px] flex items-center justify-center shadow-[0px_2px_3px_rgba(0,0,0,0.08)]`}
          >
            <item.icon className="w-[24px] h-[24px] text-white" />
          </div>
        )}
        <div className="flex flex-col gap-[8px]">
          {item.title && (
            <h3 className="text-black text-[16px] font-medium leading-[20px]">
              {item.title}
            </h3>
          )}
          {item.description && (
            <p className="text-[rgba(0,0,0,0.48)] text-[10px] leading-[12px]">
              {item.description}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Medium variant: Text left, Image right
  if (item.variant === 'medium_text_right_image') {
    return (
      <div
        className={`${baseCardClass} ${item.gridClass || ''} ${paddingClass} flex justify-between bg-white w-[390px] min-h-[175px]`} // Width from design
      >
        <div className="flex flex-col justify-start gap-[12px] w-[140px] shrink-0">
          {item.icon && (
            <div
              className={`p-[6px] ${item.iconBgClass || 'bg-[#3E3E3E]'} rounded-[6px] w-[40px] h-[40px] flex items-center justify-center shadow-[0px_2px_3px_rgba(0,0,0,0.08)]`}
            >
              <item.icon className="w-[24px] h-[24px] text-white" />
            </div>
          )}
          <div className="flex flex-col gap-[8px] flex-grow">
            {item.title && (
              <h3 className="text-black text-[14px] leading-[16px]">
                {item.title}
              </h3>
            )}
            {item.description && (
              <p className="text-[rgba(0,0,0,0.48)] text-[12px] leading-[16px]">
                {item.description}
              </p>
            )}
          </div>
        </div>
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt={item.imageAlt || item.title || 'Showcase image'}
            className="w-[155px] h-[147px] rounded-[6px] object-cover ml-[24px]"
          />
        )}
      </div>
    );
  }

  // Big variant: Icon and text top, Image bottom
  if (item.variant === 'big_text_over_image') {
    return (
      <div
        className={`${baseCardClass} ${item.gridClass || ''} ${paddingClass} flex flex-col justify-between bg-white w-[390px] h-[390px]`} // Dimensions from design
      >
        <div className="flex flex-col gap-[12px] h-[126px]">
          {item.icon && (
            <div
              className={`p-[6px] ${item.iconBgClass || 'bg-[#3E3E3E]'} rounded-[6px] w-[40px] h-[40px] flex items-center justify-center shadow-[0px_2px_3px_rgba(0,0,0,0.08)]`}
            >
              <item.icon className="w-[24px] h-[24px] text-white" />
            </div>
          )}
          <div className="flex flex-col gap-[8px] flex-grow">
            {item.title && (
              <h3 className="text-black text-[16px] font-medium leading-[20px]">
                {item.title}
              </h3>
            )}
            {item.description && (
              <p className="text-[rgba(0,0,0,0.48)] text-[12px] leading-[16px]">
                {item.description}
              </p>
            )}
          </div>
        </div>
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt={item.imageAlt || item.title || 'Showcase image'}
            className="w-full h-[192px] rounded-[6px] object-cover mt-[24px]"
          />
        )}
      </div>
    );
  }

  // Fallback for unhandled or new variants
  if (item.variant === 'custom_action_bar') {
    // This variant is handled by BottomRightShareBar component
    return null;
  }

  return (
    <div className="bg-red-100 p-4 rounded-lg text-red-700 col-span-1 row-span-1">
      Unsupported item variant: {item.variant} for item ID: {item.id}
    </div>
  );
};
