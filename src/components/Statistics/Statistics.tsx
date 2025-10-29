import s from "./Statistics.module.css";
export default function Statistics() {
  const totalNumberOfStatistic = 20;
  return (
    <div className={s.statisticsWrapper}>
      <p className={s.text}>To study:</p>
      <span className={s.value}>{totalNumberOfStatistic}</span>
    </div>
  );
}
