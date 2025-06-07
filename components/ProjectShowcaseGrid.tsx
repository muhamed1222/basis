import React from 'react';
import { BentoItem } from '../types';
import { BentoItemCard } from './BentoItemCard';
import { FigmaPlaceholderIcon } from './icons/IconComponents';

// Sample data based on the new visual design
const showcaseDataTop: BentoItem[] = [
  {
    id: 'proj1',
    variant: 'medium_text_right_image',
    gridClass: 'md:col-span-1', // Approx based on 390px width in 820px container
    icon: FigmaPlaceholderIcon,
    iconBgClass: 'bg-[#3E3E3E]',
    title: 'Link name goes here',
    description: 'Description goes here',
    imageUrl: 'https://placehold.co/155x147/A0A0A0/FFFFFF?text=Project1',
    imageAlt: 'Project 1 placeholder',
    customSize: 'Medium',
  },
  {
    id: 'proj2',
    variant: 'big_text_over_image',
    gridClass: 'md:col-span-1 md:row-span-2', // Approx, 390px wide, 390px tall
    icon: FigmaPlaceholderIcon,
    iconBgClass: 'bg-[#3E3E3E]',
    title: 'Link name goes here',
    description: 'Description goes here',
    imageUrl: 'https://placehold.co/362x192/C0C0C0/FFFFFF?text=Project2',
    imageAlt: 'Project 2 placeholder',
    customSize: 'Big',
  },
  {
    id: 'proj3',
    variant: 'big_text_over_image',
    gridClass: 'md:col-span-1 md:row-span-2', // Approx
    icon: FigmaPlaceholderIcon,
    iconBgClass: 'bg-[#3E3E3E]',
    title: 'Link name goes here',
    description: 'Description goes here',
    imageUrl: 'https://placehold.co/362x192/B0B0B0/FFFFFF?text=Project3',
    imageAlt: 'Project 3 placeholder',
    customSize: 'Big',
  },
];

const showcaseDataBottom: BentoItem[] = [
  {
    id: 'proj4',
    variant: 'smol_icon_text_vertical',
    gridClass: 'md:col-span-1', // Approx 175px width
    icon: FigmaPlaceholderIcon,
    iconBgClass: 'bg-[#3E3E3E]',
    title: 'Link name goes here',
    description: 'Description goes here and this one is bit long',
    customSize: 'Smol',
  },
  {
    id: 'proj5',
    variant: 'big_text_over_image',
    gridClass: 'md:col-span-1 md:row-span-2', // Approx, centered "Big" card
    icon: FigmaPlaceholderIcon,
    iconBgClass: 'bg-[#3E3E3E]',
    title: 'Link name goes here',
    description: 'Description goes here',
    imageUrl: 'https://placehold.co/362x192/D0D0D0/FFFFFF?text=Project5',
    imageAlt: 'Project 5 placeholder',
    customSize: 'Big',
  },
  {
    id: 'proj6',
    variant: 'smol_icon_text_vertical',
    gridClass: 'md:col-span-1', // Approx
    icon: FigmaPlaceholderIcon,
    iconBgClass: 'bg-[#3E3E3E]',
    title: 'Link name goes here',
    description: 'Description goes here and this one is bit long',
    customSize: 'Smol',
  },
];

export const ProjectShowcaseGrid: React.FC = () => {
  // The design has an 820px wide area for projects.
  // Using a flexible grid that attempts to match the visual density.
  // Cards have fixed widths in the design (Smol: 175px, Medium/Big: 390px).
  // This will approximate 2 'Big' cards across or 4 'Smol' cards.
  return (
    <div className="w-full md:max-w-[820px] space-y-[24px]">
      {' '}
      {/* Width from design */}
      <div>
        <h2 className="text-black text-[18px] font-semibold leading-[24px] mb-[20px] px-[12px] py-[12px] bg-white rounded-[8px]">
          {' '}
          {/* Styling from design's title bar */}
          Project Showcase
        </h2>
        {/* Using a simple flex wrap for top row, then specific for bottom if needed, or a more complex grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] items-start">
          {/* This layout is tricky. The design uses absolute positioning.
              Simulating a common bento structure.
              Left column for Proj1 and Proj3, Right for Proj2 */}
          <div className="space-y-[24px]">
            {showcaseDataTop.find((item) => item.id === 'proj1') && (
              <BentoItemCard
                item={showcaseDataTop.find((item) => item.id === 'proj1')!}
              />
            )}
            {showcaseDataTop.find((item) => item.id === 'proj3') && (
              <BentoItemCard
                item={showcaseDataTop.find((item) => item.id === 'proj3')!}
              />
            )}
          </div>
          <div className="space-y-[24px]">
            {showcaseDataTop.find((item) => item.id === 'proj2') && (
              <BentoItemCard
                item={showcaseDataTop.find((item) => item.id === 'proj2')!}
              />
            )}
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-black text-[18px] font-semibold leading-[24px] mb-[20px] px-[12px] py-[12px] bg-white rounded-[8px]">
          Project Showcase
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] items-start">
          {' '}
          {/* Based on 3 cards in this row in design */}
          {showcaseDataBottom.map((item) => (
            <BentoItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
