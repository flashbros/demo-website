import strucStyle from "./../../styles.module.css";
import style from "./leftPanel.module.css";
import FlashLoaner from "./flashLoaner";

export default function LeftPanel({ contract, getBalance }) {
  return (
    <div className={strucStyle.LeftPanel}>
      <div className={style.rw}>
        <div className={style.position}>
          <div className={style.cm}>
            <div className={style.title}>Crypto Market</div>
            <div className={style.cmContent}>Test</div>
          </div>
          <FlashLoaner contract={contract} getBalance={getBalance} />
        </div>
      </div>
    </div>
  );
}
