import cs from 'classnames';

type AvatarSizes = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  size?: AvatarSizes;
  src: string;
  alt?: string;
}

const sizes: Record<AvatarSizes, string> = {
  sm: 'h-16 w-16 shadow-sm',
  md: 'h-20 w-20 shadow-md',
  lg: 'h-28 w-28 shadow-lg',
  xl: 'h-36 w-36 shadow-xl',
};

export function Avatar({ src, alt, size = 'md' }: AvatarProps) {
  return (
    <picture className={cs('block rounded-full overflow-hidden', sizes[size])}>
      <img
        src={src}
        alt={alt}
        className="block w-full h-full"
      />
    </picture>
  );
}

Avatar.defaultProps = {
  alt: 'Avatar image',
  size: 'md',
};
