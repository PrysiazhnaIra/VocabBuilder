import s from "./Illustration.module.css";
export default function Illustration() {
  return (
    <picture className={s.wrapper}>
      <source srcSet="/images/people_desk.png" media="(min-width:1440px)" />
      <img
        src="/images/people_mob.png"
        alt="A man and a woman sitting and reading a book, symbolizing learning."
        className={s.image}
      />
    </picture>
  );
}
