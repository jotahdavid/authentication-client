import { ButtonHTMLAttributes, ReactNode } from 'react';

import safeString from '@utils/safeString';

type ButtonSizes = 'xs' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSizes;
  children: ReactNode;
}

const buttonSizes: Record<ButtonSizes, string> = {
  xs: 'py-1 px-1 text-sm rounded-lg drop-shadow-sm',
  md: 'py-3 px-2 text-lg rounded-lg drop-shadow-md',
};

export function Button({
  className, size = 'md', children, ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`
        w-full font-semibold bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-500
        transition-colors ${buttonSizes[size]}
        ${safeString(className)}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  size: 'md',
};
