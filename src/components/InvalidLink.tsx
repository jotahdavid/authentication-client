import { ReactNode } from 'react';

interface InvalidLinkProps {
  className?: string;
  children: ReactNode;
}

export function InvalidLink({ className, children }: InvalidLinkProps) {
  return (
    <a
      href="/"
      className={className}
      onClick={(e) => e.preventDefault()}
    >
      {children}
    </a>
  );
}

InvalidLink.defaultProps = {
  className: '',
};
