import { ButtonHTMLAttributes, ReactNode } from 'react';

import { Spinner } from '@components/Loader/Spinner';

import safeString from '@utils/safeString';

type ButtonSizes = 'xs' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
  size?: ButtonSizes;
}

const buttonSizes: Record<ButtonSizes, string> = {
  xs: 'py-1 px-1 text-sm rounded-lg drop-shadow-sm',
  md: 'py-3 px-2 text-lg rounded-lg drop-shadow-md',
};

export function Button({
  className, size = 'md', children, loading, type, ...props
}: ButtonProps) {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={`
        w-full font-semibold bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-500
        transition-colors ${buttonSizes[size]} relative
        ${safeString(className)}
      `}
      {...props}
    >
      {children}
      {loading && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex">
          <Spinner size="xs" />
        </div>
      )}
    </button>
  );
}

Button.defaultProps = {
  size: 'md',
  loading: false,
};
