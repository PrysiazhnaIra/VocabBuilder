import s from "./InfoRow.module.css";

export default function InfoRow() {
  const tags = ["World", "Translation", "Grammar", "Progress"];
  return (
    <ul className={s.list}>
      {tags.map((tag, index) => (
        <li key={index} className={s.item}>
          {tag}
        </li>
      ))}
    </ul>
  );
}
