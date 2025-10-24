interface IconProps {
  name: string;
  width?: string | number;
  height?: string | number;
  className?: string;
}

export default function Icon({ name, width, height, className }: IconProps) {
  const spriteUrl = `/icons.svg?v=${Date.now()}`; // Cache busting to ensure latest SVGs are used

  return (
    <svg aria-hidden="true" width={width} height={height} className={className}>
      <use href={`${spriteUrl}#${name}`} />
    </svg>
  );
}
