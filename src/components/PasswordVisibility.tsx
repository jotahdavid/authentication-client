import { MouseEvent } from 'react';

type PasswordVisibilityVariants = 'default' | 'error';

interface PasswordVisibilityProps {
  show: boolean;
  variant?: PasswordVisibilityVariants;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const passwordVisibilityVariants: Record<PasswordVisibilityVariants, string> = {
  default: 'text-blue-600 hover:text-blue-700',
  error: 'text-red-600 hover:text-red-700',
};

export function PasswordVisibility({
  variant = 'default',
  show,
  onClick,
}: PasswordVisibilityProps) {
  return (
    <button
      type="button"
      className={passwordVisibilityVariants[variant]}
      onClick={onClick}
    >
      {show ? (
        <i className="fa-solid fa-eye-slash" />
      ) : (
        <i className="fa-solid fa-eye" />
      )}
    </button>
  );
}

PasswordVisibility.defaultProps = {
  variant: 'default',
  onClick: () => {},
};
