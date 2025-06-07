import React from 'react';

// --- Basis Specific Icons ---

// Returns the visual parts for the Basis logo in the header
export const BasisLogoParts: React.FC = () => (
  <>
    <div className="w-[30px] h-[30px] bg-[#FC3F1D] rounded-full shrink-0"></div>
    <div className="w-[30px] h-[30px] bg-white rounded-md shrink-0 flex items-center justify-center relative overflow-hidden">
      <div
        style={{
          width: '15.13px',
          height: '21.43px',
          background: 'black',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '8.31px',
            height: '16.44px',
            background: 'white',
            position: 'absolute',
            left: '3.41px',
            top: '2.5px',
          }}
        ></div>
      </div>
    </div>
  </>
);

interface BasisBSolidIconProps extends React.SVGProps<SVGSVGElement> {
  innercolor?: string;
}

export const BasisBSolidIcon: React.FC<BasisBSolidIconProps> = (props) => (
  // Solid B for profile picture background
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M25 87.5V12.5H62.5C69.1284 12.5 75 18.3716 75 25V25C75 31.6284 69.1284 37.5 62.5 37.5H37.5V50H62.5C69.1284 50 75 55.8716 75 62.5V62.5C75 69.1284 69.1284 75 62.5 75H37.5V87.5H25Z"
      fill="currentColor"
    />
    <path
      d="M37.5 25H62.5C65.2614 25 67.5 27.2386 67.5 30V30C67.5 32.7614 65.2614 35 62.5 35H37.5V25Z"
      fill={props.innercolor || 'white'}
    />
    <path
      d="M37.5 62.5H62.5C65.2614 62.5 67.5 60.2614 67.5 57.5V57.5C67.5 54.7386 65.2614 52.5 62.5 52.5H37.5V62.5Z"
      fill={props.innercolor || 'white'}
    />
  </svg>
);

// --- View Toggle Icons (Header) ---
export const DesktopViewIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect y="12.5" width="16" height="2" fill="currentColor" />
    <rect x="2" y="2.5" width="12" height="9" fill="currentColor" />
  </svg>
);

export const MobileViewIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="0.5" y="0.5" width="16" height="16" fill="currentColor" />
    {/* The design spec implies two overlapping black rectangles.
        If current SVG fill is currentColor, and button sets text to white/black, this works.
        The spec's MobileViewIcon had two rects, this one simplifies to one to match the inline SVG that was used.
        To precisely match the more complex overlapping look if needed:
    */}
    {/* <rect x="2.5" y="0.5" width="12" height="16" fill="currentColor" /> */}
    {/* For now, using the single rect as per the immediate inline SVG in Header.tsx
        To use the two-rectangle version from previous IconComponents version:
    */}
    {/*
     <rect x="0.5" y="0.5" width="16" height="16" fill="currentColor" stroke="currentColor" strokeOpacity="0.5" />
     <rect x="2.5" y="0.5" width="12" height="16" fill="currentColor" stroke="currentColor" strokeOpacity="0.5" />
     */}
    {/* Reverting to the two-rectangle definition as per original IconComponents.tsx for MobileViewIcon which matches design spec better */}
    <rect
      x="0.5"
      y="0.5"
      width="16"
      height="16"
      fill="currentColor"
      stroke="currentColor"
      strokeOpacity="0.1"
    />{' '}
    {/* ensure stroke isn't too prominent or remove if not needed */}
    <rect
      x="2.5"
      y="0.5"
      width="12"
      height="16"
      fill="currentColor"
      stroke="currentColor"
      strokeOpacity="0.1"
    />
  </svg>
);

// --- Social Bar Icons (Bottom Left) ---
export const SettingsAltIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="1" y="3" width="15" height="2" fill="#8E8E8E" />
    <rect y="11" width="15" height="2" fill="#8E8E8E" />
    <rect
      x="8"
      y="2"
      width="4"
      height="4"
      stroke="#8E8E8E"
      strokeWidth="2"
      fill="white"
    />
    <rect
      x="4"
      y="10"
      width="4"
      height="4"
      stroke="#8E8E8E"
      strokeWidth="2"
      fill="white"
    />
  </svg>
);

export const TargetIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="8" cy="8" r="7" stroke="#8E8E8E" strokeWidth="2" />
    <circle cx="8" cy="8" r="2.33" fill="#8E8E8E" />
  </svg>
);

export const ChatAltIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.33301 13.6113C0.450414 12.9801 0 12.019 0 10.9444V4.5C0 2.87259 1.37259 1.5 3.04001 1.5H12.96C14.6274 1.5 16 2.87259 16 4.5V10.9444C16 12.019 15.5496 12.9801 14.667 13.6113L12.0021 11.6667H3.99787L1.33301 13.6113Z"
      fill="#969696"
    />
  </svg>
);

