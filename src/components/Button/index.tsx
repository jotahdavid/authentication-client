import { ButtonHTMLAttributes, ReactNode } from 'react';

import safeString from '@utils/safeString';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({
  className, children, ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`
        w-full font-semibold text-lg py-3 bg-blue-600 hover:bg-blue-700 transition-colors
        text-white rounded-lg shadow-md disabled:bg-gray-500
        ${safeString(className)}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
