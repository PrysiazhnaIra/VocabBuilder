import s from "./ProgressBar.module.css";

interface ProgressBarProps {
  progress?: number;
  size?: number;
  strokeWidth?: number;
}

export default function ProgressBar({
  progress = 0,
  size = 24,
  strokeWidth = 3,
}: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset =
    circumference - (clampedProgress / 100) * circumference || circumference;

  return (
    <div
      className={s.wrapper}
      style={{ width: `${size}px`, height: `${size}px` }}
      aria-label={`Progress: ${clampedProgress}%`}
    >
      <svg
        className={s.svg}
        width={size}
        height={size}
        role="img"
        aria-hidden="true"
      >
        <circle
          className={s.track}
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={s.progress}
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
        />
      </svg>
    </div>
  );
}
