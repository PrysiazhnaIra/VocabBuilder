import s from "./Illustration.module.css";
export default function Illustration() {
  return (
    <picture className={s.wrapper}>
      <source
        srcSet="/images/people_desk.png 1x,
                /images/people_desk_2x.png 2x"
        media="(min-width:1440px)"
      />
      <img
        src="/images/people_mob.png"
        srcSet="/images/people_mob_2x.png 2x"
        alt="A man and a woman sitting and reading a book, symbolizing learning."
        className={s.image}
      />
    </picture>
  );
}
