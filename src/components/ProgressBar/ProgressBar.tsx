export default function ProgressBar({
  progress,
}: {
  progress: number | undefined;
}) {
  const clampedProgress = Math.min(100, Math.max(0, progress || 0));
  return (
    <div>
      <div
        style={{
          width: `${clampedProgress}%`,
          height: "100%",
          backgroundColor: "green",
        }}
      ></div>
    </div>
  );
}
