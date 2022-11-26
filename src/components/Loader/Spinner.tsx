import cs from 'classnames';

interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const spinnerVariants = {
  xs: 'w-6 h-6 border-4',
  sm: 'w-8 h-8 border-4',
  md: 'w-16 h-16 border-[6px]',
  lg: 'w-20 h-20 border-[10px]',
};

export function Spinner({ size = 'sm' }: SpinnerProps) {
  return (
    <div
      className={cs(
        'animate-spin inline-block',
        'border-t-blue-700 border-r-blue-700 rounded-full',
        spinnerVariants[size],
      )}
      role="status"
    >
      <span className="hidden">Loading...</span>
    </div>
  );
}

Spinner.defaultProps = {
  size: 'sm',
};
