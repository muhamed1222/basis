export type BentoCardVariant = 
  'medium_text_right_image' | // Corresponds to data-size="Medium"
  'big_text_over_image' |   // Corresponds to data-size="Big"
  'smol_icon_text_vertical' | // Corresponds to data-size="Smol"
  'custom_action_bar'; // For the "Share my Bento" bar, though it's a separate component

export interface BentoItem {
  id: string;
  variant: BentoCardVariant;
  gridClass?: string; // Tailwind classes for grid spanning

  // Content fields
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  iconBgClass?: string; // e.g. "bg-gray-800" for icon background
  title?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;

  // Specific for some new card types if needed
  customSize?: 'Smol' | 'Medium' | 'Big'; // From design data-size attribute
}

export interface ShareActionItem {
  id: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  href?: string;
  bgColor?: string; // For icon container if needed
  iconClassName?: string; // Custom classes for the icon itself
}
