interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const spinnerVariants = {
  xs: 'w-6 h-6 border-4',
  sm: 'w-8 h-8 border-4',
  md: 'w-16 h-16 border-[6px]',
  lg: 'w-20 h-20 border-[10px]',
};

export function Spinner({ size }: SpinnerProps) {
  return (
    <div
      className={`
        animate-spin inline-block ${spinnerVariants[size!]}
        border-t-blue-700 border-r-blue-700 rounded-full
      `}
      role="status"
    >
      <span className="hidden">Loading...</span>
    </div>
  );
}

Spinner.defaultProps = {
  size: 'sm',
};
