interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export default function Button({ children, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}
