type AvatarSizes = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  size?: AvatarSizes;
  src: string;
  alt?: string;
}

const sizes: Record<AvatarSizes, string> = {
  sm: 'h-16 w-16',
  md: 'h-20 w-20',
  lg: 'h-28 w-28',
  xl: 'h-36 w-36',
};

export function Avatar({ src, alt, size = 'md' }: AvatarProps) {
  return (
    <picture className={`block ${sizes[size]}`}>
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
