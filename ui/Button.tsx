import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className = '',
  ...rest
}) => {
  const base = 'px-4 py-2 rounded font-semibold';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
  } as const;
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest} />
  );
};