// --- Share Bar Icons (Bottom Right) ---
// Using existing LinkIcon, PhotoIcon, ChatBubbleLeftEllipsisIcon, GlobeAltIcon
// New one for the last "files/window" icon
export const WindowFilesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    className="w-3.5 h-3.5"
  >
    {/* Top bar */}
    <rect
      x="1"
      y="1"
      width="12"
      height="3"
      fill="currentColor"
      className="text-gray-600"
    />
    {/* Bottom left file */}
    <rect
      x="1"
      y="5"
      width="5"
      height="6"
      fill="currentColor"
      className="text-gray-400"
    />
    <rect
      x="1.5"
      y="5.5"
      width="4"
      height="5"
      stroke="white"
      strokeOpacity="0.5"
      strokeWidth="0.5"
    />
    {/* Bottom right file */}
    <rect
      x="8"
      y="5"
      width="5"
      height="6"
      fill="currentColor"
      className="text-gray-400"
    />
    <rect
      x="8.5"
      y="5.5"
      width="4"
      height="5"
      stroke="white"
      strokeOpacity="0.5"
      strokeWidth="0.5"
    />
  </svg>
);

// --- Existing/General Icons (some might be from Heroicons, check licenses if using directly) ---
export const BasisBOutlineIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20 70V10H50C55.5228 10 60 14.4772 60 20V20C60 25.5228 55.5228 30 50 30H30V40H50C55.5228 40 60 44.4772 60 50V50C60 55.5228 55.5228 60 50 60H30V70H20Z"
      stroke="currentColor"
      strokeWidth="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FigmaPlaceholderIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="4" y="4" width="16" height="16" rx="3" fill="#3E3E3E" />
    <path
      d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 13.5 15.125 14.775 14 15.5V15.5C12.875 14.775 12 13.5 12 12C12 10.5 11.125 9.225 10 8.5V8.5C8.875 9.225 8 10.5 8 12Z"
      fill="url(#paint0_linear_figma)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_figma"
        x1="12"
        y1="8"
        x2="12"
        y2="16"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F24E1E" />
        <stop offset="0.25" stopColor="#FF7262" />
        <stop offset="0.5" stopColor="#A259FF" />
        <stop offset="0.75" stopColor="#1ABCFE" />
        <stop offset="1" stopColor="#0ACF83" />
      </linearGradient>
    </defs>
  </svg>
);

export const LinkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
    />
  </svg>
);

export const PhotoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.158 0a.75.75 0 10-1.5 0 .75.75 0 001.5 0z"
    />
  </svg>
);

export const ChatBubbleLeftEllipsisIcon: React.FC<
  React.SVGProps<SVGSVGElement>
> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
    />
  </svg>
);

export const GlobeAltIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A11.978 11.978 0 0112 16.5c-.93 0-1.813-.12-2.66-.337m5.32 0c.099-.12.192-.244.278-.372M12 10.5c-.337 0-.673.017-1.003.046M2.25 12c0 .778.099 1.533.284 2.253m0 0a11.978 11.978 0 009.432 3.997M6.75 8.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM17.25 8.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
    />
  </svg>
);

// BellIcon from previous implementation - not in new design's header but kept for potential use
export const BellIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
    />
  </svg>
);

// Fallback for BasisBOutlineIcon if solid is needed but old one is referenced
export const BasisBOutlineIconLegacy: React.FC<
  React.SVGProps<SVGSVGElement>
> = (props) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20 70V10H50C55.5228 10 60 14.4772 60 20V20C60 25.5228 55.5228 30 50 30H30V40H50C55.5228 40 60 44.4772 60 50V50C60 55.5228 55.5228 60 50 60H30V70H20Z"
      stroke="currentColor"
      strokeWidth="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// These icons were used in previous design's action bar, might be useful.
export const SlidersHorizontalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 6h9.75M10.5 12h9.75m-9.75 6h9.75M3.75 6H7.5m3 6H7.5m3 6H7.5m-3.75 0V6.75A.75.75 0 015.25 6h.75a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75V18zm7.5-12V6.75a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75V6z"
    />
  </svg>
);

export const AtSymbolIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
    />
  </svg>
);
export const ChatBubbleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-2.286-2.286c-.43.026-.863.041-1.3.041H6.75A2.25 2.25 0 014.5 15V7.5a2.25 2.25 0 012.25-2.25h7.5c.437 0 .863.015 1.3.041Z"
    />
  </svg>
);
export const SquaresPlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 3H12H4.5C3.67157 3 3 3.67157 3 4.5V12V19.5C3 20.3284 3.67157 21 4.5 21H12H19.5C20.3284 21 21 20.3284 21 19.5V12V10.5M13.5 3V7.5M13.5 3H18M18 3V7.5M18 3H19.5C20.3284 3 21 3.67157 21 4.5V7.5M18 7.5H13.5M18 7.5H21M10.5 12H7.5M10.5 12H13.5M10.5 12V9M10.5 12V15"
    />
  </svg>
);
