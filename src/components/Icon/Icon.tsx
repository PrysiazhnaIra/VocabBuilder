interface IconProps {
  name: string;
  width?: string | number;
  height?: string | number;
  className?: string;
}

export default function Icon({ name, width, height, className }: IconProps) {
  return (
    <svg aria-hidden="true" width={width} height={height} className={className}>
      <use href={`/icons.svg#${name}`} />
    </svg>
  );
}
