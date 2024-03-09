import style from "./loader.module.css";

export default function Loader({}) {
  return (
    <div className={style.bg}>
      <div className={style.grid}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
