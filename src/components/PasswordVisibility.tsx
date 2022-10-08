interface PasswordVisibilityProps {
  className?: string;
  show: boolean;
}

export function PasswordVisibility({ className, show }: PasswordVisibilityProps) {
  return (
    <button
      type="button"
      className={className}
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
  className: 'text-blue-600 hover:text-blue-700',
};
